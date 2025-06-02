"use client"

import { useActionState } from "react"
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs"
import { useTransform } from "@tanstack/react-form"
import { userSchema } from "@schemas/index"
import { useAppForm } from "../custom-ui/form"
import { registerAction } from "@/actions/register"
import { RadioField } from "../custom-ui/form/radio-field"
import Link from "next/link"

type UserType = "individual" | "organization";

export function RegisterForm() {
    const [state, formAction] = useActionState(registerAction, initialFormState)

    const { AppField, AuthSubmitButton, AppForm, Subscribe } = useAppForm({
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
        },
        transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    })

    return (
        <div className="max-w-xl w-full space-y-4">
            <h1 className="text-2xl font-bold text-[#525355]">Welcome Back</h1>

            <form action={formAction} className="space-y-6">
                {state?.error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">{state.error}</div>}

                <AppField
                    name="name"
                    children={({ AuthTextField }) => (
                        <AuthTextField label="Name" />
                    )}
                />
                <Subscribe
                    selector={(state) => state.values.userType}
                    children={(userType) => (
                        <AppField
                            name="userType"
                            children={({ AuthRadioGroupField, handleChange }) => (
                                <AuthRadioGroupField label="User Type">
                                    <RadioField value="organization" label="Organization" selected={userType === "organization"} onClick={() => handleChange("organization")} />
                                    <RadioField value="individual" label="Individual" selected={userType === "individual"} onClick={() => handleChange("individual")} />
                                </AuthRadioGroupField>
                            )}
                        />
                    )}
                />

                <Subscribe
                    selector={(state) => state.values.userType}
                    children={(userType) => {
                        return userType === "organization" && (
                            <AppField
                                name="organizationName"
                                children={({ AuthTextField }) => (
                                    <AuthTextField label="Organization Name" />
                                )}
                            />
                        )
                    }
                    }
                />

                <AppField
                    name="email"
                    children={({ AuthTextField }) => (
                        <AuthTextField label="Email" />
                    )}
                />

                <AppField
                    name="phone"
                    children={({ AuthTextField }) => (
                        <AuthTextField label="Phone" />
                    )}
                />

                <AppField
                    name="password"
                    children={({ AuthPasswordField }) => (
                        <AuthPasswordField label="Password" />
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
                        <AuthPasswordField label="Confirm Password" />
                    )}
                />

                <AppForm>
                    <AuthSubmitButton>Sign Up</AuthSubmitButton>
                </AppForm>
            </form>

            <div className="flex justify-center items-center gap-3 pt-4">
                <span className="text-[#9A9AA7]">Already have an account?</span>
                <Link href="/" className="text-[#007EA7] font-semibold">
                    Sign in
                </Link>
            </div>
        </div>
    )
}

