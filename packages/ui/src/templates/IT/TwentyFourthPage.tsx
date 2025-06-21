import { ReadonlyList } from '../../components/readonly-list'
import ReadonlyTable from '../../components/readonly-table'
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'
import React from 'react'

const TwentyFourthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
    const { elementRefs } = useTaskHighlight(currentTask)
    const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
    return (
        <div className="w-full">
            <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold text-black">القسم الثامن: المواصفات</h3>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">70	فريق العمل </h3>
                    <p className="mb-3"><span className="font-semibold">أولاً:</span> الشروط الخاصة بفريق العمل</p>
                    <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
                        <li className="text-black"><span>١.</span> ‌يجب على المتعاقد الالتزام بتمكين السعوديين من العمل في وظائف المشروع مع الالتزام بتطبيق دليل توطين عقود التشغيل والصيانة بالجهات العامة الصادر بموجب قرار معالي وزير الموارد البشرية والتنمية الاجتماعية رقم (73483) وتاريخ 30/4/1444هـ وجميع الأوامر والأنظمة والتعليمات الصادرة في هذا الشأن من وزارة الموارد البشرية والتنمية الاجتماعية.</li>
                        <li className="text-black"><span>٢.</span> ‌يلتزم المتعاقد بنقل جميع الموظفين السعوديين الموجودين في العقد القائم إلى هذا العقد، على ألا تقل الأجور والمزايا عن التي يتقاضونها في العقد  القائم أو الحد الأدنى للأجور أيهما أعلى.</li>
                        <div ref={createRef('labor')}>
                            <ReadonlyList data={tasks?.labor} />
                        </div>
                    </ol>
                </div>
            </div>
            <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <p className="mb-3"><span className="font-semibold">ثانياً:</span> جدول مواصفات فريق العمل</p>
                    <div ref={createRef('laborTable')}>
                        <ReadonlyTable data={tasks?.laborTable} />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 text-black">71	الأصناف والمواد</h3>
                    <p className="mb-3 text-black"><span className="font-semibold">أولاً:</span> الشروط الخاصة بالأصناف والمواد</p>
                    <p className="mb-3 text-black">تخضع المواد المستخدمة في تنفيذ الأعمال للمواصفات والمقاييس المعمول بها في المملكة العربية السعودية.</p>
                    <div ref={createRef('materials')}>
                        <p>{tasks?.materials}</p>
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <p className="mb-3"><span className="font-semibold">ثانياً:</span> جدول مواصفات المواد</p>
                    <div ref={createRef('materialsTable')}>
                        <ReadonlyTable data={tasks?.materialsTable} />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 text-black">72	المعدات</h3>
                    <p className="mb-3 text-black"><span className="font-semibold">أولاً:</span> الشروط الخاصة بالمعدات</p>
                    <p className="mb-3 text-black">تخضع المعدات المستخدمة في تنفيذ الأعمال للمواصفات والمقاييس المعمول بها في المملكة العربية السعودية.</p>
                    <div ref={createRef('equipment')}>
                        <p>{tasks?.equipment}</p>
                    </div>
                    <p className="mb-3 text-black"><span className="font-semibold">ثانياً:</span> جدول مواصفات المعدات</p>
                    <div ref={createRef('equipmentTable')}>
                        <ReadonlyTable data={tasks?.equipmentTable} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TwentyFourthPage