import React from 'react'
import { ReadonlyList } from '../../components/readonly-list';

const TwentySecondPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full text-black">
            <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">

                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2">60	غرامات التأخير</h3>
                    <p className="mb-3"><span className="font-semibold">أولًا:</span> تفرض على المتعاقد غرامة [تأخير] إذا قصّر أو أخفق في تنفيذ التزاماته وفقًا لما يلي:</p>
                    <ReadonlyList data={tasks.finesList || {}} />
                    <p className="mb-3"><span className="font-semibold">ثانياً:</span> لا يتجاوز إجمالي الغرامة المنصوص عليها في هذا البند عن <span>[{tasks.fines || "5"} %] بالمئة</span> من القيمة الإجمالية للعقد.</p>
                </div>

                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2">61	غرامات مخالفة أحكام لائحة تفضيل المحتوى المحلي </h3>
                    <p className="mb-3"><span className="font-semibold">أولاً:</span> عند عدم التزام المتعاقد -أو متعاقديه من الباطن- بإعطاء الأفضلية للمنتجات الوطنية عند شراء ما يحتاجه من مواد أو أدوات، فسيتم إيقاع غرامة مالية مقدارها (30%) من قيمة المشتريات محل التقصير. </p>
                    <p className="mb-3"><span className="font-semibold" style={{ display: tasks?.finesNationalProductQuota || tasks?.finesLocalContentPercentage ? "block" : "none" }}>ثانياً:</span> {tasks?.finesNationalProductQuota || tasks?.finesLocalContentPercentage || ""}</p>
                    <p className="mb-3"><span className="font-semibold" style={{ display: tasks?.finesNationalProductQuota && tasks?.finesLocalContentPercentage ? "block" : "none" }}>ثالثاً:</span> {tasks?.finesLocalContentPercentage || ""}</p>
                </div>


                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-3">62	إجمالي الغرامات</h3>
                    <p className="mb-3">
                        دون الإخلال بحق الجهة الحكومية في أي تعويض عن أي أضرار أو خسائر، لا يتجاوز إجمالي غرامات التقصير أو التأخير وغرامات مخالفة أحكام لائحة تفضيل المحتوى المحلي التي يجوز أن تفرضها الجهة الحكومية بموجب العقد عن [20%] من القيمة الإجمالية للعقد.
                    </p>
                </div>

                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-3">63	التأمين</h3>
                    <ReadonlyList data={tasks.insuranceList || {}} />
                </div>
            </div>
        </div>
    )
}

export default TwentySecondPage