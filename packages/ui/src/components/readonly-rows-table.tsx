"use client"

import { Fragment } from "react/jsx-runtime"

interface TableData {
    value: string[] // Names (rows 1, 3, 5, etc.)
    children: {
        value: string[] // Descriptions (rows 2, 4, 6, etc.)
    }
}

interface ReadonlyRowsTableProps {
    data: TableData
}

export default function ReadonlyRowsTable({ data }: ReadonlyRowsTableProps) {
    // Get the number of name-description pairs
    const getPairsCount = () => {
        return Math.max(data.value?.length || 0, data.children?.value?.length || 0)
    }

    const pairsCount = getPairsCount()

    // If no data, show empty state
    if (pairsCount === 0) {
        return null
    }

    return (
        <div className="space-y-2">
            <div className="overflow-x-auto">
                <table className="w-full border rounded-md" dir="rtl">
                    <thead className="border-b">
                        <tr className="bg-gray-50">
                            <th className="text-right font-bold text-sm py-2 px-3">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: pairsCount }).map((_, pairIndex) => (
                            <Fragment key={pairIndex}>
                                {/* Name row */}
                                <tr key={`name-${pairIndex}`} className="hover:bg-gray-50 border-b">
                                    <td className="px-3 py-2 border-l">
                                        <div className="text-right font-medium">{data.value?.[pairIndex] || "—"}</div>
                                    </td>
                                </tr>
                                {/* Description row */}
                                <tr key={`desc-${pairIndex}`} className="hover:bg-gray-50 border-b">
                                    <td className="px-3 py-2 border-l">
                                        <div className="text-right text-gray-600 text-sm">{data.children?.value?.[pairIndex] || "—"}</div>
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
