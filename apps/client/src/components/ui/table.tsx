"use client"

import { useEffect } from "react"
import { Trash2 } from "lucide-react"

interface TableData {
    value: string[]
    children: {
        value: string
        children: {
            value: string[]
        }
    }[]
}

interface TableProps {
    data: TableData
    setData: (data: TableData) => void
}

export default function Table({ data, setData }: TableProps) {
    // Ensure there's at least one row
    useEffect(() => {
        const rowsCount = getRowsCount()
        if (rowsCount === 0) {
            handleAddRow()
        }
    }, [])

    // Get maximum rows count from all children arrays
    const getRowsCount = () => {
        if (!data.children || data.children.length === 0) return 0

        return Math.max(...data.children.map((column) => column.children.value.length || 0))
    }

    // Handle adding a new row
    const handleAddRow = () => {
        const updatedData = { ...data }

        // Add new empty value to each column's children array
        updatedData.children.forEach((column) => {
            column.children.value.push("")
        })

        setData(updatedData)
    }

    // Handle editing a cell
    const handleEditCell = (rowIndex: number, columnIndex: number, value: string) => {
        const updatedData = { ...data }
        updatedData.children[columnIndex].children.value[rowIndex] = value
        setData(updatedData)
    }

    // Handle deleting a row
    const handleDeleteRow = (rowIndex: number) => {
        const rowsCount = getRowsCount()
        // Don't delete if it's the last row
        if (rowsCount <= 1) return

        const updatedData = { ...data }

        // Remove the value at rowIndex from each column's children array
        updatedData.children.forEach((column) => {
            column.children.value.splice(rowIndex, 1)
        })

        setData(updatedData)
    }

    const rowsCount = getRowsCount()

    return (
        <div className="space-y-2">
            <div className="overflow-x-auto">
                <table className="w-full border rounded-md" dir="rtl">
                    <thead className="border-b">
                        <tr className="bg-gray-50">
                            {data?.value?.map((header, index) => (
                                <th key={index} className="text-right font-bold text-sm py-2 px-3 ">
                                    {header}
                                </th>
                            ))}
                            <th className="w-[60px]  py-2 px-1 text-center text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Existing rows */}
                        {Array.from({ length: rowsCount })?.map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50  border-b last:border-b-0">
                                {data.children.map((column, columnIndex) => (
                                    <td key={columnIndex} className="p-0 border-l ">
                                        <input
                                            type="text"
                                            value={column.children.value[rowIndex] || ""}
                                            onChange={(e) => handleEditCell(rowIndex, columnIndex, e.target.value)}
                                            placeholder="Enter value"
                                            className="w-full text-right px-2 py-1.5 border-0 focus:ring-0 focus:outline-none"
                                        />
                                    </td>
                                ))}
                                <td className="p-1 text-center">
                                    <button
                                        onClick={() => handleDeleteRow(rowIndex)}
                                        className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                                        disabled={rowsCount <= 1}
                                        title={rowsCount <= 1 ? "Cannot delete the last row" : "Delete row"}
                                    >
                                        <Trash2 className={`h-4 w-4 ${rowsCount <= 1 ? "opacity-50" : ""}`} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex">
                <button onClick={handleAddRow} className="text-green-600 hover:text-green-800 font-medium text-sm">
                    (+ Add Row)
                </button>
            </div>
        </div>
    )
}
