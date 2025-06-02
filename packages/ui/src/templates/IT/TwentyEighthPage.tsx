import React from 'react'

const TwentyEighthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full ">
            <div className="py-6 mx-auto">
                <div className="pb-4">
                    <h3 className="font-black text-xl text-black">القسم الحادي عشر: الشروط الخاصة</h3>
                </div>
                <div>
                    <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
                        {tasks.specialTerms?.map((item: any, index: number) => {
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

export default TwentyEighthPage