'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLang, useTranslations } from "@/providers/language"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteDialog({ action }: { action?: () => void }) {
    const router = useRouter()
    const t = useTranslations("DeleteDialog")
    const { dir } = useLang()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 className="cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent dir={dir}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { action?.(); router.refresh() }}>{t("continue")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
