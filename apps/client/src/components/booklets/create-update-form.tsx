"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs"
import { useTransform } from "@tanstack/react-form"
import { type Booklet, BookletCategoriesEnum, BookletCitiesEnum, bookletSchema } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import { RadioField } from "../custom-ui/form/radio-field"
import Link from "next/link"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { CreateUpdateBookletAction } from "@/actions/booklets"

const BookletCityOptions = Object.values(BookletCitiesEnum).map((city) => ({ label: city, value: city }))
const BookletCategoryOptions = Object.values(BookletCategoriesEnum).map((city) => ({ label: city, value: city }))

export function CreateUpdataBookletForm({ id, data }: { id?: string, data?: Booklet }) {
    const updatedCreateUpdateBookletAction = (prevData: any, formData: FormData) => {
        return CreateUpdateBookletAction(prevData, formData, id);
    };
    const [state, formAction] = useActionState(updatedCreateUpdateBookletAction, initialFormState)
    const router = useRouter();
    const { AppField, AppForm, Subscribe } = useAppForm({
        defaultValues: {
            bookletType: data?.bookletType || "internal",
            category: data?.category || "",
            projectName: data?.projectName || "",
            bookletNumber: data?.bookletNumber || "",
            issueDate: data?.issueDate || "",
            issueCity: data?.issueCity || "",
        },
        validators: {
            onChange: bookletSchema
        },
        transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    })

    useEffect(() => {
        if (state?.success) {
            router.push("/booklets")
        }
    }, [state])

    return (
        <div className="w-full h-full space-y-4">
            <form action={formAction} className="space-y-6 h-full">
                {state?.error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">{state.error}</div>}

                <Subscribe
                    selector={(state) => state.values.bookletType}
                    children={(userType) => (
                        <AppField
                            name="bookletType"
                            children={({ RadioGroupField, handleChange }) => (
                                <RadioGroupField label="Booklet Type" required={true}>
                                    <RadioField value="internal" label="Internal" selected={userType === "internal"} onClick={() => handleChange("internal")} />
                                    <RadioField value="external" label="External" selected={userType === "external"} onClick={() => handleChange("external")} />
                                </RadioGroupField>
                            )}
                        />
                    )}
                />

                <AppField
                    name="category"
                    children={({ SelectField }) => (
                        <SelectField label="Booklet Category" required placeholder="Select Booklet Category" options={BookletCategoryOptions} />
                    )}
                />

                <AppField
                    name="projectName"
                    children={({ TextField }) => (
                        <TextField label="Bid/Project Name" required placeholder="Bid/Project Name" />
                    )}
                />

                <AppField
                    name="bookletNumber"
                    children={({ TextField }) => (
                        <TextField label="Booklet Number" required placeholder="Booklet Number" />
                    )}
                />

                <AppField
                    name="issueDate"
                    children={({ TextField }) => (
                        <TextField label="Issue Day & Date" required placeholder="Select Day & Date" />
                    )}
                />

                <AppField
                    name="issueCity"
                    children={({ SelectField }) => (
                        <SelectField label="Issue City" required placeholder="Select City" options={BookletCityOptions} />
                    )}
                />
                <div className="flex justify-end items-center gap-4">
                    <Link href={"/booklets"} className="w-28 h-12 flex items-center justify-center border border-[#D3D8E1] rounded-md">Cancel</Link>
                    <AppForm>
                        <SubmitButton>Create</SubmitButton>
                    </AppForm>
                </div>
            </form>
        </div>
    )
}

