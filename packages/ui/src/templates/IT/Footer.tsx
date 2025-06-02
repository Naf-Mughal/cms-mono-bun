import React from 'react'

const Footer: React.FC<{ number: number }> = ({ number }) => {
    return (
        <footer>
            <div className="max-w-[1200px] mx-auto mt-8 pt-4 pb-4 text-sm text-right border-solid border-gray-300 border-t">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-2 md:mb-0">
                        <p>رقم الصفحة</p>
                        <p>{number} من 35</p>
                    </div>
                    <div>تاريخ الإصدار: <span className="inline-block border-b border-gray-400 w-24"></span></div>
                    <div>رقم النسخة: الثانية</div>
                    <div>رقم الكراسة: <span className="inline-block border-b border-gray-400 w-24"></span></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
