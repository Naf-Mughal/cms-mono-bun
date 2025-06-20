"use client"
import React, { useMemo, useTransition, useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronDown, Globe, LogOut, User, Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Client } from '@/lib/eden'
import { useToken } from '@/providers/token'
import { useLang, useTranslations } from '@/providers/language'
import Link from 'next/link'
import { usePathname as useNextPathname } from 'next/navigation'

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
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment()
    const client = Client()
    const { token, setToken } = useToken()
    const { lang, setLang, dir } = useLang()
    const t = useTranslations('Header')

    // Memoize to prevent unnecessary re-renders
    const shouldFetchProfile = useMemo(() =>
        pathname !== '/' && pathname !== '/register',
        [pathname]
    )

    const fetchProfile = useCallback(async () => {
        if (!token) throw new Error('No token available')
        return client.api.auth.profile.get()
    }, [client, token])

    const profileQuery = useQuery({
        queryKey: ['profile', token],
        queryFn: fetchProfile,
        enabled: shouldFetchProfile && !!token,
        retry: (failureCount, error) => {
            if (error.message.includes('Unauthorized') ||
                error.message.includes('Invalid token') ||
                error.message.includes('403') ||
                error.message.includes('401')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
    })

    useEffect(() => {
        if (!token) {
            queryClient.setQueryData(['profile', token], null)
            queryClient.removeQueries({ queryKey: ['profile'] })
        }
    }, [token, queryClient])

    const logoutMutation = useMutation({
        mutationFn: async (): Promise<void> => {
            localStorage.removeItem('token')
            setToken(null)
        },
        onSuccess: () => {
            setError(null)
            queryClient.removeQueries({ queryKey: ['profile'] })
            queryClient.clear()
            router.push('/')
        },
        onError: (err: Error) => {
            console.error('Logout error:', err)
            queryClient.removeQueries({ queryKey: ['profile'] })
            router.push('/')
        },
    })

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        startTransition(() => {
            logoutMutation.mutate()
        })
    }

    const handleNavigation = (path: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        startTransition(() => {
            router.push(path)
        })
    }

    const handleLanguageChange = (languageCode: "en" | "ar") => {
        setLang(languageCode)
        setIsLangPopoverOpen(false)
    }

    const currentLanguage = languages.find(l => l.code === lang) || languages[0]
    const { data } = profileQuery
    const profile: ProfileData | undefined = data?.data

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
                                    <Link href="/profile" className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300">
                                        <User size={24} />
                                        <span>{t('profile')}</span>
                                    </Link>

                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            disabled={logoutMutation.isPending}
                                            className="p-3 flex gap-3 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
                                        >
                                            <LogOut size={24} className={dir === "rtl" ? "" : "rotate-180"} />
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