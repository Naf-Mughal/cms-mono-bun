"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAppForm } from "../custom-ui/form"
import { userSchema } from "@schemas/index"
import { RadioField } from "../custom-ui/form/radio-field"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Client } from "@/lib/eden"
import { useTranslations } from "@/providers/language"

type UserType = "individual" | "organization"

interface RegisterCredentials {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    organizationName?: string
    userType: UserType
}

interface RegisterResponse {
    data: {
        token: string
    }
}

export function RegisterForm() {
    const [error, setError] = useState<string | null>(null)
    const [userType, setUserType] = useState<UserType>("individual")
    const router = useRouter()
    const client = Client()
    const t = useTranslations("RegisterPage");

    const formConfig = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            organizationName: "",
            userType: "individual" as UserType,
        },
        validators: {
            onChange: userSchema
        }
    })

    const { AppField, AuthSubmitButton, AppForm, Subscribe } = formConfig

    const registerMutation = useMutation({
        mutationFn: async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }
            const { data, error } = await client.api.auth.register.post(credentials)
            if (error) {
                throw new Error(error || 'Registration failed')
            }
            return data
        },
        onSuccess: (data) => {
            setError(null)
            router.push('/')
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
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        const phone = formData.get('phone') as string
        const organizationName = formData.get('organizationName') as string
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all required fields')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        if (userType === "organization" && !organizationName) {
            setError('Organization name is required')
            return
        }
        const credentials: RegisterCredentials = {
            name,
            email,
            password,
            confirmPassword,
            phone,
            userType,
            ...(userType === "organization" && { organizationName })
        }
        registerMutation.mutate(credentials)
    }

    return (
        <div className="max-w-xl w-full space-y-4">
            <h1 className="text-2xl font-bold text-[#525355]">{t('title')}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Show error from state or mutation */}
                {(error || registerMutation.error) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || registerMutation.error?.message}
                    </div>
                )}

                <AppField
                    name="name"
                    children={({ AuthTextField }) => (
                        <AuthTextField
                            label={t('name')}
                            name="name"
                            disabled={registerMutation.isPending}
                        />
                    )}
                />
                <Subscribe
                    selector={(state) => state.values.userType}
                    children={(userType) => (
                        <AppField
                            name="userType"
                            children={({ RadioGroupField, handleChange }) => (
                                <RadioGroupField label={t('userType')}>
                                    <RadioField
                                        value="organization"
                                        label="Organization"
                                        selected={userType === "organization"}
                                        onClick={() => { setUserType("organization"); handleChange("organization") }}
                                    />
                                    <RadioField
                                        value="individual"
                                        label="Individual"
                                        selected={userType === "individual"}
                                        onClick={() => { setUserType("individual"); handleChange("individual") }}
                                    />
                                </RadioGroupField>
                            )}
                        />
                    )}
                />
                <Subscribe
                    selector={(state) => state.values.userType}
                    children={(userType) => (
                        <>
                            {userType === "organization" && (
                                <AppField
                                    name="organizationName"
                                    children={({ AuthTextField }) => (
                                        <AuthTextField
                                            label={t('organizationName')}
                                            name="organizationName"
                                            disabled={registerMutation.isPending}
                                        />
                                    )}
                                />
                            )}

                        </>
                    )}
                />
                <AppField
                    name="email"
                    children={({ AuthTextField }) => (
                        <AuthTextField
                            label={t('email')}
                            name="email"
                            disabled={registerMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="phone"
                    children={({ AuthTextField }) => (
                        <AuthTextField
                            label={t('phone')}
                            name="phone"
                            disabled={registerMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="password"
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField
                            label={t('password')}
                            name="password"
                            disabled={registerMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="confirmPassword"
                    validators={{
                        onChangeListenTo: ['password'],
                        onChange: ({ value, fieldApi }) => {
                            if (value !== fieldApi.form.getFieldValue('password')) {
                                return [{ code: "custom", path: ['confirmPassword'], message: 'Passwords does not match' }]
                            }
                            return undefined
                        },
                    }}
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField
                            label={t('confirmPassword')}
                            name="confirmPassword"
                            disabled={registerMutation.isPending}
                        />
                    )}
                />

                <AppForm>
                    <AuthSubmitButton>
                        {registerMutation.isPending ? t("registering") : t("register")}
                    </AuthSubmitButton>
                </AppForm>
            </form>

            <div className="flex justify-center items-center gap-3 pt-4">
                <span className="text-[#9A9AA7]">{t("already")}</span>
                <Link href="/" className="text-[#007EA7] font-semibold">
                    {t("login")}
                </Link>
            </div>
        </div>
    )
}