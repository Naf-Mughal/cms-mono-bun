import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, Globe, LogOut, User } from 'lucide-react'
import { axiosAuthClient } from '@/lib/axios'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

const getProfile = async () => {
    try {
        const profile = (await axiosAuthClient.get("/auth/profile"))?.data
        return profile
    } catch (error: any) {
        console.log(error?.response?.data?.message || error?.message)
        return null
    }
}

async function signOut() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect("/");
}

const Header: React.FC = async () => {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    let profile = null
    if (pathname !== '/' && pathname !== '/register') {
        profile = await getProfile()
    }
    return (
        <header className="h-24 border-b border-[#EAEDF3] flex items-center justify-between">
            <div className={`flex items-center px-6 gap-2 w-full h-full max-w-62 ${profile ? "border-r border-r-[#EAEDF3]" : ""}`}>
                <svg width="39" height="33" viewBox="0 0 39 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.4692 0L19.0113 16.4961H19.0024L12.6453 5.53979L9.45789 0.0588512L9.46344 0.0532992L28.4692 0Z" fill="#09B96D" />
                    <path d="M19.0102 16.4995L9.55115 33.0001L28.5613 32.9479L19.0102 16.4995Z" fill="#09B96D" />
                    <path d="M38.0203 16.5715L28.3482 32.9455L19.0113 16.3772L38.0203 16.5715Z" fill="#09B96D" />
                    <path d="M19.0102 16.4994L12.6453 5.53978L9.4579 0.0588379L0.00111021 16.5527H0L0.00111021 16.5538L0 16.555H0.00111021L9.55116 33L19.0102 16.4994Z" fill="#007EA7" />
                </svg>

                <span className="text-[34px] font-bold text-[#525355]">CMS</span>
            </div>
            <div className="flex flex-1 justify-between items-center gap-3 px-6">
                <div className="flex items-center">
                    {
                        profile && <h2 className='text-xl text-[#525355]'>Hello <span className='font-bold'>{profile?.name || ""} !</span></h2>
                    }
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" className="flex items-center gap-2 !p-0">
                        <Globe className="h-5 w-5 text-[#525355]" />
                        <span className="font-bold text-[#525355] text-lg font-['TheSans']">العربية</span>
                    </Button>
                    {
                        profile && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" className='flex items-center justify-center gap-2 !p-0'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>User</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown size={24} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-34 !p-0" align='end'>
                                    <div className="w-full flex flex-col rounded-xl p-1">
                                        <div className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300">
                                            <User size={24} />
                                            <span>Profile</span>
                                        </div>
                                        <form action={signOut}>
                                            <button className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300">
                                                <LogOut size={24} className='rotate-180' />
                                                <span>Logout</span>
                                            </button>
                                        </form>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
