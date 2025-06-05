"use client"

import { Fragment, useEffect } from "react"
import { Trash2 } from "lucide-react"

interface RowsTableData {
    value: string[]
    children: {
        value: string[]
    }
}

interface RowsTableProps {
    data: RowsTableData
    setData: (data: RowsTableData) => void
}

export default function RowsTable({ data, setData }: RowsTableProps) {
    // Ensure there's at least one pair of rows
    useEffect(() => {
        const pairsCount = getPairsCount()
        if (pairsCount === 0) {
            handleAddPair()
        }
    }, [])

    // Get the number of name-description pairs
    const getPairsCount = () => {
        return Math.max(data.value?.length || 0, data.children?.value?.length || 0)
    }

    // Handle adding a new pair (name + description)
    const handleAddPair = () => {
        const updatedData = { ...data }

        // Initialize arrays if they don't exist
        if (!updatedData.value) updatedData.value = []
        if (!updatedData.children) updatedData.children = { value: [] }
        if (!updatedData.children.value) updatedData.children.value = []

        // Add empty name and description
        updatedData.value.push("")
        updatedData.children.value.push("")

        setData(updatedData)
    }

    // Handle editing a name (odd rows)
    const handleEditName = (pairIndex: number, value: string) => {
        const updatedData = { ...data }
        if (!updatedData.value) updatedData.value = []
        updatedData.value[pairIndex] = value
        setData(updatedData)
    }

    // Handle editing a description (even rows)
    const handleEditDescription = (pairIndex: number, value: string) => {
        const updatedData = { ...data }
        if (!updatedData.children) updatedData.children = { value: [] }
        if (!updatedData.children.value) updatedData.children.value = []
        updatedData.children.value[pairIndex] = value
        setData(updatedData)
    }

    // Handle deleting a pair (name + description)
    const handleDeletePair = (pairIndex: number) => {
        const pairsCount = getPairsCount()
        // Don't delete if it's the last pair
        if (pairsCount <= 1) return

        const updatedData = { ...data }

        // Remove the name and description at pairIndex
        if (updatedData.value) {
            updatedData.value.splice(pairIndex, 1)
        }
        if (updatedData.children?.value) {
            updatedData.children.value.splice(pairIndex, 1)
        }

        setData(updatedData)
    }

    const pairsCount = getPairsCount()

    return (
        <div className="space-y-2">
            <div className="overflow-x-auto">
                <table className="w-full border rounded-md" dir="rtl">
                    <thead className="border-b">
                        <tr className="bg-gray-50">
                            <th className="text-right font-bold text-sm py-2 px-3">Content</th>
                            <th className="w-[60px] py-2 px-1 text-center text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: pairsCount }).map((_, pairIndex) => (
                            <Fragment key={pairIndex}>
                                {/* Name row */}
                                <tr key={`name-${pairIndex}`} className="hover:bg-gray-50 border-b">
                                    <td className="p-0 border-l">
                                        <input
                                            type="text"
                                            value={data.value?.[pairIndex] || ""}
                                            onChange={(e) => handleEditName(pairIndex, e.target.value)}
                                            placeholder="Enter name"
                                            className="w-full text-right px-2 py-1.5 border-0 focus:ring-0 focus:outline-none font-medium"
                                        />
                                    </td>
                                    <td className="p-1 text-center" rowSpan={2}>
                                        <button
                                            onClick={() => handleDeletePair(pairIndex)}
                                            className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                                            disabled={pairsCount <= 1}
                                            title={pairsCount <= 1 ? "Cannot delete the last pair" : "Delete pair"}
                                        >
                                            <Trash2 className={`h-4 w-4 ${pairsCount <= 1 ? "opacity-50" : ""}`} />
                                        </button>
                                    </td>
                                </tr>
                                {/* Description row */}
                                <tr key={`desc-${pairIndex}`} className="hover:bg-gray-50 border-b">
                                    <td className="p-0 border-l">
                                        <input
                                            type="text"
                                            value={data.children?.value?.[pairIndex] || ""}
                                            onChange={(e) => handleEditDescription(pairIndex, e.target.value)}
                                            placeholder="Enter description"
                                            className="w-full text-right px-2 py-1.5 border-0 focus:ring-0 focus:outline-none text-gray-600 text-sm"
                                        />
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex">
                <button onClick={handleAddPair} className="text-green-600 hover:text-green-800 font-medium text-sm">
                    + Add Name & Description
                </button>
            </div>
        </div>
    )
}
