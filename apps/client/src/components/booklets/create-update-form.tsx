"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type Booklet, BookletCategoriesEnum, BookletCitiesEnum, bookletSchema, BookletDaysEnum } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import { RadioField } from "../custom-ui/form/radio-field"
import Link from "next/link"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { Client } from "@/lib/eden"
import { useLang, useTranslations } from "@/providers/language"

const BookletCityOptions = Object.values(BookletCitiesEnum).map((city) => ({ label: city, value: city }))
const BookletCategoryOptions = Object.values(BookletCategoriesEnum).map((category) => ({ label: category, value: category }))
const BookletDaysOptions = Object.values(BookletDaysEnum).map((day) => ({ label: day, value: day }))

interface BookletFormData {
    bookletType: string
    category: string
    projectName: string
    bookletNumber: string
    issueDate: string
    issueCity: string
    issueDay: string
}

export function CreateUpdataBookletForm({ id, data }: { id?: string, data?: Booklet }) {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const queryClient = useQueryClient()
    const client = Client()
    const t = useTranslations("CreateUpdataBookletForm");
    const { dir } = useLang();

    const formConfig = useAppForm({
        defaultValues: {
            bookletType: data?.bookletType || "internal",
            category: data?.category || "",
            projectName: data?.projectName || "",
            bookletNumber: data?.bookletNumber || "",
            issueDate: data?.issueDate || "",
            issueCity: data?.issueCity || "",
            issueDay: data?.issueDay || "",
        },
        validators: {
            onChange: bookletSchema
        }
    })

    const { AppField, AppForm, Subscribe } = formConfig

    // Create booklet mutation
    const createBookletMutation = useMutation({
        mutationFn: async (bookletData: BookletFormData) => {
            if (!client) {
                throw new Error('Client not found')
            }
            return await client.api.booklets.create.post(bookletData)
        },
        onSuccess: () => {
            // Invalidate and refetch booklets list
            queryClient.invalidateQueries({ queryKey: ['booklets'] })
            router.push('/booklets')
        },
        onError: (err: Error) => {
            setError(err.message || 'Failed to create booklet')
        }
    })

    // Update booklet mutation
    const updateBookletMutation = useMutation({
        mutationFn: async (bookletData: BookletFormData) => {
            if (!client || !id) {
                throw new Error('Client or booklet ID not found')
            }
            return await client.api.booklets({ id }).update.post(bookletData)
        },
        onSuccess: () => {
            // Invalidate booklets list and specific booklet
            queryClient.invalidateQueries({ queryKey: ['booklets'] })
            queryClient.invalidateQueries({ queryKey: ['booklet', id] })
            router.push('/booklets')
        },
        onError: (err: Error) => {
            setError(err.message || 'Failed to update booklet')
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Get form values
        const formData = new FormData(e.target as HTMLFormElement)
        const bookletData: BookletFormData = {
            bookletType: formData.get('bookletType') as string,
            category: formData.get('category') as string,
            projectName: formData.get('projectName') as string,
            bookletNumber: formData.get('bookletNumber') as string,
            issueDate: formData.get('issueDate') as string,
            issueCity: formData.get('issueCity') as string,
            issueDay: formData.get('issueDay') as string,
        }

        // Execute appropriate mutation
        if (id) {
            updateBookletMutation.mutate(bookletData)
        } else {
            createBookletMutation.mutate(bookletData)
        }
    }

    const isLoading = createBookletMutation.isPending || updateBookletMutation.isPending
    const mutationError = createBookletMutation.error || updateBookletMutation.error

    // Update error state when mutation error changes
    useState(() => {
        if (mutationError) {
            setError(mutationError.message || 'An error occurred')
        }
    })

    return (
        <div className="w-full h-full space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6 h-full">
                {(error || mutationError) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || mutationError?.message || 'An error occurred'}
                    </div>
                )}

                <Subscribe
                    selector={(state) => state.values.bookletType}
                    children={(userType) => (
                        <AppField
                            name="bookletType"
                            children={({ RadioGroupField, handleChange }) => (
                                <RadioGroupField label={t("bookletType")} required={true} className="md:max-w-[320px]">
                                    <RadioField
                                        value="internal"
                                        label={t("internal")}
                                        selected={userType === "internal"}
                                        onClick={() => handleChange("internal")}
                                    />
                                    <RadioField
                                        value="external"
                                        label={t("external")}
                                        selected={userType === "external"}
                                        onClick={() => handleChange("external")}
                                    />
                                </RadioGroupField>
                            )}
                        />
                    )}
                />

                <AppField
                    name="category"
                    children={({ SelectField }) => (
                        <SelectField
                            label={t("bookletCategory")}
                            required
                            placeholder={t("select")}
                            options={BookletCategoryOptions}
                            dir={dir}
                        />
                    )}
                />

                <AppField
                    name="projectName"
                    children={({ TextField }) => (
                        <TextField
                            label={t("projectName")}
                            required
                            placeholder={t("projectName")}
                        />
                    )}
                />

                <AppField
                    name="bookletNumber"
                    children={({ TextField }) => (
                        <TextField
                            label={t("bookletNumber")}
                            required
                            placeholder={t("bookletNumber")}
                        />
                    )}
                />

                <AppField
                    name="issueDate"
                    children={({ TextField }) => (
                        <TextField
                            label={t("issueDate")}
                            required={true}
                            placeholder={t("issueDate")}
                        />
                    )}
                />

                <AppField
                    name="issueDay"
                    children={({ SelectField }) => (
                        <SelectField
                            label={t("issueDay")}
                            required
                            placeholder={t("selectDay")}
                            options={BookletDaysOptions}
                            dir={dir}
                        />
                    )}
                />

                <AppField
                    name="issueCity"
                    children={({ SelectField }) => (
                        <SelectField
                            label={t("issueCity")}
                            required
                            placeholder={t("selectCity")}
                            options={BookletCityOptions}
                            dir={dir}
                        />
                    )}
                />

                <div className="flex justify-end items-center gap-4">
                    <Link
                        href={"/booklets"}
                        className="w-28 h-12 flex items-center justify-center border border-[#D3D8E1] rounded-md"
                    >
                        {t("cancel")}
                    </Link>
                    <AppForm>
                        <SubmitButton>
                            {isLoading ? `${id ? t("updating") : t("creating")}...` : `${id ? t("update") : t("create")}`}
                        </SubmitButton>
                    </AppForm>
                </div>
            </form>
        </div>
    )
}