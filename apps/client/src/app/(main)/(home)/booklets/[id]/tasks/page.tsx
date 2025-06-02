export const dynamic = 'force-dynamic';
import BookletTable from '@/components/home/booklet-tasks-table'
import React from 'react'
import { tryCatch } from "@utils/try-catch"
import { axiosAuthClient } from '@/lib/axios'
import { headers } from 'next/headers';
const Dashboard: React.FC<any> = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const header = await headers();
    const path = header.get("x-current-path") as string
    const isOpen = (await searchParams)?.preview
    const { error, data: response } = await tryCatch(axiosAuthClient.get(path))
    if (error) return "An error occured";
    return (
        <section className='flex-1 flex flex-col gap-4 px-4'>
            <div className=""></div>
            <div className='w-full flex p-3 justify-center items-center gap-4'>
                <div className={`h-full ${isOpen === "true" ? 'w-1/2' : 'w-full'}`}>
                    <BookletTable data={response.data.data.bookletTasks} path={path} />
                </div>
                <div className={`h-full ${isOpen === "true" ? 'block grow-1' : 'hidden grow-0'} bg-white rounded-md p-4`}>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
