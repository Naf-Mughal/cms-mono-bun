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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLang, useTranslations } from "@/providers/language"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteDialog({ action }: { action?: () => void }) {
    const router = useRouter()
    const t = useTranslations("DeleteDialog")
    const { dir } = useLang()
    return (
        <AlertDialog>
            <Tooltip>
                <TooltipTrigger>
                    <AlertDialogTrigger asChild>
                        <Trash2 className="cursor-pointer" />
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{t("delete")}</p>
                </TooltipContent>
            </Tooltip>
            <AlertDialogContent dir={dir}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { action?.(); router.refresh() }} className="hover:cursor-pointer">{t("continue")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
