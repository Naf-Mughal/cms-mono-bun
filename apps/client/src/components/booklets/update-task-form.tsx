"use client"

import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type GenaricBookletsTask, genaricBookletsTaskSchema } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import Link from "next/link"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { RadioField } from "../custom-ui/form/radio-field"
import DynamicTable from "../ui/dynamic-table"
import Table from "../ui/table"
import { List } from "../ui/nested-list"
import { Toaster } from "sonner"
import { MultiUpload } from "../ui/multi-upload"
import { Client } from "@/lib/eden"
import RowsTable from "../ui/rows-table"
import { useLang, useTranslations } from "@/providers/language"

interface UpdateBookletTaskResponse {
    success: boolean
    message?: string
    data?: any
}

export function UpdataBookletTaskForm({ id, taskId, data, nextTaskId }: { id: string, taskId: string, data?: GenaricBookletsTask, nextTaskId?: string }) {
    const [error, setError] = useState<string | null>(null)
    const [dynamicTable, setDynamicTable] = useState<any>(data?.tableData || {})
    const [updatedData, setUpdatedData] = useState<any>(data?.data || {})
    const [listData, setListData] = useState<any>({})
    const [radioValue, setRadioValue] = useState<string>(
        typeof data?.data?.value === 'string' ? data.data.value : ""
    )
    const client = Client()
    const queryClient = useQueryClient()

    const t = useTranslations("TaskForm")
    const gt = useTranslations("RadioGroup")

    const { dir } = useLang();

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

    // Helper function to extract and format list data
    const getListDataForChild = (child: any, childIndex: number) => {
        const listKey = `child-${childIndex}`;

        if (listData[listKey]) {
            return listData[listKey];
        }

        const childValue = (child?.children as any)?.value;
        if (Array.isArray(childValue)) {
            const formattedData = {
                value: childValue,
                children: childValue.map((item: string) => ({
                    value: item,
                    children: { value: [], children: [] }
                }))
            };

            return formattedData;
        }

        return { value: [], children: [] };
    };

    // Initialize list data when updatedData changes
    useEffect(() => {
        if (updatedData?.children && Array.isArray(updatedData.children)) {
            const newListData: any = {};

            updatedData.children.forEach((child: any, index: number) => {
                const listKey = `child-${index}`;
                const childValue = (child?.children as any)?.value;

                if (Array.isArray(childValue)) {
                    newListData[listKey] = {
                        value: childValue,
                        children: childValue.map((item: string) => ({
                            value: item,
                            children: { value: [], children: [] }
                        }))
                    };
                }
            });

            setListData(newListData);
        }
    }, [updatedData]);

    // Helper function to update the overall updatedData when list changes
    const handleListDataChange = (childIndex: number, newListData: any) => {
        const listKey = `child-${childIndex}`;

        setListData((prev: any) => ({
            ...prev,
            [listKey]: newListData
        }));

        const updatedChildren = [...(updatedData?.children || [])];
        if (updatedChildren[childIndex]) {
            updatedChildren[childIndex] = {
                ...updatedChildren[childIndex],
                children: {
                    ...updatedChildren[childIndex].children,
                    value: newListData.value || []
                }
            };

            setUpdatedData({
                ...updatedData,
                children: updatedChildren
            });
        }
    };

    const updateBookletTaskMutation = useMutation({
        mutationFn: async (formDataObj: any): Promise<UpdateBookletTaskResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const { data, error } = await client.api.booklets({ id }).tasks({ taskId }).perform.post({
                ...formDataObj,
                tableData: dynamicTable
            })

            if (error) {
                throw new Error('Update failed')
            }

            return { success: true, message: 'Updated successfully' }
        },
        onSuccess: () => {
            setError(null)
            queryClient.invalidateQueries({ queryKey: ['booklet', id, taskId] })
            queryClient.invalidateQueries({ queryKey: ['booklet', 'tasks', id] })
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

        // Handle different input types
        if (data?.inputType === "radio") {
            // For radio inputs, use the current state data which includes all nested structures
            const currentRadioValue = formData.get('data.value') || radioValue

            if (data?.data?.children && Array.isArray(data.data.children)) {
                const processedChildren = data.data.children.map((child: any, index: number) => {
                    const listKey = `child-${index}`;

                    if (child.type === "list" && listData[listKey]) {
                        // Use the list data from state
                        return {
                            ...child,
                            children: {
                                ...child.children,
                                value: listData[listKey].value || []
                            }
                        };
                    } else if (child.type === "text") {
                        // Get text input value from form
                        const textValue = formData.get(`data.children.${index}.children.value`)
                        return {
                            ...child,
                            children: {
                                ...child.children,
                                value: textValue || child.children?.value || ""
                            }
                        };
                    } else if (child.type === "readonly") {
                        // Keep readonly value as is
                        return child;
                    }

                    return child;
                });

                formDataObj.data = {
                    value: currentRadioValue,
                    children: processedChildren
                };
            } else {
                formDataObj.data = { value: currentRadioValue };
            }
        } else {
            // Handle other input types
            const dataValue = formData.get('data.value')
            if (dataValue !== null) {
                formDataObj.data = { value: dataValue }
            } else if (data?.inputType === 'list' || data?.inputType === 'table' || data?.inputType === 'rows-table') {
                // For list/table types, use the updatedData state
                formDataObj.data = updatedData
            }
        }

        // If no form data was processed, use the current state
        if (!formDataObj.data && updatedData) {
            formDataObj.data = updatedData;
        }

        console.log('Submitting data:', formDataObj); // Debug log

        updateBookletTaskMutation.mutate(formDataObj)
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
                                dir={dir}
                                disabled={updateBookletTaskMutation.isPending}
                            />
                        )}
                    />
                )
            case "number":
                return (
                    <AppField
                        name="data.value"
                        children={({ TextField }) => (
                            <TextField
                                label=""
                                labelClass="text-[#525355] font-semibold text-lg"
                                isInline={false}
                                isNumaric={true}
                                dir={dir}
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
                return <List data={updatedData} onChange={setUpdatedData} />
            case 'radio':
                return (
                    <>
                        <Subscribe
                            selector={(state) => state.values.data.value}
                            children={(radioValue) => (
                                <AppField
                                    name="data.value"
                                    children={({ RadioGroupField, handleChange }) => (
                                        <RadioGroupField label="">
                                            {
                                                data?.data && Array.isArray(data?.data?.children) && data?.data?.children?.map((child, index) => (
                                                    <RadioField
                                                        key={index}
                                                        value={child.value as string}
                                                        label={`${gt(child.value as string)} ${child?.type === 'readonly' && (child?.children as any)?.value && (child?.children as any)?.type !== "text" ? `(${(child?.children as any)?.value || ""})` : ''}`}
                                                        selected={radioValue === child.value}
                                                        onClick={() => { setRadioValue(child.value as string); handleChange(child.value as string) }}
                                                    />
                                                ))
                                            }
                                        </RadioGroupField>
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
                                                    {child?.type === "list" && Array.isArray((child?.children as any)?.value) && (
                                                        <List
                                                            data={getListDataForChild(child, index)}
                                                            onChange={(newListData) => handleListDataChange(index, newListData)}
                                                        />
                                                    )}
                                                    {child?.type === "text" && (
                                                        <AppField
                                                            name={`data.children.${index}.children.value`}
                                                            children={({ TextField }) => (
                                                                <TextField
                                                                    label={(child?.children as any)?.children?.value || ''}
                                                                    labelClass="text-[#525355] font-semibold text-lg"
                                                                    isInline={false}
                                                                    dir={(child?.children as any)?.children?.value ? "rtl" : 'ltr'}
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
                    <AppForm>
                        <SubmitButton>
                            {updateBookletTaskMutation.isPending ? t("submitting") : t("submit")}
                        </SubmitButton>
                    </AppForm>
                    {
                        nextTaskId && (
                            <Link
                                href={`/booklets/${id}/tasks/${nextTaskId}/perform`}
                                className="w-28 h-12 flex items-center justify-center border bg-[#007EA7] text-white border-[#D3D8E1] rounded-md"
                            >
                                {t("next")}
                            </Link>
                        )
                    }
                </div>
            </form>
            <Toaster position="bottom-left" expand={true} richColors closeButton />
        </div>
    )
}