'use client'
import BookletTasksTable from '@/components/home/booklet-tasks-table'
import { Client } from '@/lib/eden';
import { useLang } from '@/providers/language';
import { useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'
const Dashboard: React.FC<any> = () => {
    const id = useParams().id as string;
    const path = usePathname();
    const client = Client();
    const { lang } = useLang()
    const { data: res, isLoading, isError } = useQuery({
        queryKey: ['booklet', id],
        queryFn: () => client?.api.booklets({ id }).tasks.get(),
        retry: false,
    });
    if (isError && !isLoading && !res) return "An error occured";
    console.log(res)
    const data = res?.data.data.bookletTasks.map((item: any) => {
        return { ...item, name: item.name[lang === "ar" ? 1 : 0] }
    })
    return (
        <section className='flex-1 flex flex-col gap-4 px-4'>
            <div className=""></div>
            <div className='w-full flex p-3 justify-center items-center gap-4'>
                <BookletTasksTable data={data} path={path} isLoading={isLoading} />
            </div>
        </section>
    )
}

export default Dashboard
