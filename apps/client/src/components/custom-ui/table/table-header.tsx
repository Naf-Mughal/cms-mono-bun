import React from 'react'

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, ...props }) => {
    return (
        <div className="w-full rounded-md" {...props}>
            <div className='bg-[#EAEDF3] px-4 py-auto border-b border-b-[#E9EAEB] min-w-[1440px]'>
                <div className="flex items-center h-11 w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TableHeader
