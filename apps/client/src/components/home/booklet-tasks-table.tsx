"use client"
import type React from "react"
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync"
import TableHeader from "@/components/custom-ui/table/table-header"
import TableRow from "@/components/custom-ui/table/table-row"
import { Eye, SquarePen } from "lucide-react"
import Link from "next/link"
import { BookletTaskTypesEnum, type GenaricBookletsTask } from "@schemas/index"
import StatusBadges from "../custom-ui/status-badges"

export interface TableData extends GenaricBookletsTask {
    _id: string
}

interface BookletTasksTableProps {
    data: TableData[]
    path?: string
    isLoading?: boolean
}

const getTypeColor = (type: string) => {
    switch (type) {
        case BookletTaskTypesEnum.Add:
            return "text-[#E8BD2E]"
        case BookletTaskTypesEnum.Update:
            return "text-[#007EA7]"
        case BookletTaskTypesEnum.Attachment:
            return "text-[#09B96D]"
        case BookletTaskTypesEnum.Decision:
            return "text-[#D82225]"
    }
}

// Skeleton loader component
const TasksTableSkeleton = () => {
    return (
        <div className="w-full flex gap-1 flex-col overflow-x-auto">
            <div style={{ overflowX: "auto" }}>
                <TableHeader>
                    <h2 className="font-semibold px-2 flex-1">#</h2>
                    <h2 className="font-semibold px-2 flex-2">Status</h2>
                    <h2 className="font-semibold px-2 flex-5">Task Name</h2>
                    <h2 className="font-semibold px-2 flex-3">Task Type</h2>
                    <h2 className="font-semibold px-2 flex-2 max-w-36">Actions</h2>
                </TableHeader>
            </div>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} style={{ overflowX: "auto" }}>
                    <TableRow>
                        <div className="px-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
                        </div>
                        <div className="px-2 flex-2">
                            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                        </div>
                        <div className="px-2 flex-5">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-2 flex-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                        </div>
                        <div className="px-2 flex-2 flex gap-3.5 items-center max-w-36">
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </TableRow>
                </div>
            ))}
        </div>
    )
}

const BookletTasksTable: React.FC<BookletTasksTableProps> = ({ data, path, isLoading = false }) => {
    // Show skeleton loader when loading
    if (isLoading) {
        return <TasksTableSkeleton />
    }

    return (
        <ScrollSync>
            <div className="w-full flex gap-1 flex-col overflow-x-auto">
                <ScrollSyncPane>
                    <TableHeader style={{ overflowX: "auto" }}>
                        <h2 className="font-semibold px-2 flex-1">#</h2>
                        <h2 className="font-semibold px-2 flex-2">Status</h2>
                        <h2 className="font-semibold px-2 flex-5">Task Name</h2>
                        <h2 className="font-semibold px-2 flex-3">Task Type</h2>
                        <h2 className="font-semibold px-2 flex-2 max-w-36">Actions</h2>
                    </TableHeader>
                </ScrollSyncPane>
                {data &&
                    data.map((item, index) => (
                        <ScrollSyncPane key={item._id}>
                            <TableRow style={{ overflowX: "auto" }}>
                                <h2 className="font-semibold px-2 flex-1">{index + 1}</h2>
                                <h2 className="font-semibold px-2 flex-2">
                                    <StatusBadges status={item.status} />
                                </h2>
                                <h2 className="font-semibold px-2 flex-5">{item.name}</h2>
                                <h2 className={`font-semibold px-2 flex-3 ${getTypeColor(item.type)}`}>{item.type}</h2>
                                <h2 className="font-semibold px-2 flex-2 flex gap-3.5 items-center max-w-36">
                                    <Eye />
                                    <Link href={{ pathname: `${path}/${item._id}/perform` }}>
                                        <SquarePen />
                                    </Link>
                                </h2>
                            </TableRow>
                        </ScrollSyncPane>
                    ))}
            </div>
        </ScrollSync>
    )
}

export default BookletTasksTable
