import React from 'react'

const SixthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 space-y-4 ">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold text-black">1. تعريفات</h3>
          <table className="w-full text-right border border-gray-300 text-sm text-black">
            <thead className="bg-gray-600 font-semibold">
              <tr>
                <th className="border border-gray-300 p-2 text-white">المصطلح</th>
                <th className="border border-gray-300 p-2 text-white">التعريف</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">الجهة الحكومية</td>
                <td className={`border border-gray-300 p-2 ${tasks?.nameOfGovtEntity ? '' : 'text-red-600'}'}`}>
                  {tasks?.nameOfGovtEntity || "تحدده الجهة الحكومية."}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">المتنافس</td>
                <td className="border border-gray-300 p-2">مقدم العرض أو المشارك في المنافسة الراغب في تقديم العرض.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">المنافسة</td>
                <td className="border border-gray-300 p-2">تشمل جميع إجراءات ووثائق طلب تقديم العروض من قبل الجهة الحكومية ومقدمي العروض حتى الترسية.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">النظام</td>
                <td className="border border-gray-300 p-2">نظام المنافسات والمشتريات الحكومية الصادر بالمرسوم الملكي رقم (م/128) وتاريخ 13/11/1440هـ.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">اللائحة التنفيذية</td>
                <td className="border border-gray-300 p-2">اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية الصادرة بقرار وزير المالية رقم (1242) وتاريخ 21/3/1441هـ المعدّلة بقرار وزير المالية رقم (3479) وتاريخ 11/8/1441هـ، ورقم (451) وتاريخ 7/4/1444هـ.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">المفردات والجمع</td>
                <td className="border border-gray-300 p-2">تدل الكلمات الواردة بصيغة المفرد على ذات المدلول بصيغة الجمع ويكون العكس صحيحاً أيضاً إذا تطلب سياق النص ذلك.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold text-black">2. تعريف عن المنافسة</h3>
          <p>
            يكون طرح إجراءات هذه المنافسة بما في ذلك استلام العروض عن طريق وسيلة بديلة عن البوابة الإلكترونية؛ وهي <span className={`${tasks?.toReceiveBiddingOffers ? '' : 'text-red-600'}`}>(الموقع الإلكتروني للجهة الحكومية: https://{tasks?.toReceiveBiddingOffers || "_____"}.gov.sa/)</span> ويشار إليها في هذه الكراسة بـ"الوسيلة البديلة".
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold text-black">3. تكاليف وثائق المنافسة</h3>
          <table className="w-full text-right border border-gray-300 text-sm mt-2">
            <thead className="bg-gray-600 font-semibold">
              <tr>
                <th className="border border-gray-300 p-2 text-white">تكاليف وثائق المنافسة</th>
                <th className="border border-gray-300 p-2"></th>
                <th className="border border-gray-300 p-2 text-white">آلية الدفع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`border border-gray-300 p-2 ${tasks?.valueInNumber ? '' : 'text-red-600'}`}>{tasks?.valueInNumber || "القيمة بالأرقام (...  ريال سعودي)"} </td>
                <td className={`border border-gray-300 p-2 ${tasks?.valueInWords ? '' : 'text-red-600'}`}>{tasks?.valueInWords || "القيمة بالتفقيط"}</td>
                <td className={`border border-gray-300 p-2 ${tasks?.paymentMethod ? '' : 'text-red-600'}`}>شيك مصدق / حوالة بنكية / نظام سداد</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-black">4. المواعيد المتعلقة بالمنافسة</h3>
          <p className="text-green-700">
            اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية. وإن استمر العطل التقني لمدة تزيد على ثلاثة أيام متصلة تعين تنفيذه بشكل ورقي، على أن ترفع الجهة الحكومية ما تم عمله من إجراءات إلى البوابة فور زوال العطل.
          </p>
          <table className="w-full text-right border border-gray-300 text-sm mt-4 text-red-600">
            <thead className="bg-gray-600 font-semibold">
              <tr>
                <th className="border border-gray-300 p-2 text-white">المرحلة</th>
                <th className="border border-gray-300 p-2 text-white">تاريخ الاستحقاق</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">خطاب تأكيد المشاركة</td><td className="border p-2">{tasks?.letterOfConfirmationOfParticipation || "تحدده الجهة الحكومية"}</td></tr>
              <tr><td className="border p-2">إرسال الأسئلة والاستفسارات</td><td className="border p-2">{tasks?.sendQuestionsAndInquiries || "تحدده الجهة الحكومية"}</td></tr>
              <tr><td className="border p-2">تقديم العروض</td><td className="border p-2">{tasks?.submitOffers || "تحدده الجهة الحكومية"}</td></tr>
              <tr><td className="border p-2">فتح العروض</td><td className="border p-2">{tasks?.openOffers || "تحدده الجهة الحكومية"}</td></tr>
              <tr><td className="border p-2">الترسية</td><td className="border p-2">{tasks?.theAwardDay || "تحدده الجهة الحكومية"}</td></tr>
              <tr><td className="border p-2">بدء الأعمال</td><td className="border p-2">{tasks?.startWork || "تحدده الجهة الحكومية"}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SixthPage
