"use client"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Fragment } from 'react'



const NavHeader: React.FC = () => {
    const paths = usePathname()?.split("/").splice(1);
    const params = useSearchParams();
    console.log(paths?.slice(0,-2), "paths");
    const rawPaths: any = {
        "booklets": { displayName: "Booklets", linkName: "Create Booklet", shouldLinkButton: true, linkPath: '/booklets/create' },
        "create": { displayName: "Create Booklet", linkName: "", shouldLinkButton: false, linkPath: '' },
        "update": { displayName: "Edit Booklets", linkName: "", shouldLinkButton: false, linkPath: '' },
        "tasks": { displayName: "Booklets Tasks", linkName: "Preview Booklet" , shouldLinkButton: true},
        "view": { displayName: "View Booklets", linkName: "", shouldLinkButton: false, linkPath: '' },
        "perform": { displayName: "Perform Booklet Task", linkName: params.get("preview") === "true" ? "Hide Preview" : "Preview Booklet", shouldLinkButton: true, linkPath: usePathname(), queryParams: params.get("preview") === "true" ? { preview: false } : { preview: true } },
        "view-task": { displayName: "View Booklet Task", linkName: "", shouldLinkButton: false, linkPath: '' },
    }
    const filteredPaths = paths.filter((path) => rawPaths[path]!);
    const currentPath: string = filteredPaths?.[filteredPaths?.length - 1] || "booklets";

    return (
        <nav className="bg-white border border-[#EAEDF3] h-14 border-t-0 border-l-0 flex items-center justify-between px-6">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                    {(paths && paths?.length > 1) && (
                        <Link href={`/${paths?.slice(0,-2).join('/')}`} prefetch>
                            <ChevronLeft />
                        </Link>
                    )}
                    <h2 className='text-lg font-semibold'>{rawPaths[currentPath]?.displayName}</h2>
                </div>
                <div className="flex items-center gap-2">
                    {
                        filteredPaths?.map(item => (
                            <Fragment key={item}>
                                <ChevronRight className='text-sm text-[#9A9AA7] last:hidden first:hidden cursor-pointer' />
                                <h2 className='text-sm text-[#9A9AA7] last:text-[#007EA7] last:font-semibold last:text-base cursor-pointer'>{rawPaths[item]?.displayName}</h2>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            {
                (paths && rawPaths[currentPath]?.shouldLinkButton) && (
                    <Link prefetch href={{ pathname: rawPaths[currentPath]?.linkPath as string, query: rawPaths[currentPath]?.queryParams }} className="w-44 h-10 rounded-md bg-[#007EA7] text-white flex justify-center items-center gap-1 cursor-pointer">
                        {
                            currentPath === "booklets" && <Plus />
                        }
                        <span className='font-semibold'>{rawPaths[currentPath]?.linkName}</span>
                    </Link>
                )
            }
        </nav>
    )
}

export default NavHeader
