import { headers } from 'next/headers';
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BookletTaskPage() {
    const header = await headers();
    const path = header.get("x-current-path")
    return redirect(`${path}/tasks`)
}
