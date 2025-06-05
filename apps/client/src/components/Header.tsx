"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronDown, Globe, LogOut, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Client } from '@/lib/eden'
import { useToken } from '@/providers/token'

interface ProfileData {
    name?: string
    email?: string
    avatar?: string
}

interface ProfileResponse {
    data: ProfileData
}

const Header: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const client = Client()
    const { token, setToken } = useToken()

    // Determine if we should fetch profile based on pathname
    const shouldFetchProfile = pathname !== '/' && pathname !== '/register'

    // React Query for fetching profile
    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: () => client.api.auth.profile.get(),
        enabled: shouldFetchProfile && !!token, // Only fetch if we should and have token
        retry: (failureCount, error) => {
            // Don't retry on auth errors
            if (error.message.includes('Unauthorized') ||
                error.message.includes('Invalid token')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    // React Query mutation for logout
    const logoutMutation = useMutation({
        mutationFn: async (): Promise<void> => {
            localStorage.removeItem('token')
            setToken(null)
        },
        onSuccess: () => {
            setError(null)
            router.push('/')
        },
        onError: (err: Error) => {
            // Even if server logout fails, we still redirect since token is cleared
            console.error('Logout error:', err)
            router.push('/')
        },
    })

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        logoutMutation.mutate()
    }

    console.log(profileQuery.data)
    const profile = profileQuery.data?.data

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
                    {profile && !profileQuery.isLoading && (
                        <h2 className='text-xl text-[#525355]'>
                            Hello <span className='font-bold'>{profile?.name || ""} !</span>
                        </h2>
                    )}
                    {profileQuery.isLoading && shouldFetchProfile && (
                        <div className="text-[#9A9AA7]">Loading...</div>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button variant="ghost" className="flex items-center gap-2 !p-0">
                        <Globe className="h-5 w-5 text-[#525355]" />
                        <span className="font-bold text-[#525355] text-lg font-['TheSans']">العربية</span>
                    </Button>

                    {profile && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className='flex items-center justify-center gap-2 !p-0'
                                    disabled={logoutMutation.isPending}
                                >
                                    <Avatar>
                                        <AvatarImage src={profile.avatar || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>
                                            {profile.name?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <ChevronDown size={24} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-34 !p-0" align='end'>
                                {/* Show error if logout fails */}
                                {(error || logoutMutation.error) && (
                                    <div className="p-2 text-sm text-red-600 bg-red-50 border-b">
                                        {error || logoutMutation.error?.message}
                                    </div>
                                )}

                                <div className="w-full flex flex-col rounded-xl p-1">
                                    <div className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300">
                                        <User size={24} />
                                        <span>Profile</span>
                                    </div>

                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            disabled={logoutMutation.isPending}
                                            className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
                                        >
                                            <LogOut size={24} className='rotate-180' />
                                            <span>
                                                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header