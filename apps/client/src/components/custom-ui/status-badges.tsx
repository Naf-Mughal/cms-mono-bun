'use client'
import { useTranslations } from '@/providers/language'
import { BookletTaskStatusesEnum } from '@schemas/index'
import React from 'react'

const StatusBadges = ({ status }: { status: string }) => {
  const t = useTranslations("BookletTasksTable");
  const getStatusColor = (status: string) => {
    switch (status) {
      case BookletTaskStatusesEnum.Pending:
        return "bg-[#F6F8FC] text-[#9A9AA7]"
      case BookletTaskStatusesEnum.Completed:
        return "bg-[#EEFFEE] text-[#09B96D]"
      case BookletTaskStatusesEnum.InProgress:
        return "bg-[#FFFBEA]"
    }
  }
  return (
    <div className={`w-full max-w-32 h-8 flex items-center justify-center rounded-sm ${getStatusColor(status)}`}>
      <h2 className="text-sm font-semibold">{t(status)}</h2>
    </div>
  )
}

export default StatusBadges
