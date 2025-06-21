import React from 'react'
import ReadonlyRowsTable from '../../components/readonly-rows-table';
import { ReadonlyList } from '../../components/readonly-list';
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'

const TwentyFifthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
    const { elementRefs } = useTaskHighlight(currentTask)
    const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
    return (
        <div className="w-full ">
            <div className="py-6 max-w-[1200px] mx-auto">
                <div>
                    <h3 className="font-semibold mb-2 text-black">73 طريقة تنفيذ الأعمال والخدمات</h3>
                    <p className="mb-3 text-black">ومن الأمثلة على ذلك:</p>
                    <div ref={createRef('howToPerformBusinessAndServices')}>
                        <ReadonlyRowsTable data={tasks?.howToPerformBusinessAndServices} />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 text-black">74 مواصفات الجودة</h3>
                    <p className="mb-3 ">في هذه الفقرة تقوم الجهة الحكومية بتوضيح جميع شروط ومواصفات الجودة المطلوبة من المتعاقد من شهادات ومعايير محددة مثل ISO وغيرها.</p>
                    <p className="mb-3 text-black">يلتزم المتعاقد بمواصفات الجودة المطلوبة في تنفيذ النطاق المطلوب. ويجب على المتعاقد إخطار الجهة الحكومية بما يتسبب او قد يتسبب في عدم الامتثال لمتطلبات الجودة في السلع الموّردة والأعمال المقدمة وبأي تغييرات أو تعديلات قد تؤثر على هذه الجودة كتغيير موقع تصنيع المواد، أو تغيير المواد الخام ونسبها المستعملة في تصنيع السلع الموّردة.</p>
                    <div ref={createRef('qualitySpecifications')}>
                        <ReadonlyList data={tasks?.qualitySpecifications || {}} />
                    </div>
                    <p className="mb-3">يجب أن تغطي خطة ضمان أو ضبط الجودة الخاصة بالمتعاقد جميع الأنشطة ذات الصلة بنطاق العمل، وتوضح كيفية توافق الأعمال التي سيقوم بها المتعاقد مع متطلبات نطاق العمل وشروط الجودة المعمول بها. يجب كذلك أن تحدد الخطة نظام الجودة الموثق الذي سيتم تطبيقه من قبل المتعاقد في تنفيذ الأعمال، وبما يتوافق مع متطلبات المواصفة القياسية أيزو (ISO) 90001 مع الإشارة إلى جميع إجراءات وكتيبات المتعاقد ذات الصلة. </p>
                </div>
            </div>
        </div>
    )
}

export default TwentyFifthPage