'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchUser } from '@/lib/fetchUser';
import MorphingLoader from './custom-ui/morphing-loader';

export default function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: fetchUser,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            router.replace('/');
        }
    }, [isError, router]);

    if (isLoading) return <div className="h-screen w-full flex justify-center items-center absolute inset-0"><MorphingLoader /></div>;

    if (data?.isAuthenticated) return <>{children}</>;

    return null;
}
