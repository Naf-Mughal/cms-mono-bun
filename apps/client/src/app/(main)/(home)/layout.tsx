import NavHeader from "@/components/home/nav-header";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-[calc(100vh-96px)] flex justify-between w-full overflow-hidden">
            <nav className="w-full max-w-62 flex felx-col gap-8 p-8 border-r border-r-[#EAEDF3]">
                <Link href={"/booklets"} className="nav-item">
                    <BookOpen size={20} />
                    Booklets
                </Link>
            </nav>
            <section className="flex-1 bg-[#F6F8FC] flex flex-col max-w-[calc(100%-248px)]">
                <Suspense fallback={null}>
                    <NavHeader />
                </Suspense>
                {children}
            </section>
        </main>
    );
}
