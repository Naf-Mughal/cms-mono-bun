import React from 'react'

const ThirteenthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">

        <div className="border-b border-gray-300 pb-4 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">24. التأهيل اللاحق</h3>
          <ul className="list-decimal pr-6 space-y-1">
            <li><span className="font-semibold">أولاً:</span> تقوم الجهة الحكومية بإجراء تأهيل لاحق للمتنافس الفائز في الحالات التي لم يتم إجراء تأهيل مسبق لها.</li>
            <li><span className="font-semibold">ثانياً:</span> مع مراعاة ما ورد في الفقرة (1/أ) من المادة (التاسعة عشرة) من اللائحة التنفيذية، يجب على الجهة الحكومية إجراء تأهيل لاحق لصاحب العرض الفائز في المنافسة الذي سبق تأهيله لها تأهيلاً مسبقاً، متى كانت المدة بين إجراء التأهيل المسبق والترسية تزيد على (سنة)؛ وذلك للتأكد من استمرار مؤهلاته.</li>
            <li><span className="font-semibold">ثالثاً:</span> عند عدم اجتياز المتنافس الفائز لمرحلة التأهيل اللاحق فيتم الانتقال للمتنافس الذي يليه في الترتيب وهكذا، وتلغى المنافسة إذا لم يجتزه جميع المتنافسين.</li>
            <li><span className="font-semibold">رابعاً:</span> يجب على الجهة الحكومية في حال إجرائها تأهيل لاحق للمتنافس الفائز أن تستخدم ذات المعايير التي تم استخدامها في مرحلة التأهيل المسبق.</li>
            <li><span className="font-semibold">خامساً:</span> في حال قامت الجهة الحكومية بتأهيل سابق لمتنافس فيجوز لها عدم القيام بتأهيل ذلك المتنافس في الأعمال والمشتريات المشابهة شريطة ألا يكون قد مضى أكثر من عام على التأهيل السابق.</li>
            <li><span className="font-semibold">سادساً:</span> معايير التأهيل مرفقة في ملحق رقم {tasks?.postQualification || ""}</li>
          </ul>
        </div>

        <div className="border-b border-gray-300 pb-4 mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-2">25. إلزامية العرض</h3>
          <p>لا يجوز تفسير طلب تقديم العروض والاشتراك في هذه المنافسة وتقديم العروض بأي شكل من الأشكال على أنه التزام تعاقدي أو قانوني من طرف الجهة الحكومية طالبة العروض.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">26. الموافقة على الشروط</h3>
          <p>يعتبر المتنافس موافقاً على كافة شروط ومواصفات وأحكام المنافسة من خلال مشاركته في عملية تقديم العروض، ويستبعد العرض المخالف لذلك إلا في الحالات التي تكون المخالفة شكلية وغير مؤثرة.</p>
        </div>


      </div>
    </div>

  )
}

export default ThirteenthPage
