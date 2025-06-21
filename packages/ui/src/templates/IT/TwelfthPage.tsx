import React from 'react'
import { ReadonlyList } from '../../components/readonly-list'
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'

const TwelfthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
  const { elementRefs } = useTaskHighlight(currentTask)
  const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
  return (
    <div className="w-full text-black">
      <div className="py-6 space-y-4 ">

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">22. <span>التضامن</span></h3>
          {
            typeof tasks?.confirmationOfParticipationInTheCompetition.value === "string" ?
              (
                <p ref={createRef('confirmationOfParticipationInTheCompetition')}>{tasks?.confirmationOfParticipationInTheCompetition.value}</p>
              ) : (
                <div ref={createRef('confirmationOfParticipationInTheCompetition')}>
                  <ReadonlyList data={tasks?.confirmationOfParticipationInTheCompetition} />
                </div>
              )
          }
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">23. التعاقد من الباطن</h3>
          <p>مع مراعاة ما ورد في المادة (الحادية والسبعين) من النظام، يشترط في التعاقد من الباطن ما يلي:</p>

          <ul className="pr-6 space-y-1">
            <li>‌<span>أ.</span> ‌أن يقدم المتنافس مع عرضه قائمة بأسماء المتعاقدين من الباطن لاعتمادهم من قبل الجهة الحكومية.</li>
            <li>‌‌<span>ب. </span> يجب أن تشتمل العروض التي تتضمن متعاقدين من الباطن على الكميات الموكلة لهم وأسعارهم وفقاً لمتطلبات وشروط ومواصفات الكراسة والعقد المرفق.</li>
            <li>‌‌<span>ج. </span> ألّا يكون المتعاقد من الباطن من الأشخاص المشار إليهم في الفقرة (5) من هذه الكراسة، وأن يكون مرخصاً في الأعمال المتعاقد على تنفيذها من قبل المتعاقد الرئيس، أو أن يكون لديه مؤهلات كافية لتنفيذ الأعمال، ومصنفاً في المجال وبالدرجة المطلوبة إذا كانت الأعمال مما يشترط لها التصنيف، وأن يكون لديه المؤهلات والقدرات الكافية لتنفيذ تلك الأعمال.</li>
            <li>‌<span>د.</span> ألّا تزيد نسبة الأعمال والمشتريات المسندة إلى المتعاقد من الباطن على (30%) من قيمة العقد.</li>
            <li>‌<span>ه.</span> يلتزم المتعاقد - ومتعاقديه من الباطن - مع الجهة الحكومية بإعطاء الأفضلية للمنتجات الوطنية -غير المدرجة ضمن القائمة الإلزامية- عند شراء ما يحتاجه من مواد أو أدوات وذلك بمنح المنتج الوطني تفضيلاً سعرياً بافتراض سعر المنتج الأجنبي أعلى بنسبة (10%) مما هو مذكور في وثائق العرض، كما يلتزم المتعاقد بتطبيق الأفضلية في المنتجات الخاضعة للتفضيل السعري الإضافي؛ إن وجدت.</li>
            <li>‌<span>و.</span> يكون المتعاقد الرئيس مسؤولاً أمام الجهة الحكومية عن الأعمال المتعاقد على تنفيذها بعقود الباطن وفقاً للشروط والمواصفات.</li>
            <li>‌<span>ز. </span> لا يجوز للمتعاقد من الباطن القيام بالتعاقد مع أي متعاقد آخر من الباطن لتنفيذ الأعمال المتعاقد معه على تنفيذها.</li>
            <li>‌<span>ح. </span> يجب أن يقدم المتعاقد الرئيس إقراراً منه يسمح للجهة الحكومية أن تتولى صرف حقوق متعاقدي الباطن من مستحقات المتعاقد الرئيسي، في حال عدم قيامه أو تأخره بصرف حقوقهم عن الأجزاء التي قاموا بتنفيذها.</li>
            <li>‌<span>ط. </span> يجوز أن يتم التعاقد من الباطن لتنفيذ أعمال ومشتريات تزيد عن (30%) من قيمة العقد وتقل عن (50%) من قيمة العقد بشرط الحصول على موافقة مسبقة من هيئة كفاءة الإنفاق والمشروعات الحكومية والجهة الحكومية وأن يتم إسناد تلك الأعمال والمشتريات إلى أكثر من متعاقد من الباطن يتم تأهيلهم لهذا الغرض.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default TwelfthPage
