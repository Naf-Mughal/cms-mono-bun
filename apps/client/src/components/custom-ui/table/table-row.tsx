import React from 'react'

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => {
    return (
        <div className="w-full rounded-md" {...props}>
            <div className='bg-white px-4 py-auto min-w-[1440px]'>
                <div className="flex h-14 items-center w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TableRow
