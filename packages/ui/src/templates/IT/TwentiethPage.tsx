import React from 'react'

const TwentiethPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full text-black">
            <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
                <div className="border-b border-gray-300 pb-4 mb-6">

                    <h3 className="font-semibold mb-2">54. الإعلان عن نتائج المنافسة</h3>
                    <p className="mb-3"><span className="font-semibold">أولاً:</span> تعلن الجهة الحكومية عن العرض الفائز في المنافسة في البوابة أو الوسيلة البديلة وتبلغ صاحبه بذلك، ويتضمن الإعلان المعلومات الآتية بحد أدنى:</p>
                    <ul className="pr-5 space-y-2 mb-3">
                        <li><span>أ.</span> ‌صاحب العرض الفائز.</li>
                        <li><span>ب.</span> ‌معلومات عن المنافسة.</li>
                        <li><span>ج.</span> القيمة الإجمالية للعرض الفائز.</li>
                        <li><span>د.</span> ‌ مدة تنفيذ العقد ومكانه.</li>
                    </ul>
                    <p className="mb-2"><span className="font-semibold">ثانياً:</span> يُبلغ المتنافسون الآخرون بنتائج المنافسة، وأسباب استبعادهم بما في ذلك الدرجات الفنية لعروضهم.</p>
                    <p className="mb-2"><span className="font-semibold">ثالثاً:</span> تنشر البوابة نتائج وبيانات المنافسات والمشتريات التي تزيد قيمتها على (مئة ألف) ريال، وذلك خلال (ثلاثين) يوماً من التعاقد بحد أقصى، على أن تنشر معلومات كل عقدٍ على حدة، وأن تشمل تلك المعلومات ما يلي:</p>
                    <ul className="pr-5 space-y-2 mb-3">
                        <li><span>أ.</span> اسم المتعاقد وعنوانه ونوع العقد.</li>
                        <li><span>ب.</span> مدة العقد وقيمته ومكان تنفيذ.</li>
                        <li><span>ج.</span> تاريخ تسليم الأعمال.</li>
                    </ul>

                </div>

                <div>
                    <h3 className="font-semibold mb-3">55	فترة التوقف</h3>
                    <p className="mb-3">
                        يجب على الجهة الحكومية الالتزام بفترة توقف بعد إخطار المتنافسين بنتائج المنافسة، وذلك وفقاً للضوابط الآتية:
                    </p>

                    <p className="mb-3"><span className="font-semibold">أولاً:</span> تلتزم الجهة الحكومية بفترة التوقف ({tasks?.downtime || "خمسة"}) أيام عمل من تاريخ إعلان نتائج المنافسة، وتلتزم الجهة الحكومية بالإعلان عنها في البوابة الإلكترونية أو الوسيلة البديلة.</p>
                    <p className="mb-3"><span className="font-semibold">ثانياً:</span> في حال تعذر الإعلان في البوابة أو موقع الجهة الحكومية أو الوسيلة البديلة لأسباب فنية، يبلغ المتنافسين بذلك عبر البريد الإلكتروني.</p>
                    <p className="mb-3"><span className="font-semibold">ثالثاً:</span> مع مراعاة ما ورد في المادة (السابعة والثمانين) من النظام، تستقبل الجهة الحكومية التظلمات على قرار الترسية أو أي إجراء من إجراءاتها من خلال البوابة أو الوسيلة البديلة.</p>
                    <p className="mb-3"><span className="font-semibold">رابعاً:</span> لا يجوز للجهة الحكومية أن تقبل أي تظلم بعد انتهاء فترة التوقف.</p>
                    <p className="mb-3"><span className="font-semibold">خامساً:</span> لا يعد قرار الترسية نافذاً حتى تنتهي فترة التوقف، ويتم البت في التظلمات إن وجدت.</p>
                </div>
            </div>
        </div >
    )
}

export default TwentiethPage