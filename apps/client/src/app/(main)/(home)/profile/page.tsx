'use client';
import React from 'react'
import { useLang, useTranslations } from '@/providers/language';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToken } from '@/providers/token';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LogOut, Lock, User } from 'lucide-react';
import { UserSettingForm } from '@/components/auth/user-setting-form';
import { Client } from '@/lib/eden';
import { UserPasswordForm } from '@/components/auth/user-password-form';

const page = () => {
    const t = useTranslations("ProfilePage");
    const [tab, setTab] = React.useState("accountSetting");
    const { setToken } = useToken()
    const { dir } = useLang()
    const queryClient = useQueryClient()
    const router = useRouter()
    const client = Client()
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await client.api.auth.profile.get()
            return data
        },
    })
    const logoutMutation = useMutation({
        mutationFn: async (): Promise<void> => {
            localStorage.removeItem('token')
            setToken(null)
        },
        onSuccess: () => {
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
        logoutMutation.mutate()
    }
    return (
        <section className='flex-1 flex flex-col gap-4 p-3'>
            <div className="h-full w-full bg-white rounded-md flex">
                <div className={`w-1/6 h-full p-3 border-[#EAEDF3] ${dir === "rtl" ? "border-l" : "border-r"}`}>
                    <div className="flex flex-col gap-2">
                        <button className={`nav-item ${tab === "accountSetting" ? "active" : ""}`} onClick={() => setTab("accountSetting")}>
                            <User size={20} />
                            {t('accountSetting')}
                        </button>
                        <button className={`nav-item ${tab === "changePassword" ? "active" : ""}`} onClick={() => setTab("changePassword")}>
                            <Lock size={20} />
                            {t('changePassword')}
                        </button>
                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                disabled={logoutMutation.isPending}
                                className="p-3 flex gap-3 text-red-500 items-center h-11 cursor-pointer hover:bg-gray-200/70 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
                            >
                                <LogOut size={24} className={dir === "rtl" ? "" : "rotate-180"} />
                                <span>
                                    {logoutMutation.isPending ? t('loggingOut') : t('logout')}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="w-5/6 flex flex-col">
                    <div className="h-14 flex items-center w-full border-b border-[#EAEDF3] px-4">
                        {tab === "accountSetting" && (
                            <h2 className="text-lg font-semibold">{t('accountSetting')}</h2>
                        )}
                        {tab === "changePassword" && (
                            <h2 className="text-lg font-semibold">{t('changePassword')}</h2>
                        )}
                    </div>
                    {tab === "accountSetting" && (
                        <div className="h-full w-full bg-white rounded-md p-4">
                            <UserSettingForm data={data as any} />
                        </div>
                    )}
                    {tab === "changePassword" && (
                        <div className="h-full w-full bg-white rounded-md p-4">
                            <UserPasswordForm />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default page