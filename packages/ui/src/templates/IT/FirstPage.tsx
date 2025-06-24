import React from 'react'
import { BookletCitiesArabicEnum, BookletDaysArabicEnum } from "@schemas/index";
const FirstPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full h-[217mm] flex items-center justify-center text-black">
            <div className="flex flex-col items-center justify-center h-full w-full gap-4 leading-loose">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl text-center">
                        نموذج كراسة الشروط والمواصفات
                    </h1>
                    <h1 className="text-4xl text-center pb-4">
                        (تقنية المعلومات)
                    </h1>
                    <p className="text-center font-semibold text-lg">
                        المعتمد بموجب قرار وزير المالية رقم (1440) وتاريخ
                    </p>
                    <p className="text-center font-semibold text-lg">
                        1441/4/12هـ ، والمعدل بموجب القرارات الوزارية رقم
                    </p>
                    <p className="text-center font-semibold text-lg">
                        (1156) وتاريخ 17/10/1445ه، و رقم (1171) وتاريخ
                    </p>
                    <p className="text-center font-semibold text-lg">
                        20/10/1445هـ
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-lg">
                    <div className="flex items-center justify-center">
                        <span className="font-semibold">اسم المنافسة:</span>
                        <span className="py-1 px-2">{tasks?.projectName}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="font-semibold">رقم الكراسة:</span>
                        <span className="py-1 px-2">{tasks?.bookletNumber}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="font-semibold">تاريخ طرح الكراسة:</span>
                        <span className="py-1 px-2">{`${(BookletDaysArabicEnum as any)[tasks?.issueDay]}/${tasks?.issueDate}/${(BookletCitiesArabicEnum as any)[tasks?.issueCity]}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstPage
