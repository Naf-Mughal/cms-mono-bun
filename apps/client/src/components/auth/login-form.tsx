"use client"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAppForm } from "../custom-ui/form"
import { loginSchema } from "@schemas/index"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Client } from "@/lib/eden"
import { useToken } from "@/providers/token"

interface LoginCredentials {
    email: string
    password: string
}

interface LoginResponse {
    data: {
        token: string
    }
}

export function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const client = Client()
    const { setToken } = useToken()

    const formConfig = useAppForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: loginSchema
        }
    })

    const { AppField, AuthSubmitButton, AppForm } = formConfig

    // React Query mutation for login
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }
            const { data, error } = await client.api.auth.login.post(credentials)
            if (error) {
                throw new Error(error || 'Login failed')
            }
            if (!data?.data?.token) {
                throw new Error('Invalid response: token not found')
            }
            return data
        },
        onSuccess: (data) => {
            setError(null)
            localStorage.setItem('token', data.data.token)
            setToken(data.data.token)
            router.push('/booklets')
        },
        onError: (err: Error) => {
            setError(err.message || 'An error occurred during login')
        },
        // Optional: Configure retry behavior
        retry: (failureCount, error) => {
            if (error.message.includes('Invalid credentials') ||
                error.message.includes('Unauthorized')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Get form values
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        // Validate form data
        if (!email || !password) {
            setError('Please fill in all required fields')
            return
        }

        // Trigger the mutation
        loginMutation.mutate({ email, password })
    }

    return (
        <div className="max-w-xl w-full space-y-8">
            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-[#525355]">Welcome Back</h1>
                <p className="text-[#9A9AA7]">Please enter your email and password to login</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Show error from state or mutation */}
                {(error || loginMutation.error) && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error || loginMutation.error?.message}
                    </div>
                )}

                <AppField
                    name="email"
                    children={({ AuthTextField }) => (
                        <AuthTextField
                            label="Email"
                            name="email"
                            disabled={loginMutation.isPending}
                        />
                    )}
                />

                <AppField
                    name="password"
                    children={({ AuthPasswordField }) => (
                        <div className="space-y-2">
                            <AuthPasswordField
                                label="Password"
                                name="password"
                                disabled={loginMutation.isPending}
                            />
                            <div className="flex justify-end">
                                <a href="#" className="text-[#007EA7]">
                                    Forgot Password
                                </a>
                            </div>
                        </div>
                    )}
                />

                <AppForm>
                    <AuthSubmitButton>
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </AuthSubmitButton>
                </AppForm>
            </form>

            <div className="flex justify-center items-center gap-3 pt-4">
                <span className="text-[#9A9AA7]">Don't have an account?</span>
                <Link href="/register" className="text-[#007EA7] font-semibold">
                    Sign Up
                </Link>
            </div>
        </div>
    )
}