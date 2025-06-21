import React from 'react'
import ReadOnlyDynamicTable from '../../components/readonly-dynamic-table'
import { ReadonlyList } from '../../components/readonly-list'
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'

const TwentyThirdPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
    const { elementRefs } = useTaskHighlight(currentTask)
    const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
    return (
        <div className="w-full ">
            <div className="py-6 mx-auto space-y-4 ">
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold text-black">القسم السابع: نطاق العمل المفصل</h3>
                </div>
                <div>
                    <h3 className="font-semibold mb-2"> 64 نطاق عمل المشروع </h3>
                    <div ref={createRef('projectScopeOfWork')}>
                        <ReadonlyList data={tasks.projectScopeOfWork || {}} />
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2 text-black">65	برنامج العمل</h3>
                    <p className=" mb-3">يلتزم المتعاقد في تنفيذ نطاق الأعمال خلال مدة ستة (6) أسابيع من تاريخ الترسية.</p>
                    <div ref={createRef('workProgramme')}>
                        <ReadonlyList data={tasks.workProgramme || {}} />
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2 text-black">66	مكان تنفيذ الأعمال</h3>
                    <p className="mb-3" ref={createRef('placeOfWork')}>{tasks?.placeOfWork}</p>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2 ">67 التدريب ونقل المعرفة</h3>
                    <p className=" mb-3" ref={createRef('trainingAndKnowledgeTransfer')}>{tasks?.trainingAndKnowledgeTransfer}</p>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2 ">68 بناء البرمجيات الحكومية</h3>
                    <p className=" mb-3" ref={createRef('buildingGovernmentSoftware')}>{tasks?.buildingGovernmentSoftware}</p>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2 text-black">69	جدول الكميات والأسعار</h3>
                    <div ref={createRef('quantityAndPriceTable')}>
                        <ReadOnlyDynamicTable data={tasks?.quantityAndPriceTable} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TwentyThirdPage