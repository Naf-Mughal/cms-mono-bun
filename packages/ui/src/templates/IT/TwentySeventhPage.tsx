import React from 'react'

const TwentySeventhPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full">
            <div className="py-6 mx-auto space-y-4">
                <div className="">
                    <h3 className="text-black">القسم العاشر: متطلبات برنامج المشاركة الاقتصادية (التوازن الاقتصادي)</h3>
                </div>
                <div>
                    <p className="mb-3">
                        يجب على المتنافس الالتزام بما ورد في سياسة المشاركة الاقتصادية الصادرة من هيئة المحتوى المحلي والمشتريات الحكومية، وتسليم متطلبات المشاركة الاقتصادية في ملف مستقل ليتم دراسته من قبل هيئة المحتوى المحلي والمشتريات الحكومية والذي يجب أن يحتوي على الآتي:
                    </p>
                    <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
                        {tasks.economicParticipationProgramRequirements?.map((item: any, index: number) => {
                            const arabicNumber = (index + 1).toLocaleString('ar-EG'); // or 'ar-SA'
                            return (
                                <li key={index}>
                                    <span className="ml-2">{arabicNumber}.</span> {item}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default TwentySeventhPage