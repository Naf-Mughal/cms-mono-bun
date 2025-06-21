"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAppForm } from "../custom-ui/form"
import { SubmitButton } from "../custom-ui/form/home/submit-button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Client } from "@/lib/eden"
import { useTranslations } from "@/providers/language"
import { useQueryClient } from "@tanstack/react-query"
import { useToken } from "@/providers/token"

interface UserSettingCredentials {
    name: string
    email: string
    phone: string
}

interface UserSettingResponse {
    data: {
        token: string
    },
    token?: string
}

export function UserSettingForm(data: any) {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const client = Client()
    const t = useTranslations("UserSettingForm")
    const queryClient = useQueryClient()
    const { token, setToken } = useToken()

    const formConfig = useAppForm({
        defaultValues: {
            name: data?.data?.name || "",
            email: data?.data?.email || "",
            phone: data?.data?.phone || "",
        }
    })

    const { AppField, AppForm } = formConfig

    const userSettingMutation = useMutation({
        mutationFn: async (credentials: UserSettingCredentials): Promise<UserSettingResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }
            const { data, error } = await client.api.auth.profile.post(credentials)
            if (error) {
                throw new Error(error || 'Registration failed')
            }
            return data
        },
        onSuccess: async (response) => {
            setError(null);

            if (response?.data?.token) {
                setToken(response.data.token);
            }

            await queryClient.invalidateQueries({
                queryKey: ['profile'],
                refetchType: 'active',
            });

            await queryClient.invalidateQueries({
                queryKey: ['profile', token],
                refetchType: 'active',
            });

            router.refresh();
        },
        onError: (err: Error) => {
            setError(err.message || 'An error occurred during registration')
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name') as string
        const email = data?.data?.email
        const phone = formData.get('phone') as string
        if (!name) {
            setError('Please fill in all required fields')
            return
        }
        const credentials: UserSettingCredentials = {
            name,
            email,
            phone,
        }
        userSettingMutation.mutate(credentials)
    }

    return (
        <div className="w-full space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                {(error || userSettingMutation.error) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || userSettingMutation.error?.message}
                    </div>
                )}

                <AppField
                    name="name"
                    children={({ TextField }) => (
                        <TextField
                            label={t('name')}
                            name="name"
                            required
                            isInline={true}
                            disabled={userSettingMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="phone"
                    children={({ TextField }) => (
                        <TextField
                            label={t('phone')}
                            name="phone"
                            isInline={true}
                            disabled={userSettingMutation.isPending}
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
                            {userSettingMutation.isPending ? t("updating") : t("update")}
                        </SubmitButton>
                    </AppForm>
                </div>
            </form>
        </div>
    )
}