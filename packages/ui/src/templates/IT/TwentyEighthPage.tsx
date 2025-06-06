import React from 'react'
import { ReadonlyList } from '../../components/readonly-list'

const TwentyEighthPage: React.FC<any> = ({ tasks }: { tasks: any }) => {
    return (
        <div className="w-full ">
            <div className="py-6 mx-auto">
                <div className="pb-4">
                    <h3 className="font-black text-xl text-black">القسم الحادي عشر: الشروط الخاصة</h3>
                </div>
                <div>
                    <ReadonlyList data={tasks.specialTerms || {}} />
                </div>
            </div>
        </div>
    )
}

export default TwentyEighthPage