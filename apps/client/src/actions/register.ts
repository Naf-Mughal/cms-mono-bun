"use server"
import axiosClient from "@/lib/clientAxios";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type RegisterState = {
    success?: boolean
    error?: string,
    values?: {
        name?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
        phone?: string,
        organizationName?: string,
        userType?: "individual" | "organization"
    }
}
export async function registerAction(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    try {
        const { name, email, password, phone, organizationName = "", userType, confirmPassword } = Object.fromEntries(formData);
        const response = await axiosClient.post("/auth/register", { name, email, password, phone, organizationName, userType, confirmPassword });
        const cookieStore = await cookies()
        cookieStore.delete('token');
    } catch (error: any) {
        console.error("Register error:", error?.response?.data, error?.message);
        return {
            success: false,
            error: error?.response?.data?.message || error?.message,
        };
    }
    redirect("/");
}

