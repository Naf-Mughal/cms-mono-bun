import { CreateUpdataBookletForm } from '@/components/booklets/create-update-form'
import { axiosAuthClient } from '@/lib/axios';
import { tryCatch } from '@utils/try-catch';
import { headers } from 'next/headers';
import React from 'react'

const UpdateBooklet = async () => {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const paths = pathname?.split("/").splice(1);
    const currentPath: string = paths?.[paths?.length - 2] || "booklets";
    const { error, data: respones } = await tryCatch(axiosAuthClient.get(`/booklets/${currentPath}`))
    if (error) return "An error occured";
    return (
        <div className='flex-1 flex p-3 justify-center items-center'>
            <div className="h-full w-full bg-white rounded-md p-4">
                <CreateUpdataBookletForm id={currentPath} data={respones.data.data} />
            </div>
        </div>
    )
}

export default UpdateBooklet
