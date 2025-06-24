const Header = () => {
    return (
        <header>
            <div
                className="flex items-center justify-between max-w-[1200px] mx-auto py-6 px-0 bg-white border-solid border-gray-300 border-b">
                <div className="text-right space-y-1">
                    <h1 className="text-lg font-bold text-gray-800">
                        المملكة العربية السعودية
                    </h1>
                    <h2 className="text-base font-medium text-gray-700">
                        اسم الجهة الحكومية
                    </h2>
                    <h3 className="text-base font-medium text-gray-700">اسم الإدارة</h3>
                    <h4 className="text-base font-medium text-gray-700">اسم النموذج</h4>
                </div>
                <div className="w-auto h-24 p-3 bg-gray-500 flex items-center justify-center rounded-[1vw]">
                    <span className="text-white">شعار الجهة</span>
                </div>
            </div>
        </header>
    )
}

export default Header