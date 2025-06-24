import React from 'react'

const SecondPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full">
            <div className="max-w-[1200px] mx-auto text-[15px] leading-loose text-black">
                <h2 className="text-xl font-bold mb-6">الفهرس</h2>
                <div className="flex justify-between items-center"><span className="font-bold">دليل الاستخدام</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span className="font-bold">6</span></div>
                <div className="flex justify-between items-center"><span className="font-bold">القسم الأول: مقدمة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span className="font-bold">7</span></div>
                <div className="flex justify-between items-center"><span>1 تعريفات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>7</span></div>
                <div className="flex justify-between items-center"><span>2 تعريف عن المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>7</span></div>
                <div className="flex justify-between items-center"><span>3 تكاليف وثائق المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>7</span></div>
                <div className="flex justify-between items-center"><span>4 المواعيد المتعلقة بالمنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>8</span></div>
                <div className="flex justify-between items-center"><span>5 أهلية مقدمي العروض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>8</span></div>
                <div className="flex justify-between items-center"><span>6 السجلات والتراخيص النظامية</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>9</span></div>
                <div className="flex justify-between items-center"><span>7 ممثل الجهة الحكومية</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>9</span></div>
                <div className="flex justify-between items-center"><span>8 مكان التسليم</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>10</span></div>
                <div className="flex justify-between items-center"><span>9 نظام المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>10</span></div>
                <div className="flex justify-between items-center"><span className="font-bold">القسم الثاني: الأحكام العامة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span className="font-bold">11</span></div>
                <div className="flex justify-between items-center"><span>10 المساواة والشفافية</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>11</span></div>
                <div className="flex justify-between items-center"><span>11 تعارض المصالح</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>11</span></div>
                <div className="flex justify-between items-center"><span>12 السلوكيات والأخلاقيات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>11</span></div>
                <div className="flex justify-between items-center"><span>13 السرية وإفشاء المعلومات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>11</span></div>
                <div className="flex justify-between items-center"><span>14 ملكية وثائق المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>11</span></div>
                <div className="flex justify-between items-center"><span>15 حقوق الملكية الفكرية</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>16 المحتوى المحلي</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>17 أنظمة وأحكام الاستيراد</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>18 تجزئة المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>19 الاستبعاد من المنافسة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>20 إلغاء المنافسة وأثره</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>12</span></div>
                <div className="flex justify-between items-center"><span>21 التفاوض مع أصحاب العروض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>13</span></div>
                <div className="flex justify-between items-center"><span>22 التضامن</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>13</span></div>
                <div className="flex justify-between items-center"><span>23 التعاقد من الباطن</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>14</span></div>
                <div className="flex justify-between items-center"><span>24 التأهيل اللاحق</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>15</span></div>
                <div className="flex justify-between items-center"><span>25 إلزامية العرض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>15</span></div>
                <div className="flex justify-between items-center"><span>26 الموافقة على الشروط</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>15</span></div>
                <div className="flex justify-between items-center"><span className="font-bold">القسم الثالث: إعداد العروض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span className="font-bold">16</span></div>
                <div className="flex justify-between items-center"><span>27 لغة العرض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>28 العملة المعتمدة</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>29 صلاحية العروض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>30 تكلفة إعداد العروض</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>31 الإخطارات والمراسلات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>32 ضمان المعلومات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>33 الأسئلة والاستفسارات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>16</span></div>
                <div className="flex justify-between items-center"><span>34 حصول المتنافسين على كافة المعلومات الضرورية وزيارة موقع الأعمال</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>17</span></div>
                <div className="flex justify-between items-center"><span>35 وثائق العرض الفني</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>17</span></div>
                <div className="flex justify-between items-center"><span>36 وثائق العرض المالي</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>17</span></div>
                <div className="flex justify-between items-center"><span>37 كتابة الأسعار</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>17</span></div>
                <div className="flex justify-between items-center"><span>38 جدول الدفعات</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>18</span></div>
                <div className="flex justify-between items-center"><span>39 الضرائب والرسوم</span><span className="flex-1 border-b border-dotted border-gray-900 mx-2"></span><span>18</span></div>
            </div>
        </div>
    )
}

export default SecondPage
