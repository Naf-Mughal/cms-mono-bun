"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAppForm } from "../custom-ui/form"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import { Client } from "@/lib/eden"
import { useTranslations } from "@/providers/language"
import Link from "next/link"

interface UserPasswordCredentials {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}
export function UserPasswordForm() {
    const [error, setError] = useState<string | null>(null)
    const client = Client()
    const t = useTranslations("UserPasswordForm")

    const formConfig = useAppForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        }
    })

    const { AppField, AppForm } = formConfig

    const userPasswordMutation = useMutation({
        mutationFn: async (credentials: UserPasswordCredentials): Promise<any> => {
            if (!client) {
                throw new Error('Client not found')
            }
            const { data, error } = await client.api.auth.updatePassword.post(credentials)
            if (error) {
                throw new Error(error || 'Registration failed')
            }
            return data
        },
        onSuccess: async () => {
            setError(null);
            formConfig.reset()
        },
        onError: (err: Error) => {
            setError(err.message || 'An error occurred during registration')
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.target as HTMLFormElement)
        const currentPassword = formData.get('currentPassword') as string
        const newPassword = formData.get('newPassword') as string
        const confirmNewPassword = formData.get('confirmNewPassword') as string
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError('Please fill in all required fields')
            return
        }
        const credentials: UserPasswordCredentials = {
            currentPassword,
            newPassword,
            confirmNewPassword,
        }
        userPasswordMutation.mutate(credentials)
    }

    return (
        <div className="w-full space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                {(error || userPasswordMutation.error) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || userPasswordMutation.error?.message}
                    </div>
                )}

                <AppField
                    name="currentPassword"
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField
                            isInline={true}
                            label={t('currentPassword')}
                            name="currentPassword"
                            required
                            disabled={userPasswordMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="newPassword"
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField
                            isInline={true}
                            label={t('newPassword')}
                            name="newPassword"
                            required
                            disabled={userPasswordMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="confirmNewPassword"
                    validators={{
                        onChangeListenTo: ['newPassword'],
                        onChange: ({ value, fieldApi }) => {
                            if (value !== fieldApi.form.getFieldValue('newPassword')) {
                                return [{ code: "custom", path: ['confirmNewPassword'], message: 'Passwords does not match' }]
                            }
                            return undefined
                        },
                    }}
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField
                            isInline={true}
                            label={t('confirmNewPassword')}
                            name="confirmNewPassword"
                            required
                            disabled={userPasswordMutation.isPending}
                        />
                    )}
                />

                <div className="flex justify-end items-center gap-4">
                    <Link
                        href={"/booklets"}
                        className="w-28 h-12 flex items-center justify-center border bg-[#007EA7] text-white border-[#D3D8E1] rounded-md"
                    >
                        {t("cancel")}
                    </Link>
                    <AppForm>
                        <SubmitButton>
                            {userPasswordMutation.isPending ? t("changePasswording") : t("changePassword")}
                        </SubmitButton>
                    </AppForm>
                </div>
            </form>
        </div>
    )
}