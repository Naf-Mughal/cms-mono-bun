import React from 'react'
import { ReadonlyList } from '../../components/readonly-list'

const TwentySeventhPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full">
            <div className="py-6 mx-auto space-y-4">
                <div className="">
                    <h3 className="text-black">القسم العاشر: متطلبات برنامج المشاركة الاقتصادية (التوازن الاقتصادي)</h3>
                </div>
                <div>
                    <p className="mb-3">
                        يجب على المتنافس الالتزام بما ورد في سياسة المشاركة الاقتصادية الصادرة من هيئة المحتوى المحلي والمشتريات الحكومية، وتسليم متطلبات المشاركة الاقتصادية في ملف مستقل ليتم دراسته من قبل هيئة المحتوى المحلي والمشتريات الحكومية والذي يجب أن يحتوي على الآتي:
                    </p>
                    <ReadonlyList data={tasks.economicParticipationProgramRequirements || {}} />
                </div>
            </div>
        </div>
    )
}

export default TwentySeventhPage