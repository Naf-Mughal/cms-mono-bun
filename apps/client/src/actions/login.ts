"use server"

import axiosClient from "@/lib/clientAxios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
    success?: boolean;
    error?: string;
    values?: {
        email?: string;
        password?: string;
    };
    data?: any;
};

export async function loginAction(
    prevState: unknown,
    formData: FormData
): Promise<LoginState> {
    try {
        const { email, password } = Object.fromEntries(formData);
        const response = (await axiosClient.post("/auth/login", { email, password }))?.data;
        const cookieStore = await cookies()
        cookieStore.set('token', response.data.token || "")
    } catch (error: any) {
        console.error("Login error:", error?.response?.data || error?.message);
        return {
            success: false,
            error: error?.response?.data?.message || error?.message,
        };
    }
    redirect("/booklets");
}
