"use client"
import { useActionState } from "react"
import { loginAction } from "@/actions/login"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { useTransform, mergeForm } from "@tanstack/react-form"
import { useAppForm } from "../custom-ui/form"
import { loginSchema } from "@schemas/index"
import Link from "next/link"

export function LoginForm() {
    const [state, formAction] = useActionState(async (prev: any, form: any) => {
        return await loginAction(prev, form)
    }, initialFormState)
    const { AppField, AuthSubmitButton, AppForm } = useAppForm({
        defaultValues: {
            email: "",
            password: "",
        },
        transform: useTransform((baseForm) => {
            return mergeForm(baseForm, state!)
        }, [state]),
        validators: {
            onChange: loginSchema
        },
    })

    return (
        <div className="max-w-xl w-full space-y-8">
            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-[#525355]">Welcome Back</h1>
                <p className="text-[#9A9AA7]">Please enter your email and password to login</p>
            </div>

            <form
                action={formAction}
                className="space-y-6">
                {state?.error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">{state.error}</div>}

                <AppField
                    name="email"
                    children={({ AuthTextField }) => (
                        <AuthTextField label="Email" />
                    )}
                />

                <AppField
                    name="password"
                    children={({ AuthPasswordField }) => (
                        <div className="space-y-2">
                            <AuthPasswordField label="Password" />
                            <div className="flex justify-end">
                                <a href="#" className="text-[#007EA7]">
                                    Forgot Password
                                </a>
                            </div>
                        </div>
                    )}
                />

                <AppForm>
                    <AuthSubmitButton>Login</AuthSubmitButton>
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

