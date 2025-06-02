import React from 'react'

const FifteenthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">35. وثائق العرض الفني</h3>
          <p className="mb-2">يشمل العرض الفني المتطلبات التالية:</p>
          <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
            {tasks.technicalOfferDocuments?.map((item: any, index: number) => {
              const arabicNumber = (index + 1).toLocaleString('ar-EG'); // or 'ar-SA'
              return (
                <li key={index}>
                  <span className="ml-2">{arabicNumber}.</span> {item}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">36. وثائق العرض المالي</h3>
          <p className="mb-2">يشمل العرض المالي المتطلبات التالية:</p>
          <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
            {tasks.finacialOfferDocuments?.map((item: any, index: number) => {
              const arabicNumber = (index + 1).toLocaleString('ar-EG'); // or 'ar-SA'
              return (
                <li key={index}>
                  <span className="ml-2">{arabicNumber}.</span> {item}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">37. كتابة الأسعار</h3>
          <ul className="pr-5 space-y-2">
            <li><span>أ.</span> يجب على المتنافس تقديم سعره وفقاً للشروط والمواصفات وجداول الكميات المعتمدة، وألا يقوم بإجراء أي تعديل أو إبداء أي تحفظ عليها، كما يجب ألا يقوم بشطب أي بند من بنود المنافسة أو مواصفاتها، وسيتم استبعاد العرض المخالف لذلك.</li>
            <li><span>ب.</span>  تدوين أسعار العرض الإفرادية والإجمالية في جداول الكميات رقماً وكتابة بالعملة المحلية، ما لم ينص على تقديمها بعملة أخرى.</li>
            <li><span>ج.</span>  لا يجوز لمقدم العرض التعديل أو المحو أو الطمس على قائمة الأسعار، ويجب إعادة تدوين أي تصحيح يجريه صاحب العرض عليها رقماً وكتابة والتوقيع عليه.</li>
            <li><span>د.</span>  يجوز استبعاد العرض إذا بلغت فئات الأسعار التي جرى عليها التعديل أو المحو أو الطمس أكثر من (10%) من قائمة الأسعار، أو من القيمة الإجمالية للعرض.</li>
            <li><span>ه.</span>  {tasks?.writingPrices || ""}</li>
          </ul>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">38. جدول الدفعات</h3>
          <p>يقدم المتنافس جدولاً للدفعات يحدد فيه قيمة الدفعات المطلوبة ونسبتها من قيمة العرض ومرحلة استحقاقها. ويجوز للجهة الحكومية مراجعة جدول الدفعات وتعديله أو طلب تعديله وفق ما تراه مناسباً.</p>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">39. الضرائب والرسوم</h3>
          <p>يجب أن تشمل جميع الأسعار المقدمة من قبل المتنافس كافة التكاليف من ضرائب ورسوم وغيرها من المصاريف، ولا تتحمل الجهة الحكومية أي مصاريف إضافية لم يتم ذكرها في عرض الأسعار.</p>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold mb-2">40. الأحكام العامة للضمانات</h3>
          <ul className="pr-5 space-y-2">
            <li><span>أ.</span> يجوز أن يقدم الضمان من بنوك عدة، على أن يلتزم بموجبه كل بنك بأداء نسبة محددة من قيمة الضمان المقدم بما يتساوى في قيمته الإجمالية مع الضمان المطلوب كحدٍ أدنى.</li>
            <li><span>ب.</span> إذا قُدمَ الضمان من بنك أجنبي بوساطة أحد البنوك المحلية، يجب على البنك المحلي الالتزام بشروط وقواعد الضمانات البنكية المحددة في النظام واللائحة التنفيذية.</li>
            <li><span>ج.</span> يكون الضمان واجباً ومستحق الدفع عند أول طلب من جانب الجهة الحكومية، دون حاجة إلى حكم قضائي أو قرار من هيئة تحكيم.</li>
            <li><span>د.</span> يجب أن يكون الضمان غير مشروط، وغير قابل للإلغاء، وأن تكون قيمته خالية من أية حسومات تتعلق بالضرائب، أو الرسوم، أو النفقات الأخرى.</li>
            <li><span>ه.</span> يجوز استبدال الضمانات البنكية من بنك لآخر، على ألا يفرج عن الضمان إلا بعد الحصول على الضمان البديل.</li>
            <li><span>و.</span> يجوز للجهة الحكومية قبول الضمانات البنكية الصادرة من فروع البنوك الأجنبية المرخصة في المملكة.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default FifteenthPage
