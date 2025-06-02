'use client'
import React from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import TableHeader from '@/components/custom-ui/table/table-header'
import TableRow from '@/components/custom-ui/table/table-row'
import { Eye, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { BookletTaskTypesEnum, type GenaricBookletsTask } from '@schemas/index'
import StatusBadges from '../custom-ui/status-badges'

export interface TableData extends GenaricBookletsTask {
    _id: string,
}


interface BookletTableProps {
    data: TableData[],
    path?: string
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

const BookletTable: React.FC<BookletTableProps> = ({ data, path }) => {
    return (
        <ScrollSync>
            <div className="w-full flex gap-1 flex-col overflow-x-auto">
                <ScrollSyncPane>
                    <TableHeader style={{ overflowX: 'auto' }}>
                        <h2 className='font-semibold px-2 flex-1'>#</h2>
                        <h2 className='font-semibold px-2 flex-2'>Status</h2>
                        <h2 className='font-semibold px-2 flex-5'>Task Name</h2>
                        <h2 className='font-semibold px-2 flex-3'>Task Type</h2>
                        <h2 className='font-semibold px-2 flex-2 max-w-36'>Actions</h2>
                    </TableHeader>
                </ScrollSyncPane>
                {
                    data && data.map((item, index) => (
                        <ScrollSyncPane key={item._id}>
                            <TableRow style={{ overflowX: 'auto' }}>
                                <h2 className='font-semibold px-2 flex-1'>{index + 1}</h2>
                                <h2 className='font-semibold px-2 flex-2'>
                                    <StatusBadges status={item.status} />
                                </h2>
                                <h2 className='font-semibold px-2 flex-5'>{item.name}</h2>
                                <h2 className={`font-semibold px-2 flex-3 ${getTypeColor(item.type)}`}>{item.type}</h2>
                                <h2 className='font-semibold px-2 flex-2 flex gap-3.5 items-center max-w-36'>
                                    <Eye />
                                    <Link href={{ pathname: `${path}/${item._id}/perform`, query: { preview: "true" } }}>
                                        <SquarePen />
                                    </Link>
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
