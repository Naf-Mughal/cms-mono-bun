"use client"

import { UpdataBookletTaskForm } from '@/components/booklets/update-task-form';
import MorphingLoader from '@/components/custom-ui/morphing-loader';
import IT from '@/components/web-views/it';
import { Client } from '@/lib/eden';
import { useLang, useTranslations } from '@/providers/language';
import { usePreview } from '@/providers/preview';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

const PerformTask = () => {
    const { id, taskId } = useParams();
    const client = Client();
    const { preview } = usePreview();
    const { lang } = useLang();
    const t = useTranslations("CreateUpdataBookletForm");

    // Fetch tasks
    const { data: tasksRes, isLoading: tasksIsLoading, isError: tasksIsError } = useQuery({
        queryKey: ['booklet', 'tasks', id],
        queryFn: () => client?.api.booklets({ id: id as string }).tasks.get(),
        enabled: !!client && !!id,
        retry: false,
    });

    // Fetch specific task
    const { data: res, isLoading, isError } = useQuery({
        queryKey: ['booklet', id, taskId],
        queryFn: () => client?.api.booklets({ id: id as string }).tasks({ taskId: taskId as string }).get(),
        enabled: !!client && !!id && !!taskId,
        retry: false,
    });

    if (tasksIsLoading || isLoading) {
        return <div className="flex-1 flex justify-center items-center h-[calc(100vh-176px)]"><MorphingLoader /></div>;
    }
    if (tasksIsError || isError || !tasksRes || !res) {
        return <div className="flex-1 flex justify-center items-center h-[calc(100vh-176px)]">An error occurred</div>;
    }

    const tasks = tasksRes.data.data.bookletTasks;
    const task = res.data.data;

    return (
        <div className="flex-1 flex p-3 justify-center items-center gap-4">
            <div className="flex flex-col flex-1 bg-white rounded-md p-4 h-[calc(100vh-176px)] overflow-y-auto">
                <div className="border-b border-b-[#EAEDF3] py-3">
                    <h2 className="text-[#525355] font-bold text-xl">{task.name[lang === "ar" ? 1 : 0]}</h2>
                </div>
                <div className="flex flex-col gap-2 my-4">
                    <h2 className="text-[#525355] font-semibold text-lg">{t("description")}</h2>
                    <p className="text-[#9A9AA7]">{task.description[lang === "ar" ? 1 : 0]}</p>
                </div>
                <UpdataBookletTaskForm id={id as string} taskId={taskId as string} data={task} />
            </div>
            <div
                className={`h-[calc(100vh-176px)] overflow-y-auto bg-white rounded-md p-4 ${preview ? 'block grow-1 max-w-1/2' : 'hidden grow-0'}`}
            >
                <IT tasks={tasks} currentPageNumber={task.pageNumber} />
            </div>
        </div>
    );
};

export default PerformTask;