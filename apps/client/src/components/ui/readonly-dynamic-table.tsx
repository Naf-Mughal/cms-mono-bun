"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

interface SingleTableData {
    id: string
    tableName: string
    columns: string[]
    rows: string[][]
    footerValues: string[]
}

interface TablesData {
    tables: SingleTableData[]
    summary?: {
        total: number
        tax: number
        grandTotal: number
    }
}

interface ReadOnlyDynamicTableProps {
    data: TablesData
}

export default function ReadOnlyDynamicTable({ data }: ReadOnlyDynamicTableProps) {
    // Fixed footer row labels
    const footerLabels = ["Total", "Tax", "Grand Total"]

    return (
        <div className="container max-w-5xl">
            <div className="flex flex-col gap-4">
                {data?.tables?.map((table) => (
                    <Card key={table?.id} className="border-0 shadow-none py-4 px-2">
                        <CardHeader className="py-3 px-4">
                            <span className="font-bold text-lg">{table?.tableName}</span>
                        </CardHeader>

                        <CardContent className="px-0 pt-0">
                            <div className="overflow-x-auto">
                                <div className="border-0 rounded-md">
                                    <table className="w-full border-0" dir="rtl">
                                        <thead>
                                            <tr>
                                                <th
                                                    colSpan={table?.columns?.length}
                                                    className="p-3 border text-center font-bold text-lg"
                                                >
                                                    {table?.tableName}
                                                </th>
                                            </tr>
                                            <tr>
                                                {table?.columns?.map((column, colIndex) => (
                                                    <th key={colIndex} className="p-2 border text-right">
                                                        <span>{column}</span>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="border-b-0">
                                            {table?.rows?.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-b-0">
                                                    {row?.map((cell, colIndex) => (
                                                        <td key={colIndex} className="p-2 border border-b-0 text-right">
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Separate Footer Table - Also RTL */}
                                    {table?.columns?.length > 0 && (
                                        <table className="w-full border-0" dir="rtl">
                                            <tbody>
                                                {footerLabels?.map((label, index) => (
                                                    <tr key={`footer-${index}`}>
                                                        <td className="p-2 border font-medium text-right w-7/10">
                                                            {label}
                                                        </td>
                                                        <td className="p-2 border w-3/10 text-right">
                                                            {table?.footerValues[index] || ""}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Summary Table - Only shown if there are tables */}
                {data?.tables?.length > 0 && data?.summary && (
                    <Card className="border-0 shadow-none px-2">
                        <CardContent className="p-0 px-0 pt-0">
                            <div className="overflow-x-auto">
                                <table className="w-full rounded-lg" dir="rtl">
                                    <thead>
                                        <tr>
                                            <th colSpan={2} className="p-3 border text-center font-bold text-lg">
                                                Summary of All Tables
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Total
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {data.summary.total.toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Tax
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {data.summary.tax.toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Grand Total
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {data.summary.grandTotal.toFixed(2)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}