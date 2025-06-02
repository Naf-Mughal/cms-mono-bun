"use client"

import { Fragment, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs"
import { useTransform } from "@tanstack/react-form"
import { type GenaricBookletsTask, genaricBookletsTaskSchema } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import Link from "next/link"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { UpdateBookletTaskAction } from "@/actions/booklets"
import { RadioField } from "../custom-ui/form/radio-field"
import DynamicTable from "../ui/dynamic-table"
import Table from "../ui/table"
import { NestedList } from "../ui/nested-list"
import { Toaster } from "sonner"
import { MultiUpload } from "../ui/multi-upload"



export function UpdataBookletTaskForm({ path, data }: { path: string, data?: GenaricBookletsTask }) {
    const [dynamicTable, setDynamicTable] = useState<any>(data?.tableData || {})
    const [updatedData, setUpdatedData] = useState<any>(data?.data || {})
    const updatedUpdateBookletTaskAction = (prevData: any, formData: FormData) => {
        return UpdateBookletTaskAction(prevData, formData, path, dynamicTable, updatedData);
    };
    const prefix = path?.split("/").slice(2)[0]
    const [state, formAction] = useActionState(updatedUpdateBookletTaskAction, initialFormState)
    const router = useRouter();
    const { AppField, AppForm, Subscribe, setFieldValue } = useAppForm({
        defaultValues: {
            name: data?.name || "",
            data: data?.data || { value: null } as any,
            description: data?.description || "",
            inputName: data?.inputName || "",
            pageNumber: data?.pageNumber || 1,
        },
        validators: {
            onChange: genaricBookletsTaskSchema
        },
        transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    })

    const getAppFieldBasedOnType = (type: string) => {
        switch (type) {
            case "text":
                return (
                    <AppField
                        name="data.value"
                        children={({ TextField }) => (
                            <TextField label="" labelClass="text-[#525355] font-semibold text-lg" isInline={false} />
                        )}
                    />
                )
            case "date":
                return (
                    <AppField
                        name="data.value"
                        children={({ DatePicker }) => (
                            < DatePicker />
                        )}
                    />
                )
            case 'list':
                return (
                    <AppField
                        name="data.value"
                        children={({ ListField }) => (
                            <ListField />
                        )}
                    />
                )
            case 'radio':
                return (
                    <>
                        <Subscribe
                            selector={(state) => state.values.data.value}
                            children={(radioValue) => (
                                <AppField
                                    name="data.value"
                                    children={({ AuthRadioGroupField, handleChange }) => (
                                        <AuthRadioGroupField>
                                            {
                                                data?.data && Array.isArray(data?.data?.children) && data?.data?.children?.map((child, index) => (
                                                    <RadioField key={index} value={child.value as string} label={`${child.value} ${child?.type === 'readonly' ? `(${(child?.children as any)?.value || ""})` : ''}`} selected={radioValue === child.value} onClick={() => { handleChange(child.value as string); }} />
                                                ))
                                            }
                                        </AuthRadioGroupField>
                                    )}
                                />
                            )}
                        />
                        <Subscribe
                            selector={(state) => state.values.data.value}
                            children={(radioValue) => (
                                <>
                                    {
                                        data?.data && Array.isArray(data?.data?.children) && data?.data?.children?.map((child, index) => {
                                            return radioValue === child.value && (
                                                <Fragment key={index}>
                                                    {child?.type === "list" && (
                                                        <AppField
                                                            name={`data.children.${index}.children.value`}
                                                            children={({ ListField }) => (
                                                                <ListField />
                                                            )}
                                                        />
                                                    )}
                                                    {child?.type === "text" && (
                                                        <AppField
                                                            name={`data.children.${index}.children.value`}
                                                            children={({ TextField }) => (
                                                                <TextField label="" labelClass="text-[#525355] font-semibold text-lg" isInline={false} />
                                                            )}
                                                        />
                                                    )}
                                                    {child?.type === "readonly" && (
                                                        <AppField
                                                            name={`data.children.${index}.children.value`}
                                                            children={({ }) => (
                                                                <input type="hidden" name={`data.children.${index}.children.value`} value={(child?.children as any)?.value || ""} />
                                                            )}
                                                        />
                                                    )}
                                                </Fragment>
                                            )
                                        })
                                    }
                                </>
                            )}
                        />
                    </>
                )
            case 'table':
                return <Table data={updatedData} setData={setUpdatedData} />
            case 'dynamic-table':
                return <DynamicTable onDataChange={setDynamicTable} initialData={dynamicTable as any || {}} />
            case "nested-list":
                return <NestedList data={updatedData} onChange={setUpdatedData} />
            case "multi-upload":
                return <MultiUpload data={updatedData} prefix={prefix} onChange={setUpdatedData} />

            default:
                return (
                    <AppField
                        name="data.value"
                        children={({ TextField }) => (
                            <TextField label="" labelClass="text-[#525355] font-semibold text-lg" isInline={false} />
                        )}
                    />
                )
        }
    }

    useEffect(() => {
        if (state?.success) {
            router.push(`${path}?preview=reload`)
        }
    }, [state])

    return (
        <div className="w-full h-full space-y-4">
            <form action={formAction} className="space-y-6 h-full">
                {state?.error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">{state.error}</div>}
                {getAppFieldBasedOnType(data?.inputType || "text")}
                <div className="flex justify-end items-center gap-4">
                    <Link href={"/booklets"} className="w-28 h-12 flex items-center justify-center border bg-[#007EA7] text-white border-[#D3D8E1] rounded-md">Save</Link>
                    <AppForm>
                        <SubmitButton>Submit</SubmitButton>
                    </AppForm>
                </div>
            </form>
            <Toaster position="bottom-left" expand={true} richColors closeButton />
        </div>
    )
}

