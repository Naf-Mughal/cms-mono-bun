import React from 'react'
import { ReadonlyList } from '../../components/readonly-list';
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'

const TwentySixthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
    const { elementRefs } = useTaskHighlight(currentTask)
    const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
    console.log(tasks?.requirementsForLocalContentMechanisms?.children)
    return (
        <div className="w-full text-black">
            <div className="py-6 max-w-[1200px] mx-auto space-y-4 ">
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold text-black">القسم التاسع: متطلبات المحتوى المحلي</h3>
                </div>

                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2">76	القائمة الإلزامية</h3>
                    <p className="mb-3">في حال اشتمال نطاق العمل على منتجات ضمن القائمة الإلزامية؛ فتطبق الشروط التالية:</p>
                    <ul className="pr-5 space-y-2 mb-3">
                        <li><span>أ.</span> ‌يجب على المتنافس الالتزام بالقائمة الإلزامية وذلك عند توريد الأصناف والمواد أو المشتريات، أو تنفيذ الأعمال، أو عند إعداد الدراسات والتقارير والتصاميم.</li>
                        <li><span>ب.</span> ‌ستقوم الجهة الحكومية أو الاستشاري المشرف على المشروع – إن وجد - بمراقبة أداء المتعاقد في تنفيذ التزاماته بشأن القائمة الإلزامية أثناء تنفيذ العقد، ولن تستلم أي منتجات مدرجة في القائمة الإلزامية في حال كان بلد المنشأ غير وطني، ويستثنى من ذلك المنتجات التي حصل المتعاقد على استثناء لها بموجب الضوابط ذات العلاقة الصادرة عن هيئة المحتوى المحلي والمشتريات الحكومية.</li>
                        <li><span>ج.</span> ‌على المتنافس الالتزام بالتعليمات الخاصة بتسليم المنتجات المدرجة في القائمة الإلزامية الصادرة عن هيئة المحتوى المحلي والمشتريات الحكومية.</li>
                        <li><span>د.</span> ‌على المتنافس الالتزام بالضوابط الخاصة بالاستثناء من القائمة الإلزامية الصادرة عن هيئة المحتوى المحلي والمشتريات الحكومية.</li>
                        <li><span>ه.</span> ‌يستبعد في منافسات التوريد أو المنافسات المختلطة المشتملة على بنود توريد، العرض الذي لم يلتزم فيه المتنافس بالقائمة الإلزامية. وفي حال كانت المنافسة قابلة للتجزئة، فتستبعد البنود التي لم يلتزم فيها المتنافس بالقائمة الإلزامية.</li>
                        <li><span>و.</span> ‌في حال انطباق اشتراط شهادة المحتوى المحلي (خط الأساس) على المنتجات المدرجة في القائمة الإلزامية؛ فيلتزم المتنافس بأن تكون منتجات القائمة الالزامية المضمنة في عرضه من مزودي الخدمات والمصانع المستوفية لهذا الاشتراط.</li>
                    </ul>
                </div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h3 className="font-semibold mb-2">77	تفضيل المنتجات الوطنية</h3>
                    <p className="mb-3">في حال اشتمال المنافسة على منتجات وطنية غير مدرجة في القائمة الإلزامية فتطبق الشروط التالية:</p>
                    <div ref={createRef('preferenceForNationalProducts')}>
                        <ReadonlyList data={tasks.preferenceForNationalProducts || {}} />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">78	اشتراطات آليات المحتوى المحلي (نسبة المحتوى المحلي)</h3>
                    <p className="mb-3" ref={createRef('localContentWeightingAndThresholdCriteria')}>{tasks?.localContentWeightingAndThresholdCriteria || ""}</p>
                    {
                        tasks?.requirementsForLocalContentMechanisms?.children ?
                            (
                                <div ref={createRef('requirementsForLocalContentMechanisms')}>
                                    <p>{tasks?.requirementsForLocalContentMechanisms?.value || ""}</p>
                                    <ReadonlyList data={tasks?.requirementsForLocalContentMechanisms.children || {}} />
                                </div>
                            ) :
                            (
                                <p ref={createRef('requirementsForLocalContentMechanisms')}>{tasks?.requirementsForLocalContentMechanisms?.value || ""}</p>
                            )
                    }
                </div>

            </div>
        </div>
    )
}

export default TwentySixthPage