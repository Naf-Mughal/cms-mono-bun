import React from 'react'

const TenthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
  return (
    <div className="w-full text-black">
      <div className="py-6 space-y-4 ">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold text-lg text-gray-900">16. المحتوى المحلي</h3>
          <p>
            يجب على المتنافسين الالتزام بلائحة تفضيل المحتوى المحلي والمنشآت الصغيرة والمتوسطة المحلية والشركات المدرجة في السوق المالية في الأعمال والمشتريات الصادرة بقرار مجلس الوزراء رقم (245) وتاريخ 29/03/1441هـ.
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold text-lg text-gray-900">17. أنظمة وأحكام الاستيراد</h3>
          <p>
            يقر المتنافس بعلمه بأنظمة وأحكام الاستيراد والجمارك في المملكة العربية السعودية التي يجرى تطبيقها
            على توريد وشحن أي منتجات أو أجزاء منها إلى المملكة منها إلى غيرها بما في ذلك الأحكام المتعلقة بحظر
            الاستيراد.
          </p>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="font-semibold text-lg text-gray-900">18. تجزئة المنافسة</h3>
          <p>
            {tasks?.competitionSegmentation || ""}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900">19. الاستبعاد من المنافسة</h3>
          <p>
            يحق للجهة استبعاد أي عرض اجتاز التقييم الفني بسبب تدني أسعاره بنسبة (25%) فأكثر عن التكلفة التقديرية
            والأسعار السائدة في السوق، وذلك بعد مراجعة لجنة فحص العروض للأسعار ومناقشة صاحب العرض المنخفض وعدم
            اقتناعها بمقدرته على تنفيذ العقد بعد الطلب منه تقديم تفاصيل لعناصر عرضه.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TenthPage
