"use client"

import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query" // Import useQueryClient
import { type GenaricBookletsTask, genaricBookletsTaskSchema } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import Link from "next/link"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { RadioField } from "../custom-ui/form/radio-field"
import DynamicTable from "../ui/dynamic-table"
import Table from "../ui/table"
import { NestedList } from "../ui/nested-list"
import { Toaster } from "sonner"
import { MultiUpload } from "../ui/multi-upload"
import { Client } from "@/lib/eden"
import RowsTable from "../ui/rows-table"

interface UpdateBookletTaskResponse {
    success: boolean
    message?: string
    data?: any
}

export function UpdataBookletTaskForm({ id, taskId, data }: { id: string, taskId: string, data?: GenaricBookletsTask }) {
    const [error, setError] = useState<string | null>(null)
    const [dynamicTable, setDynamicTable] = useState<any>(data?.tableData || {})
    const [updatedData, setUpdatedData] = useState<any>(data?.data || {})
    const [radioValue, setRadioValue] = useState<string>(
        typeof data?.data?.value === 'string' ? data.data.value : ""
    )
    const router = useRouter()
    const client = Client()
    const queryClient = useQueryClient() // Initialize queryClient

    const formConfig = useAppForm({
        defaultValues: {
            name: data?.name || "",
            data: data?.data || { value: null } as any,
            description: data?.description || "",
            inputName: data?.inputName || "",
            pageNumber: data?.pageNumber || 1,
        },
        validators: {
            onChange: genaricBookletsTaskSchema
        }
    })

    const { AppField, AppForm, Subscribe } = formConfig

    const updateBookletTaskMutation = useMutation({
        mutationFn: async (formDataObj: any): Promise<UpdateBookletTaskResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const { data, error } = await client.api.booklets({ id }).tasks({ taskId }).perform.post({
                ...formDataObj,
                ...(Object.keys(formDataObj).length === 0 && { data: updatedData }),
                tableData: dynamicTable
            })

            if (error) {
                throw new Error('Update failed')
            }

            return { success: true, message: 'Updated successfully' }
        },
        onSuccess: () => {
            setError(null)
            // Invalidate queries to trigger refetch in PerformTask
            queryClient.invalidateQueries({ queryKey: ['booklet', id, taskId] }) // Invalidate specific task
            queryClient.invalidateQueries({ queryKey: ['booklet', 'tasks', id] }) // Invalidate task list
            // Optionally show success toast
            // toast.success('Task updated successfully!')
        },
        onError: (err: Error) => {
            setError(err.message || 'An error occurred during update')
        },
        retry: (failureCount, error) => {
            if (error.message.includes('Unauthorized') || error.message.includes('Forbidden')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.target as HTMLFormElement)
        const formDataObj: any = {}

        // Handle regular form fields (non-nested)
        for (const [key, value] of formData.entries()) {
            if (!key.startsWith('data.')) {
                formDataObj[key] = value
            }
        }

        // Handle data.value specifically
        const dataValue = formData.get('data.value')
        if (dataValue !== null) {
            formDataObj.data = { value: dataValue }
        }

        // Special handling for radio input type
        if (data?.inputType === "radio" && radioValue) {
            const children = data?.data?.children
            if (Array.isArray(children)) {
                formDataObj.data = {
                    value: formData.get('data.value') || radioValue,
                    children: children.map((child: any, index: number) => ({
                        ...child,
                        children: {
                            ...child.children,
                            value: formData.get(`data.children.${index}.children.value`) || child.children?.value
                        }
                    }))
                }
            }
        }

        // Submit with proper structure
        updateBookletTaskMutation.mutate({
            ...formDataObj,
            ...(Object.keys(formDataObj).length === 0 && { data: updatedData }),
            tableData: dynamicTable
        })
    }

    const getAppFieldBasedOnType = (type: string) => {
        switch (type) {
            case "text":
                return (
                    <AppField
                        name="data.value"
                        children={({ TextField }) => (
                            <TextField
                                label=""
                                labelClass="text-[#525355] font-semibold text-lg"
                                isInline={false}
                                name="data.value"
                                disabled={updateBookletTaskMutation.isPending}
                            />
                        )}
                    />
                )
            case "date":
                return (
                    <AppField
                        name="data.value"
                        children={({ DatePicker }) => (
                            <DatePicker />
                        )}
                    />
                )
            case 'list':
                return (
                    <AppField
                        name="data.value"
                        children={({ ListField }) => (
                            <ListField
                                name="data.value"
                                disabled={updateBookletTaskMutation.isPending}
                            />
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
                                                    <RadioField
                                                        key={index}
                                                        value={child.value as string}
                                                        label={`${child.value} ${child?.type === 'readonly' && (child?.children as any)?.value ? `(${(child?.children as any)?.value || ""})` : ''}`}
                                                        selected={radioValue === child.value}
                                                        onClick={() => { setRadioValue(child.value as string); handleChange(child.value as string) }}
                                                    />
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
                                                                <ListField
                                                                    name={`data.children.${index}.children.value`}
                                                                    disabled={updateBookletTaskMutation.isPending}
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                    {child?.type === "text" && (
                                                        <AppField
                                                            name={`data.children.${index}.children.value`}
                                                            children={({ TextField }) => (
                                                                <TextField
                                                                    label=""
                                                                    labelClass="text-[#525355] font-semibold text-lg"
                                                                    isInline={false}
                                                                    name={`data.children.${index}.children.value`}
                                                                    disabled={updateBookletTaskMutation.isPending}
                                                                />
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
            case 'rows-table':
                return <RowsTable data={updatedData} setData={setUpdatedData} />
            case 'dynamic-table':
                return <DynamicTable onDataChange={setDynamicTable} initialData={dynamicTable as any || {}} />
            case 'nested-list':
                return <NestedList data={updatedData} onChange={setUpdatedData} />
            case 'multi-upload':
                return <MultiUpload data={updatedData} prefix={id} onChange={setUpdatedData} />

            default:
                return (
                    <AppField
                        name="data.value"
                        children={({ TextField }) => (
                            <TextField
                                label=""
                                labelClass="text-[#525355] font-semibold text-lg"
                                isInline={false}
                                name="data.value"
                                disabled={updateBookletTaskMutation.isPending}
                            />
                        )}
                    />
                )
        }
    }

    return (
        <div className="w-full h-full space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6 h-full">
                {(error || updateBookletTaskMutation.error) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || updateBookletTaskMutation.error?.message}
                    </div>
                )}

                {getAppFieldBasedOnType(data?.inputType || "text")}

                <div className="flex justify-end items-center gap-4">
                    <Link
                        href={"/booklets"}
                        className="w-28 h-12 flex items-center justify-center border bg-[#007EA7] text-white border-[#D3D8E1] rounded-md"
                    >
                        Save
                    </Link>
                    <AppForm>
                        <SubmitButton>
                            {updateBookletTaskMutation.isPending ? 'Submitting...' : 'Submit'}
                        </SubmitButton>
                    </AppForm>
                </div>
            </form>
            <Toaster position="bottom-left" expand={true} richColors closeButton />
        </div>
    )
}