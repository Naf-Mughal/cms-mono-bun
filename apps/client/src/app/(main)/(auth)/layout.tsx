'use client'

import { useLang } from "@/providers/language";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { dir } = useLang();
    return (
        <main dir={dir}>
            {children}
        </main>
    );
}
