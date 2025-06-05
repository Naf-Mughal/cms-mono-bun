'use client'

import { usePathname, useRouter } from "next/navigation";

export default async function BookletTaskPage() {
    const router = useRouter();
    const path = usePathname();
    return router.push(`${path}/perform`)
}
