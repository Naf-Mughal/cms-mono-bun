import React from 'react'

const Footer: React.FC<{ number: number, revisionDate?: string, revision?: string, bookletNumber?: string }> = ({ number, revisionDate, revision, bookletNumber }) => {
    return (
        <footer>
            <div className="max-w-[1200px] mx-auto mt-8 pt-4 pb-4 text-sm text-right border-solid border-gray-300 border-t">
                <div className="flex flex-row justify-between" style={{ alignItems: 'flex-end' }}>
                    <div>
                        <p>رقم الصفحة</p>
                        <p>{number} من 35</p>
                    </div>
                    <div>تاريخ الإصدار: <span className="inline-block border-b border-gray-400 w-24">{revisionDate || ""}</span></div>
                    <div>رقم النسخة: {revision || "الثانية"}</div>
                    <div>رقم الكراسة: <span className="inline-block border-b border-gray-400 w-24">{bookletNumber || ""}</span></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
