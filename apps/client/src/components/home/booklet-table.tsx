'use client'
import React from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import TableHeader from '@/components/custom-ui/table/table-header'
import TableRow from '@/components/custom-ui/table/table-row'
import { Download, Eye, SquarePen, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { DeleteDialog } from '../custom-ui/dialogs/delete.dialog'
import { DeleteBookletAction } from '@/actions/booklets'

export interface TableData {
    _id: string,
    index: number,
    category: string,
    issueDate: string,
    projectName: string,
    bookletNumber: number,
    department: string
}

interface BookletTableProps {
    data: TableData[]
}

const BookletTable: React.FC<BookletTableProps> = ({ data }) => {
    return (
        <ScrollSync>
            <div className="w-full flex gap-1 flex-col overflow-x-auto">
                <ScrollSyncPane>
                    <TableHeader style={{ overflowX: 'auto' }}>
                        <h2 className='font-semibold px-2 flex-1'>#</h2>
                        <h2 className='font-semibold px-2 flex-3'>Category</h2>
                        <h2 className='font-semibold px-2 flex-2'>Date of Creation</h2>
                        <h2 className='font-semibold px-2 flex-3'>Project Name</h2>
                        <h2 className='font-semibold px-2 flex-1'>No.</h2>
                        <h2 className='font-semibold px-2 flex-4'>Department</h2>
                        <h2 className='font-semibold px-2 flex-3 max-w-44'>Actions</h2>
                    </TableHeader>
                </ScrollSyncPane>
                {
                    data && data.map(item => (
                        <ScrollSyncPane key={item._id}>
                            <TableRow style={{ overflowX: 'auto' }}>
                                <h2 className='font-semibold px-2 flex-1'>{item.index}</h2>
                                <h2 className='font-semibold px-2 flex-3'>{item.category}</h2>
                                <h2 className='font-semibold px-2 flex-2'>{item.issueDate}</h2>
                                <h2 className='font-semibold px-2 flex-3'>{item.projectName}</h2>
                                <h2 className='font-semibold px-2 flex-1'>{item.bookletNumber}</h2>
                                <h2 className='font-semibold px-2 flex-4'>{item.department}</h2>
                                <h2 className='font-semibold px-2 flex-3 flex gap-3.5 items-center max-w-44'>
                                    <Link prefetch href={`/booklets/${item._id}/tasks`}>
                                        <Eye />
                                    </Link>
                                    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/booklets/${item._id}/download`} target='_blank' rel='noopener noreferrer' download={true} >
                                        <Download />
                                    </Link>
                                    <Link prefetch href={`/booklets/${item._id}/update`}>
                                        <SquarePen />
                                    </Link>
                                    <DeleteDialog action={DeleteBookletAction.bind(null, item._id)} />
                                </h2>
                            </TableRow>
                        </ScrollSyncPane>
                    ))
                }
            </div>
        </ScrollSync>
    )
}

export default BookletTable
