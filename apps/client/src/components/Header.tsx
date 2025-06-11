"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronDown, Globe, LogOut, User, Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Client } from '@/lib/eden'
import { useToken } from '@/providers/token'
import { useLang, useTranslations } from '@/providers/language'

interface ProfileData {
    name?: string
    email?: string
    avatar?: string
}

interface Language {
    code: string
    name: string
    nativeName: string
}

const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
]

const Header: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLangPopoverOpen, setIsLangPopoverOpen] = useState(false)
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const client = Client()
    const { token, setToken } = useToken()
    const { lang, setLang, dir } = useLang()
    const t = useTranslations('Header');

    // Determine if we should fetch profile based on pathname
    const shouldFetchProfile = pathname !== '/' && pathname !== '/register'

    // React Query for fetching profile - FIXED: Include token in query key and add proper refetch logic
    const profileQuery = useQuery({
        queryKey: ['profile', token], // Include token in query key so it refetches when token changes
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

    // FIXED: Add useEffect to handle token changes
    useEffect(() => {
        if (token && shouldFetchProfile) {
            // Refetch profile when token is set (login)
            profileQuery.refetch()
        } else if (!token) {
            // Clear profile data when token is removed (logout)
            queryClient.setQueryData(['profile', token], null)
        }
    }, [token, shouldFetchProfile, profileQuery, queryClient])

    // React Query mutation for logout - FIXED: Proper cache management
    const logoutMutation = useMutation({
        mutationFn: async (): Promise<void> => {
            // Remove token from localStorage first
            localStorage.removeItem('token')
            // Then update token state
            setToken(null)
        },
        onSuccess: () => {
            setError(null)
            // FIXED: Clear all queries related to authentication
            queryClient.removeQueries({ queryKey: ['profile'] })
            queryClient.clear() // Optional: clear entire cache for complete reset
            router.push('/')
        },
        onError: (err: Error) => {
            // Even if server logout fails, we still redirect since token is cleared
            console.error('Logout error:', err)
            // Still clear the cache and redirect
            queryClient.removeQueries({ queryKey: ['profile'] })
            router.push('/')
        },
    })

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        logoutMutation.mutate()
    }

    const handleLanguageChange = (languageCode: "en" | "ar") => {
        setLang(languageCode)
        setIsLangPopoverOpen(false)
    }

    // Get current language display info
    const currentLanguage = languages.find(l => l.code === lang) || languages[0]
    const profile = profileQuery.data?.data

    // FIXED: Add debug logging (remove in production)
    useEffect(() => {
        console.log('Header Debug:', {
            token: !!token,
            shouldFetchProfile,
            profileLoading: profileQuery.isLoading,
            profileData: !!profile,
            pathname
        })
    }, [token, shouldFetchProfile, profileQuery.isLoading, profile, pathname])

    return (
        <header className="h-24 border-b border-[#EAEDF3] flex items-center justify-between" dir={dir}>
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
                            {t('hello')} <span className='font-bold'>{profile?.name || ""} !</span>
                        </h2>
                    )}
                    {profileQuery.isLoading && shouldFetchProfile && (
                        <div className="text-[#9A9AA7]">Loading...</div>
                    )}
                </div>

                <div className="flex gap-4">
                    {/* Language Switch Popover */}
                    <Popover open={isLangPopoverOpen} onOpenChange={setIsLangPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 !p-0 hover:bg-gray-100/50 transition-colors">
                                <Globe className="h-5 w-5 text-[#525355]" />
                                <span className="font-bold text-[#525355] text-lg font-['TheSans']">
                                    {currentLanguage?.nativeName}
                                </span>
                                <ChevronDown className={`h-4 w-4 text-[#525355] transition-transform duration-200 ${isLangPopoverOpen ? 'rotate-180' : ''}`} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 !p-0" align='end'>
                            <div className="w-full flex flex-col rounded-xl p-1">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => handleLanguageChange(language.code as "en" | "ar")}
                                        className="p-3 flex justify-between items-center h-11 cursor-pointer hover:bg-gray-100/70 rounded-md transition-all duration-200 w-full text-left"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-[#525355]">
                                                {language.nativeName}
                                            </span>
                                            <span className="text-xs text-[#9A9AA7]">
                                                {language.name}
                                            </span>
                                        </div>
                                        {lang === language.code && (
                                            <Check className="h-4 w-4 text-[#09B96D]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

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
                            <PopoverContent className="w-40 !p-0" align='end' dir={dir}>
                                {/* Show error if logout fails */}
                                {(error || logoutMutation.error) && (
                                    <div className="p-2 text-sm text-red-600 bg-red-50 border-b">
                                        {error || logoutMutation.error?.message}
                                    </div>
                                )}

                                <div className="w-full flex flex-col rounded-xl p-1">
                                    <div className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300">
                                        <User size={24} />
                                        <span>{t('profile')}</span>
                                    </div>

                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            disabled={logoutMutation.isPending}
                                            className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
                                        >
                                            <LogOut size={24} className='rotate-180' />
                                            <span>
                                                {logoutMutation.isPending ? t('loggingOut') : t('logout')}
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