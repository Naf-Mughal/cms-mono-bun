"use server"
import { axiosAuthClient } from "@/lib/axios"
import { formDataToJson } from "@/utils/parseForm"

export type BookletState = {
    success?: boolean
    error?: string,
    values?: {
        bookletType?: "internal" | "external",
        category?: string,
        projectName?: string,
        bookletNumber?: string,
        issueDate?: string,
        issueCity?: string,
    },
    data?: any
}
export async function CreateUpdateBookletAction(prevState: any, formData: FormData, id?: string): Promise<BookletState> {
    try {
        const { bookletType, category, projectName, bookletNumber, issueDate, issueCity } = Object.fromEntries(formData);
        if (id && id !== "") {
            const res = (await axiosAuthClient.post(`/booklets/${id}/update`, { bookletType, category, projectName, bookletNumber, issueDate, issueCity }))?.data;
            return { success: true, data: res };
        }
        else {
            const res = (await axiosAuthClient.post("/booklets/create", { bookletType, category, projectName, bookletNumber, issueDate, issueCity }))?.data;
            return { success: true, data: res };
        }
    } catch (error: any) {
        console.error("Booklet error:", error?.response?.data, error?.message);
        return {
            success: false,
            error: error?.response?.data?.message || error?.message,
        };
    }
}


export async function UpdateBookletTaskAction(prevState: any, formData: FormData, path: string, dynamicTableData: any, updatedData: any): Promise<BookletState> {
    try {
        console.log(formData)
        const data = formDataToJson(formData);
        console.log(data)
        const res = (await axiosAuthClient.post(path, { ...data, ...(Object.keys(data).length === 0 && { data: updatedData }), tableData: dynamicTableData }))?.data;
        return { success: true, data: res };

    } catch (error: any) {
        console.error("Booklet error:", error?.response?.data, error?.message);
        return {
            success: false,
            error: error?.response?.data?.message || error?.message,
        };
    }
}

export async function DeleteBookletAction(id?: string): Promise<BookletState> {
    try {
        const res = (await axiosAuthClient.post(`/booklets/${id}/delete`))?.data;
        return { success: true, data: res };
    } catch (error: any) {
        console.error("Booklet error:", error?.response?.data, error?.message);
        return {
            success: false,
            error: error?.response?.data?.message || error?.message,
        };
    }
}
