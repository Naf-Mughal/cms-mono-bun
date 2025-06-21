import React from 'react'
import { ReadonlyList } from '../../components/readonly-list'
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'

const TwentyEighthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
    const { elementRefs } = useTaskHighlight(currentTask)
    const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)
    return (
        <div className="w-full ">
            <div className="py-6 mx-auto">
                <div className="pb-4">
                    <h3 className="font-black text-xl text-black">القسم الحادي عشر: الشروط الخاصة</h3>
                </div>
                <div ref={createRef('specialTerms')}>
                    <ReadonlyList data={tasks.specialTerms || {}} />
                </div>
            </div>
        </div>
    )
}

export default TwentyEighthPage