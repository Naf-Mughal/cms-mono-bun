import React from 'react'
import { ReadonlyList } from '../../components/readonly-list'

const SeventhPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full text-black">
            <div className="py-6 space-y-4 ">
                <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-xl font-semibold pt-4 text-black">5. أهلية مقدمي العروض</h3>
                    <p className="font-semibold text-black">أولًا: لا يجوز المشاركة في المنافسة للأشخاص المشار إليهم فيما يلي:</p>
                    <ol className="list-decimal pr-5 space-y-2 mt-2 text-black">
                        <li>موظفو الدولة ويستثنى من ذلك ما يلي:
                            <ul className="space-y-1 pr-6 mt-2">
                                <li><span>أ-</span> الأعمال غير التجارية إذا رخص لهم بمزاولتها.</li>
                                <li><span>ب-</span> شراء مصنفاتهم أو أي من حقوق الملكية الفكرية، سواء منهم مباشرة أو من خلال دور النشر أو غيرها.</li>
                                <li><span>ج-</span> تكليفهم بأعمال فنية.</li>
                                <li><span>د-</span> الدخول في المزايدات العلنية، إذا كانت الأشياء المرغوب في شرائها لاستعمالهم الخاص.</li>
                            </ul>
                        </li>
                        <li>من تقضي الأنظمة بمنع التعامل معهم بما في ذلك من صدر بمنع التعامل معهم حكم قضائي أو قرار من جهة مخولة بذلك نظاماً، وذلك حتى تنتهي مدة المنع.</li>
                        <li>المفلسون، أو من ثبت إعسارهم، أو صدر أمر بوضعهم تحت الحراسة القضائية.</li>
                        <li>الشركات التي جرى حلها أو تصفيتها.</li>
                        <li>من لم يبلغ من العمر (ثمانية عشر) عاماً.</li>
                        <li>ناقصو الأهلية.</li>
                    </ol>
                </div>
                <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-xl font-semibold pt-4 text-black">6. السجلات والتراخيص النظامية</h3>
                    <ReadonlyList data={tasks?.regulatoryRecordsAndLicenses || {}} />
                </div>
                <div>
                    <p className="font-bold text-black">7. ممثل الجهة الحكومية</p>
                    <p className="text-black">يتم التواصل مع ممثل الجهة الحكومية المذكور أدناه في حال تعذر استخدام البوابة الإلكترونية أو الوسيلة البديلة.</p>
                    <table className="w-full text-right border border-gray-300 text-sm my-4 text-black">
                        <thead className="bg-gray-600 font-semibold">
                            <tr>
                                <th className="border border-gray-300 p-2 text-white">معلومات اتصال ممثل الجهة الحكومية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="border p-2">الاسم</td><td className="border p-2 text-red-600">{tasks?.governmentRepresentativeName || "تحدده الجهة الحكومية."}</td></tr>
                            <tr><td className="border p-2">الوظيفة</td><td className="border p-2 text-red-600">{tasks?.governmentRepresentativeJob || "تحدده الجهة الحكومية."}</td></tr>
                            <tr><td className="border p-2">الهاتف</td><td className="border p-2 text-red-600">{tasks?.governmentRepresentativePhone || "تحدده الجهة الحكومية."}</td></tr>
                            <tr><td className="border p-2">الفاكس</td><td className="border p-2 text-red-600">{tasks?.governmentRepresentativeFax || "تحدده الجهة الحكومية."}</td></tr>
                            <tr><td className="border p-2">البريد الإلكتروني</td><td className="border p-2 text-red-600">{tasks?.governmentRepresentativeEmailAddress || "تحدده الجهة الحكومية."}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SeventhPage
