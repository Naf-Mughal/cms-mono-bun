'use client'
import { useToken } from '@/providers/token';
import { treaty } from '@elysiajs/eden'
import type { App } from '@server/app'

export const Client = () => {
    const { token } = useToken()
    const client = treaty<App>(process.env.NEXT_PUBLIC_API_URL!, {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return client
}
