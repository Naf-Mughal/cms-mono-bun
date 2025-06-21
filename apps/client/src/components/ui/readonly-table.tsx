import React from 'react'

interface TableData {
    value: string[]
    children: {
        value: string
        children: {
            value: string[]
        }
    }[]
}

interface ReadonlyTableProps {
    data: TableData
}

export default function ReadonlyTable({ data }: ReadonlyTableProps) {
    // Determine the number of rows based on the longest column
    const rowsCount = data.children && data.children.length > 0
        ? Math.max(...data.children.map(col => col.children.value.length))
        : 0

    return (
        <div className="overflow-x-auto">
            <table className="w-full border" dir="rtl">
                <thead className='border-b'>
                    <tr className="bg-gray-50">
                        {data?.value?.map((header, index) => (
                            <th
                                key={index}
                                className="text-right font-bold text-sm py-2 px-3 "
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowsCount })?.map((_, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 border-b last:border-b-0">
                            {data.children.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="p-2 text-right text-sm border-l last:border-0"
                                >
                                    {col.children.value[rowIndex] ?? ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
