import React from 'react'

const EighthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 space-y-4 ">
        <div className="border-b border-gray-300 pb-4">
          <p className="font-semibold text-black">8. مكان التسليم</p>
          <p className="text-black">يتم تسليم العروض وجميع ما يتعلق بالمنافسة لممثل الجهة الحكومية في العنوان المذكور أدناه في حال تعذر تسليم العروض من خلال البوابة الإلكترونية أو الوسيلة البديلة.</p>
          <table className="w-full border mt-4 text-sm text-black">
            <thead className="bg-gray-600 font-semibold">
              <tr>
                <th className="border border-gray-300 p-2 text-white text-right">مكان تسليم العروض</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">العنوان</td><td className="border p-2">{tasks?.address || "تحدده الجهة الحكومية."}</td></tr>
              <tr><td className="border p-2">المبنى</td><td className="border p-2">{tasks?.building || "تحدده الجهة الحكومية."}</td></tr>
              <tr><td className="border p-2">الطابق</td><td className="border p-2">{tasks?.floor || "تحدده الجهة الحكومية."}</td></tr>
              <tr><td className="border p-2">الغرفة/اسم الإدارة</td><td className="border p-2">{tasks?.roomNameOfDepartment || "تحدده الجهة الحكومية."}</td></tr>
              <tr><td className="border p-2">وقت التسليم</td><td className="border p-2">{tasks?.deliveryTime || "تحدده الجهة الحكومية."}</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="font-semibold mt-6 text-black">9. نظام المنافسة</p>
          <p className="text-black">
            تخضع هذه المنافسة لنظام المنافسات والمشتريات الحكومية الصادر بموجب المرسوم الملكي رقم (م/128) وتاريخ 13/11/1440هـ، ولائحته التنفيذية الصادرة بقرار وزير المالية رقم (1242) وتاريخ 21/3/1441هـ المعدلة بالقرار الوزاري رقم (3479) وتاريخ 11/08/1441هـ والقرار الوزاري رقم (451) وتاريخ 7/4/1444ه،
            ولائحة تفضيل المحتوى المحلي والمنشآت الصغيرة والمتوسطة المحلية والشركات المدرجة في السوق المالية في الأعمال والمشتريات الصادرة بقرار مجلس الوزراء رقم (245) وتاريخ 29/03/1441هـ،
            ولائحة تنظيم تعارض المصالح في تطبيق نظام المنافسات والمشتريات الحكومية ولائحته التنفيذية،
            ولائحة سلوكيات وأخلاقيات القائمين على تطبيق النظام الصادرتين بقرار مجلس الوزراء رقم (537) وتاريخ 21/08/1441هـ..
            وكل تعديل أو نظام أو لائحة تحل محل ما أشير إليه.
          </p>
        </div>
      </div>
    </div >
  )
}

export default EighthPage
