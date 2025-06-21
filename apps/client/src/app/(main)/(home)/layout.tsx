'use client'

import NavHeader from "@/components/home/nav-header";
import Protected from "@/components/Protected";
import { useLang, useTranslations } from "@/providers/language";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { dir } = useLang();
    const t = useTranslations("SideNav");
    const path = usePathname();
    return (
        <Protected>
            <main className="min-h-[calc(100vh-96px)] flex justify-between w-full overflow-hidden" dir={dir}>
                <nav className="w-full max-w-62 flex felx-col gap-8 p-8 border-r border-r-[#EAEDF3]">
                    <Link href={"/booklets"} className={`nav-item ${path.includes("/booklets") ? "active" : ""}`}>
                        <BookOpen size={20} />
                        {t('booklets')}
                    </Link>
                </nav>
                <section className="flex-1 bg-[#F6F8FC] flex flex-col max-w-[calc(100%-248px)]">
                    <Suspense fallback={null}>
                        <NavHeader />
                    </Suspense>
                    {children}
                </section>
            </main>
        </Protected>
    );
}
