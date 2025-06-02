import { UpdataBookletTaskForm } from '@/components/booklets/update-task-form';
import { axiosAuthClient } from '@/lib/axios';
import IT from '@/components/web-views/it';
import { tryCatch } from '@utils/try-catch';
import { headers } from 'next/headers';
import React from 'react'

const PerformTask = async ({ searchParams, params }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>, params: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const header = await headers();
    const path = header.get("x-current-path") as string
    const pathWithoutPerformString = path.split("/perform")[0] as string
    const isOpen = (await searchParams)?.preview
    const { error: error, data: response } = await tryCatch(axiosAuthClient.get(pathWithoutPerformString))
    if (error) return "An error occured";
    const task = response.data.data
    const tasksEndpoint = `/booklets/${(await params)?.id}/tasks`
    const { error: tasksError, data: tasksRes } = await tryCatch(axiosAuthClient.get(tasksEndpoint))
    if (tasksError) return "An error occured";
    const tasks = tasksRes.data.data.bookletTasks
    // console.log(tasks, task)
    return (
        <div className='flex-1 flex p-3 justify-center items-center gap-4'>
            <div className="flex flex-col flex-1 bg-white rounded-md p-4 h-[calc(100vh-176px)] overflow-y-auto">
                <div className="border-b border-b-[#EAEDF3] py-3">
                    <h2 className='text-[#525355] font-bold text-xl'>{task.name}</h2>
                </div>
                <div className="flex flex-col gap-2 my-4">
                    <h2 className='text-[#525355] font-semibold text-lg'>Description</h2>
                    <p className='text-[#9A9AA7]'>{task.description}</p>
                </div>
                <UpdataBookletTaskForm path={path} data={task} />
            </div>
            <div className={`h-[calc(100vh-176px)] overflow-y-auto ${(isOpen === "true" || isOpen === "reload") ? 'block grow-1 max-w-1/2' : 'hidden grow-0'} bg-white rounded-md p-4`}>
                <IT path={path} tasks={tasks} reload={isOpen === "reload"} currentPageNumber={task.pageNumber} />
            </div>
        </div>
    )
}

export default PerformTask
