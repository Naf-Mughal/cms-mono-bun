'use client'
import { useToken } from '@/providers/token';
import { treaty } from '@elysiajs/eden'
import type { App } from '@server/app'

export const Client = () => {
    const { token } = useToken()
    const client = treaty<App>('http://localhost:8080', {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return client
}
