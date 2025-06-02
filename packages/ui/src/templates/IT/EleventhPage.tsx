import React from 'react'

const EleventhPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold text-lg text-gray-900">20. إلغاء المنافسة وأثره</h3>

          <p className="mb-2"><span className="font-semibold underline">أولاً:</span> الحالات التي يجوز فيها إلغاء المنافسة:</p>
          <ul className="pr-6 space-y-1 mb-6">
            <li>‌<span>أ.</span> وجود أخطاء جوهرية في وثائق المنافسة.</li>
            <li>‌<span>ب.</span> مخالفة إجراءات المنافسة لأحكام النظام واللائحة التنفيذية.</li>
            <li>‌<span>ج.</span> إذا اقتضت المصلحة العامة إلغاء المنافسة.</li>
            <li>‌<span>د.</span> ارتكاب أي من المخالفات الواردة في المادة (51) الفقرة (3) من النظام.</li>
            <li>‌<span>ه.</span> عدم التمكن من تخفيض أسعار العروض التي تتخطى أسعار السوق أو تتجاوز المبالغ المعتمدة.</li>
            <li>‌<span>و.</span> ارتفاع أسعار العروض عن المبالغ المعتمدة.</li>
          </ul>

          <p className="mb-2"><span className="font-semibold underline">ثانياً:</span> الحالات التي تعاد فيها تكاليف وثائق المنافسة:</p>
          <ul className="pr-6 space-y-1 mb-6">
            <li>‌‌<span>أ.</span> وجود أخطاء جوهرية في وثائق المنافسة.</li>
            <li>‌<span>ب.</span> مخالفة إجراءات المنافسة لأحكام النظام أو اللائحة التنفيذية.</li>
            <li>‌<span>ج.</span> إذا اقتضت المصلحة العامة إلغاء المنافسة.</li>
            <li>‌<span>د.</span> ارتكاب مخالفات (لمن لا علاقة له بها) وفق الفقرة (3) من المادة (51).</li>
            <li>‌<span>ه.</span> ارتفاع أسعار العروض عن المبالغ المعتمدة.</li>
          </ul>

          <p className="mb-6"><span className="font-semibold underline">ثالثًا:</span> لا تعاد التكاليف إذا تم الإلغاء بعد فتح المظاريف إلا لمن تقدم بعرض فعلي.</p>

          <p className="mb-2"><span className="font-semibold underline">رابعًا:</span> إذا تم تمديد تلقي العروض للمرة الثانية، وأبدى المشتري عدم رغبته في الاستمرار، تعاد له تكاليف الوثائق.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900">21. التفاوض مع أصحاب العروض</h3>
          <p className="mb-6"><span className="font-semibold underline">أولاً:</span>
            يحق للجهة التفاوض في حال ارتفع سعر أفضل عرض عن الأسعار السائدة في السوق بشكل ظاهر، وذلك على النحو
            التالي:
          </p>
          <ul className="pr-6 space-y-1">
            <li>‌<span>أ.</span> تحدد لجنة فحص العروض مبلغ التخفيض بما يتفق مع الأسعار السائدة في السوق.</li>
            <li>‌‌<span>ب. </span> وتطلب كتابياً من صاحب أفضل عرض تخفيض سعره، فإن امتنع أو لم يصل إلى المبلغ المحدد، تتفاوض اللجنة مع صاحب العرض التالي وهكذا مع بقية العروض حتى يتم التوصل إلى السعر المحدد. فإن لم يتم التوصل، تُلغى المنافسة.</li>
          </ul>

          <p className="mb-2"><span className="font-semibold underline">ثانيًا:</span> يحق للجهة التفاوض إذا زادت قيمة أفضل عرض عن المبالغ المعتمدة للمشروع، عبر مرحلتين:</p>

          <ul className="pr-6 space-y-1">
            <li>‌<span>أ. </span> تطلب اللجنة كتابيًا من صاحب العرض تخفيضه ليتوافق مع المبالغ المعتمدة، وإن لم يستجب أو لم يصل للسعر المطلوب، تتفاوض اللجنة مع التالي وهكذا حتى الوصول لسعر مناسب.</li>
            <li>‌<span>ب. </span> في حال لم يتم التوصل، يمكن -بعد موافقة الجهة المختصة- إلغاء بعض البنود أو تخفيضها بما لا يؤثر على المشروع أو ترتيب العروض، وإن تعذر ذلك، تُلغى المنافسة.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EleventhPage
