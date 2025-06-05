'use client'
import BookletTable from '@/components/home/booklet-tasks-table'
import { Client } from '@/lib/eden';
import { useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'
const Dashboard: React.FC<any> = () => {
    const id = useParams().id as string;
    const path = usePathname();
    const client = Client();
    const { data: res, isLoading, isError } = useQuery({
        queryKey: ['booklet', id],
        queryFn: () => client?.api.booklets({ id }).tasks.get(),
        retry: false,
    });
    if (isError && !isLoading && !res) return "An error occured";
    console.log(res)
    return (
        <section className='flex-1 flex flex-col gap-4 px-4'>
            <div className=""></div>
            <div className='w-full flex p-3 justify-center items-center gap-4'>
                <BookletTable data={res?.data.data.bookletTasks} path={path} isLoading={isLoading} />
            </div>
        </section>
    )
}

export default Dashboard
