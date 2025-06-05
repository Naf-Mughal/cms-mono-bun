'use client'
import { Client } from '@/lib/eden';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'next/navigation'
import { CreateUpdataBookletForm } from '@/components/booklets/create-update-form';

const UpdateBooklet = () => {
    const id = useParams().id as string;
    const client = Client();
    const { data: res, isLoading, isError } = useQuery({
        queryKey: ['booklets', id],
        queryFn: () => client?.api.booklets({ id }).get(),
        retry: false,
    });
    if (isError && !res) return "An error occured";
    console.log(res)
    return (
        <div className='flex-1 flex p-3 justify-center items-center'>
            <div className="h-full w-full bg-white rounded-md p-4">
                <CreateUpdataBookletForm id={id} data={res?.data.data} />
            </div>
        </div>
    )
}

export default UpdateBooklet
