'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MorphingLoader from './custom-ui/morphing-loader';
import { Client } from '@/lib/eden';
import { useToken } from '@/providers/token';

export default function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const client = Client();

    const { setToken, token } = useToken();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['authUser', token],
        queryFn: async () => {
            if (!client) {
                throw new Error('Client not found')
            }
            return await client.api.auth.profile.get()
        },
        retry: false,
        enabled: !!token,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (isError || data?.response?.status === 401 || data?.response?.status === 403) {
            router.replace('/');
            setToken(null);
        }
    }, [isError, data?.response]);

    if (isLoading || !data?.data) return <div className="h-screen w-full flex justify-center items-center absolute inset-0"><MorphingLoader /></div>;

    if (data?.data) return <>{children}</>;

    return null;
}
