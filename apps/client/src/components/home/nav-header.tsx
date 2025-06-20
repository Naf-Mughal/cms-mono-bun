"use client"
import { usePreview } from '@/providers/preview';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Fragment } from 'react'
import { Button } from '../ui/button';
import { useLang, useTranslations } from '@/providers/language';



const NavHeader: React.FC = () => {
    const paths = usePathname()?.split("/").splice(1);
    const { preview, setPreview } = usePreview();
    const { dir } = useLang()
    const t = useTranslations('NavHeader');

    const rawPaths: any = {
        "booklets": { displayName: t("booklets"), linkName: t("create"), shouldLinkButton: true, linkPath: '/booklets/create' },
        "create": { displayName: t("create"), linkName: "", shouldLinkButton: false, linkPath: '' },
        "update": { displayName: t("update"), linkName: "", shouldLinkButton: false, linkPath: '' },
        "tasks": { displayName: t("tasks"), linkName: t("preview"), shouldLinkButton: true },
        "view": { displayName: t("view"), linkName: "", shouldLinkButton: false, linkPath: '' },
        "perform": { displayName: t("perform"), linkName: preview ? t("hide") : t("preview"), shouldLinkButton: true, linkPath: usePathname(), isPreview: true },
        "view-task": { displayName: t("view-task"), linkName: "", shouldLinkButton: false, linkPath: '' },
    }
    const filteredPaths = paths.filter((path) => rawPaths[path]!);
    const currentPath: string = filteredPaths?.[filteredPaths?.length - 1] || "booklets";

    return (
        <nav className="bg-white border border-[#EAEDF3] h-14 border-t-0 border-l-0 flex items-center justify-between px-6">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                    {(paths && paths?.length > 1) && (
                        <Link href={paths?.slice(0, -2).length > 1 ? `/${paths?.slice(0, -2).join('/')}` : '/booklets'}>
                            {dir === "rtl" ? <ChevronRight className='cursor-pointer' /> : <ChevronLeft className='cursor-pointer' />}
                        </Link>
                    )}
                    <h2 className='text-lg font-semibold'>{rawPaths[currentPath]?.displayName}</h2>
                </div>
                <div className="flex items-center gap-2">
                    {
                        filteredPaths?.map(item => (
                            <Fragment key={item}>
                                {dir === "rtl" ? <ChevronRight className='text-sm text-[#9A9AA7] last:hidden first:hidden cursor-pointer' /> : <ChevronLeft className='text-sm text-[#9A9AA7] last:hidden first:hidden cursor-pointer' />}
                                <h2 className='text-sm text-[#9A9AA7] last:text-[#007EA7] last:font-semibold last:text-base cursor-pointer'>{rawPaths[item]?.displayName}</h2>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            {
                (paths && rawPaths[currentPath]?.shouldLinkButton) && !rawPaths[currentPath]?.isPreview && (
                    <Link href={{ pathname: rawPaths[currentPath]?.linkPath as string, query: rawPaths[currentPath]?.queryParams }} className="w-44 h-10 rounded-md bg-[#007EA7] text-white flex justify-center items-center gap-1 cursor-pointer">
                        {
                            currentPath === "booklets" && <Plus />
                        }
                        <span className='font-semibold'>{rawPaths[currentPath]?.linkName}</span>
                    </Link>
                )
            }
            {rawPaths[currentPath]?.isPreview && (
                <Button className="w-44 h-10 rounded-md bg-[#007EA7] text-white flex justify-center items-center gap-1 cursor-pointer" type='button' onClick={() => setPreview(!preview)}>
                    <span className='font-semibold'>{rawPaths[currentPath]?.linkName}</span>
                </Button>
            )}
        </nav>
    )
}

export default NavHeader
