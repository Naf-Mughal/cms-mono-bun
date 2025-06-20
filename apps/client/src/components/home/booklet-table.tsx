"use client"
import type React from "react"
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync"
import TableHeader from "@/components/custom-ui/table/table-header"
import TableRow from "@/components/custom-ui/table/table-row"
import { Download, Eye, SquarePen } from "lucide-react"
import Link from "next/link"
import { DeleteDialog } from "../custom-ui/dialogs/delete.dialog"
import { Client } from "@/lib/eden"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useLang, useTranslations } from "@/providers/language"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export interface TableData {
    _id: string
    index: number
    category: string
    issueDate: string
    projectName: string
    bookletNumber: number
    department: string
}

interface BookletTableProps {
    data: TableData[]
    isLoading?: boolean
}

// Skeleton loader component
const TableSkeleton = () => {
    const t = useTranslations("BookletTable");
    const { dir } = useLang();
    return (
        <div className="w-full flex gap-1 flex-col overflow-x-auto" dir={dir}>
            <div style={{ overflowX: "auto" }}>
                <TableHeader>
                    <h2 className="font-semibold px-2 flex-1">#</h2>
                    <h2 className="font-semibold px-2 flex-3">{t("category")}</h2>
                    <h2 className="font-semibold px-2 flex-2">{t("dateOfCreation")}</h2>
                    <h2 className="font-semibold px-2 flex-3">{t("projectName")}</h2>
                    <h2 className="font-semibold px-2 flex-1">{t("bookletNumber")}</h2>
                    <h2 className="font-semibold px-2 flex-4">{t("department")}</h2>
                    <h2 className="font-semibold px-2 flex-3 max-w-44">{t("actions")}</h2>
                </TableHeader>
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} style={{ overflowX: "auto" }}>
                    <TableRow>
                        <div className="px-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-3 flex gap-3.5 items-center max-w-44">
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </TableRow>
                </div>
            ))}
        </div>
    )
}

const BookletTable: React.FC<BookletTableProps> = ({ data, isLoading = false }) => {
    const client = Client()
    const router = useRouter()
    const queryClient = useQueryClient()
    const t = useTranslations("BookletTable");
    const ts = useTranslations("SelectOptions");
    const { dir } = useLang();

    const deleteBookletMutation = useMutation({
        mutationFn: async (id: string) => {
            return await client.api.booklets({ id }).delete.post()
        },
        onSuccess: () => {
            // Invalidate booklets list and specific booklet
            queryClient.invalidateQueries({ queryKey: ["booklets"] })
            router.push("/booklets")
        },
        onError: (err: Error) => {
            console.log(err.message || "Failed to update booklet")
        },
    })

    // Show skeleton loader when loading
    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <ScrollSync>
            <div className="w-full flex gap-1 flex-col overflow-x-auto" dir={dir}>
                <ScrollSyncPane>
                    <TableHeader style={{ overflowX: "auto" }}>
                        <h2 className="font-semibold px-2 flex-1">#</h2>
                        <h2 className="font-semibold px-2 flex-3">{t("category")}</h2>
                        <h2 className="font-semibold px-2 flex-2">{t("dateOfCreation")}</h2>
                        <h2 className="font-semibold px-2 flex-3">{t("projectName")}</h2>
                        <h2 className="font-semibold px-2 flex-1">{t("bookletNumber")}</h2>
                        <h2 className="font-semibold px-2 flex-4">{t("department")}</h2>
                        <h2 className="font-semibold px-2 flex-3 max-w-44">{t("actions")}</h2>
                    </TableHeader>
                </ScrollSyncPane>
                {data &&
                    data.map((item) => (
                        <ScrollSyncPane key={item._id}>
                            <TableRow style={{ overflowX: "auto" }}>
                                <h2 className="font-semibold px-2 flex-1">{item.index}</h2>
                                <h2 className="font-semibold px-2 flex-3">{ts(item.category)}</h2>
                                <h2 className="font-semibold px-2 flex-2">{item.issueDate}</h2>
                                <h2 className="font-semibold px-2 flex-3">{item.projectName}</h2>
                                <h2 className="font-semibold px-2 flex-1">{item.bookletNumber}</h2>
                                <h2 className="font-semibold px-2 flex-4">{t(item.department)}</h2>
                                <h2 className="font-semibold px-2 flex-3 flex gap-3.5 items-center max-w-44">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link prefetch href={`/booklets/${item._id}/tasks`}>
                                                <Eye />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t("viewTasks")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_API_URL}/api/booklets/${item._id}/download`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={true}
                                            >
                                                <Download />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t("download")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>

                                        <TooltipTrigger>
                                            <Link prefetch href={`/booklets/${item._id}/update`}>
                                                <SquarePen />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t("update")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <DeleteDialog action={deleteBookletMutation.mutateAsync.bind(null, item._id)} />
                                </h2>
                            </TableRow>
                        </ScrollSyncPane>
                    ))}
            </div>
        </ScrollSync>
    )
}

export default BookletTable
