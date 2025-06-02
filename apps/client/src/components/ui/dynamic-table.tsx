"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit, Check, ChevronDown, ChevronUp, Calculator } from "lucide-react"

// Define the table data structure for external access
export interface SingleTableData {
    editingColumnIndex: any
    newColumnName: any
    id: string
    tableName: string
    columns: string[]
    rows: string[][]
    footerValues: string[]
}

export interface TablesData {
    tables: SingleTableData[]
    summary?: {
        total: number
        tax: number
        grandTotal: number
    }
}

interface DynamicTableProps {
    onDataChange?: (data: TablesData) => void
    initialData?: TablesData  // New prop for initial data
}

export default function DynamicTable({ onDataChange, initialData }: DynamicTableProps) {
    // Initialize state with initialData if provided
    const [tables, setTables] = useState<SingleTableData[]>(() => {
        if (initialData?.tables) {
            return initialData.tables.map(table => ({
                ...table,
                editingColumnIndex: undefined,
                newColumnName: undefined
            }))
        }
        return []
    })

    const [showAddTable, setShowAddTable] = useState(false)
    const [tableName, setTableName] = useState("")
    const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({})
    const tableRef = useRef<HTMLDivElement>(null)

    // Calculate summary values from all tables
    const summary = useMemo(() => {
        let totalSum = 0
        let taxSum = 0
        let grandTotalSum = 0

        tables.forEach((table) => {
            // Parse the "Total" value (index 0)
            const total = Number.parseFloat(table.footerValues[0]) || 0
            totalSum += total

            // Parse the "Tax" value (index 1)
            const tax = Number.parseFloat(table.footerValues[1]) || 0
            taxSum += tax

            // Parse the "Grand Total" value (index 2)
            const grandTotal = Number.parseFloat(table.footerValues[2]) || 0
            grandTotalSum += grandTotal
        })

        return {
            total: totalSum,
            tax: taxSum,
            grandTotal: grandTotalSum,
        }
    }, [tables])

    // Function to get current tables data including summary
    const getTablesData = useCallback((): TablesData => {
        return {
            tables: tables.map(table => ({
                id: table.id,
                tableName: table.tableName,
                columns: table.columns,
                rows: table.rows,
                footerValues: table.footerValues,
                // Omit editing-related fields from the output
                editingColumnIndex: undefined,
                newColumnName: undefined
            })),
            summary,
        }
    }, [tables, summary])

    // Notify parent component when data changes
    useEffect(() => {
        if (onDataChange) {
            onDataChange(getTablesData())
        }
    }, [tables, summary])

    // Initialize expanded tables state when initial data loads
    useEffect(() => {
        if (initialData?.tables) {
            const expanded: Record<string, boolean> = {}
            initialData.tables.forEach(table => {
                expanded[table.id] = true
            })
            setExpandedTables(expanded)
        }
    }, [initialData])

    const addTable = () => {
        if (tableName.trim()) {
            // Generate a unique ID for the new table
            const newTableId = `table-${Date.now()}`

            // Create initial columns and rows
            const initialColumns = ["Column 1", "Column 2", "Column 3"]
            const initialRows = Array(4)
                .fill(0)
                .map(() => Array(initialColumns.length).fill(""))

            // Create the new table
            const newTable: SingleTableData = {
                id: newTableId,
                tableName,
                columns: initialColumns,
                rows: initialRows,
                footerValues: ["", "", ""],
                editingColumnIndex: undefined,
                newColumnName: undefined
            }

            // Add the new table to the list
            setTables([...tables, newTable])

            // Expand the new table
            setExpandedTables({
                ...expandedTables,
                [newTableId]: true,
            })

            // Reset the table name input and hide the add table field
            setTableName("")
            setShowAddTable(false)
        }
    }

    const toggleAddTable = () => {
        setShowAddTable(!showAddTable)
    }

    const toggleTableExpansion = (tableId: string) => {
        setExpandedTables({
            ...expandedTables,
            [tableId]: !expandedTables[tableId],
        })
    }

    const addColumn = (tableId: string) => {
        const tableIndex = tables.findIndex((t) => t.id === tableId)
        if (tableIndex === -1) return

        const table = tables[tableIndex]
        const columnCount = table.columns.length
        const newColumnName = `Column ${columnCount + 1}`

        const updatedTables = [...tables]
        updatedTables[tableIndex] = {
            ...table,
            columns: [...table.columns, newColumnName],
            rows: table.rows.map((row) => [...row, ""]),
        }

        setTables(updatedTables)
    }

    const startEditingColumn = (tableId: string, colIndex: number) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                return {
                    ...table,
                    editingColumnIndex: colIndex,
                    newColumnName: table.columns[colIndex],
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const updateNewColumnName = (tableId: string, value: string) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                return { ...table, newColumnName: value }
            }
            return table
        })
        setTables(updatedTables)
    }

    const confirmEditColumn = (tableId: string) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId && table.editingColumnIndex !== undefined && table.newColumnName?.trim()) {
                const updatedColumns = [...table.columns]
                updatedColumns[table.editingColumnIndex] = table.newColumnName
                return {
                    ...table,
                    columns: updatedColumns,
                    editingColumnIndex: undefined,
                    newColumnName: "",
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const addRow = (tableId: string) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const newRow = Array(table.columns.length).fill("")
                return {
                    ...table,
                    rows: [...table.rows, newRow],
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const updateCell = (tableId: string, rowIndex: number, colIndex: number, value: string) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedRows = [...table.rows]
                updatedRows[rowIndex][colIndex] = value
                return {
                    ...table,
                    rows: updatedRows,
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const removeRow = (tableId: string, rowIndex: number) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedRows = table.rows.filter((_, index) => index !== rowIndex)
                return {
                    ...table,
                    rows: updatedRows,
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const removeColumn = (tableId: string, colIndex: number) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedColumns = table.columns.filter((_, index) => index !== colIndex)
                const updatedRows = table.rows.map((row) => row.filter((_, index) => index !== colIndex))
                return {
                    ...table,
                    columns: updatedColumns,
                    rows: updatedRows,
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    const updateFooterValue = (tableId: string, index: number, value: string) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedFooterValues = [...table.footerValues]
                updatedFooterValues[index] = value
                return {
                    ...table,
                    footerValues: updatedFooterValues,
                }
            }
            return table
        })
        setTables(updatedTables)
    }

    // Fixed footer row labels
    const footerLabels = ["Total", "Tax", "Grand Total"]

    return (
        <div className="container max-w-5xl">
            <div className="flex flex-col gap-4">
                {tables.map((table) => (
                    <Card key={table.id} className="border-0 shadow-none py-4 px-2">
                        <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => toggleTableExpansion(table.id)}>
                            <div className="flex gap-2 items-center">
                                {expandedTables[table.id] ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                                <span className="font-bold text-lg">{table.tableName}</span>
                            </div>
                        </CardHeader>

                        {expandedTables[table.id] && (
                            <CardContent className="px-0 pt-0">
                                <div className="overflow-x-auto">
                                    <div className="border-0 rounded-md">
                                        <table className="w-full border-0" dir="rtl">
                                            <thead>
                                                <tr>
                                                    <th
                                                        colSpan={table.columns.length + 1}
                                                        className="p-3 border text-center font-bold text-lg"
                                                    >
                                                        {table.tableName}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    {table.columns.map((column, colIndex) => (
                                                        <th key={colIndex} className="p-2 border text-right">
                                                            <div className="flex justify-between items-center">
                                                                {table.editingColumnIndex === colIndex ? (
                                                                    <div className="flex items-center w-full">
                                                                        <Button type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => confirmEditColumn(table.id)}
                                                                            className="h-6 w-6 ml-1"
                                                                        >
                                                                            <Check className="h-4 w-4" />
                                                                        </Button>
                                                                        <Input
                                                                            value={table.newColumnName || ""}
                                                                            onChange={(e) => updateNewColumnName(table.id, e.target.value)}
                                                                            className="h-8"
                                                                            autoFocus
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex">
                                                                            {table.columns.length > 1 && (
                                                                                <Button type="button"
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    onClick={() => removeColumn(table.id, colIndex)}
                                                                                    className="h-6 w-6 text-destructive ml-1"
                                                                                >
                                                                                    <Trash2 className="h-3 w-3" />
                                                                                </Button>
                                                                            )}
                                                                            <Button type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                onClick={() => startEditingColumn(table.id, colIndex)}
                                                                                className="h-6 w-6 ml-1"
                                                                            >
                                                                                <Edit className="h-3 w-3" />
                                                                            </Button>
                                                                        </div>
                                                                        <span>{column}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </th>
                                                    ))}
                                                    <th className="p-2 border w-10 text-center">
                                                        <Button type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => addColumn(table.id)}
                                                            className="h-6 w-6"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="border-b-0">
                                                {table.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className="border-b-0">
                                                        {row.map((cell, colIndex) => (
                                                            <td key={colIndex} className="p-2 border border-b-0">
                                                                <Input
                                                                    value={cell}
                                                                    onChange={(e) => updateCell(table.id, rowIndex, colIndex, e.target.value)}
                                                                    className="border-0 p-0 w-full h-h-full rounded-none focus-visible:!ring-0 !shadow-none focus-visible:!outline-none focus:!outline-none text-right"
                                                                />
                                                            </td>
                                                        ))}
                                                        <td className="p-2 border border-b-0">
                                                            {table.columns.length > 0 && table.rows.length > 1 && (
                                                                <Button type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => removeRow(table.id, rowIndex)}
                                                                    className="h-6 w-6 text-destructive"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Separate Footer Table - Also RTL */}
                                        {table.columns.length > 0 && (
                                            <table className="w-full border-0" dir="rtl">
                                                <tbody>
                                                    {footerLabels.map((label, index) => (
                                                        <tr key={`footer-${index}`}>
                                                            <td className="p-2 border font-medium text-right w-7/10">
                                                                {label}
                                                            </td>
                                                            <td className="p-2 border w-3/10 ">
                                                                <Input
                                                                    type="text"
                                                                    value={table.footerValues[index] || ""}
                                                                    onKeyDown={(e) => {
                                                                        const allowedKeys = [
                                                                            "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End",
                                                                        ];
                                                                        if (
                                                                            !/[0-9]/.test(e.key) &&
                                                                            !allowedKeys.includes(e.key)
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => updateFooterValue(table.id, index, e.target.value)}
                                                                    className="border-0 p-0 w-full h-h-full rounded-none focus-visible:!ring-0 !shadow-none focus-visible:!outline-none focus:!outline-none text-right"
                                                                    placeholder="Enter value"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    {table.columns.length > 0 && (
                                        <div className="font-semibold cursor-pointer text-[#09B96D]" onClick={() => addRow(table.id)}>
                                            (Add row)
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}

                <div className="flex justify-end w-full">
                    {
                        !showAddTable && <Button type="button" onClick={toggleAddTable}>
                            Add New Table
                        </Button>
                    }
                    {/* Table Name Input - Only shown when showAddTable is true */}
                    {showAddTable && (
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="tableName">Enter Table Name:</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="tableName"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    placeholder="Enter the name of your table"
                                />
                                <Button type="button" onClick={toggleAddTable}>
                                    Cancel
                                </Button>
                                <Button type="button" onClick={addTable} disabled={!tableName.trim()}>
                                    Add Table
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Table - Only shown if there are tables */}
                {tables.length > 0 && (
                    <Card className="border-0 shadow-none px-2">
                        <CardHeader className="py-3 px-4 ">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5" />
                                    <span className="font-bold text-lg">Summary Table</span>
                                </div>
                            </div>
                        </CardHeader>
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
                                        <tr className="">
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Total
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {summary.total.toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Tax
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {summary.tax.toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="p-2 border font-medium text-right" style={{ width: "70%" }}>
                                                Grand Total
                                            </td>
                                            <td className="p-2 border text-right font-bold" style={{ width: "30%" }}>
                                                {summary.grandTotal.toFixed(2)}
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