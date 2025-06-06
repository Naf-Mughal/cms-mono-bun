'use client'

import FirstPage from '@ui/templates/IT/FirstPage'
import SecondPage from '@ui/templates/IT/SecondPage'
import ThirdPage from '@ui/templates/IT/ThirdPage'
import FourteenthPage from '@ui/templates/IT/FourteenthPage'
import FourthPage from '@ui/templates/IT/FourthPage'
import FifthPage from '@ui/templates/IT/FifthPage'
import SixthPage from '@ui/templates/IT/SixthPage'
import SeventhPage from '@ui/templates/IT/SeventhPage'
import EighthPage from '@ui/templates/IT/EighthPage'
import NinthPage from '@ui/templates/IT/NinthPage'
import TenthPage from '@ui/templates/IT/TenthPage'
import EleventhPage from '@ui/templates/IT/EleventhPage'
import TwelfthPage from '@ui/templates/IT/TwelfthPage'
import ThirteenthPage from '@ui/templates/IT/ThirteenthPage'
import FifteenthPage from '@ui/templates/IT/FifteenthPage'
import SixteenthPage from '@ui/templates/IT/SixteenthPage'
import SeventeenthPage from '@ui/templates/IT/SeventeenthPage'
import EighteenthPage from '@ui/templates/IT/EighteenthPage'
import NinteenthPage from '@ui/templates/IT/NinteenthPage'
import TwentiethPage from '@ui/templates/IT/TwentiethPage'
import TwentyFirstPage from '@ui/templates/IT/TwentyFirstPage'
import TwentySecondPage from '@ui/templates/IT/TwentySecondPage'
import TwentyThirdPage from '@ui/templates/IT/TwentyThirdPage'
import TwentyFourthPage from '@ui/templates/IT/TwentyFourthPage'
import TwentyFifthPage from '@ui/templates/IT/TwentyFifthPage'
import TwentySixthPage from '@ui/templates/IT/TwentySixthPage'
import TwentySeventhPage from '@ui/templates/IT/TwentySeventhPage'
import TwentyEighthPage from '@ui/templates/IT/TwentyEighthPage'
import TwentyNinthPage from '@ui/templates/IT/TwentyNinthPage'
import Header from '@ui/templates/IT/Header'
import Footer from '@ui/templates/IT/Footer'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const getPageComponent = (currentPageNumber: number, tasks: any): React.ReactNode => {
    switch (currentPageNumber) {
        case 1:
            return <FirstPage tasks={tasks} />
        case 2:
            return <SecondPage tasks={tasks} />
        case 3:
            return <ThirdPage tasks={tasks} />
        case 4:
            return <FourthPage tasks={tasks} />
        case 5:
            return <FifthPage tasks={tasks} />
        case 6:
            return <SixthPage tasks={tasks} />
        case 7:
            return <SeventhPage tasks={tasks} />
        case 8:
            return <EighthPage tasks={tasks} />
        case 9:
            return <NinthPage tasks={tasks} />
        case 10:
            return <TenthPage tasks={tasks} />
        case 11:
            return <EleventhPage tasks={tasks} />
        case 12:
            return <TwelfthPage tasks={tasks} />
        case 13:
            return <ThirteenthPage tasks={tasks} />
        case 14:
            return <FourteenthPage tasks={tasks} />
        case 15:
            return <FifteenthPage tasks={tasks} />
        case 16:
            return <SixteenthPage tasks={tasks} />
        case 17:
            return <SeventeenthPage tasks={tasks} />
        case 18:
            return <EighteenthPage tasks={tasks} />
        case 19:
            return <NinteenthPage tasks={tasks} />
        case 20:
            return <TwentiethPage tasks={tasks} />
        case 21:
            return <TwentyFirstPage tasks={tasks} />
        case 22:
            return <TwentySecondPage tasks={tasks} />
        case 23:
            return <TwentyThirdPage tasks={tasks} />
        case 24:
            return <TwentyFourthPage tasks={tasks} />
        case 25:
            return <TwentyFifthPage tasks={tasks} />
        case 26:
            return <TwentySixthPage tasks={tasks} />
        case 27:
            return <TwentySeventhPage tasks={tasks} />
        case 28:
            return <TwentyEighthPage tasks={tasks} />
        case 29:
            return <TwentyNinthPage tasks={tasks} />
        default:
            return <FirstPage tasks={tasks} />
    }
}

const IT = ({ tasks, currentPageNumber }: { tasks: any, currentPageNumber: number }) => {
    const filteredTasks: any = {}
    tasks?.filter((item: any) => item.pageNumber === currentPageNumber).forEach((item: any) => {
        if (item.inputType === 'radio') {
            filteredTasks[item.inputName] = item.data?.children?.find((child: any) => child.value === item.data.value)?.children?.value || item.data?.children?.find((child: any) => child.value === item.data.value)?.value
        }
        else if (item.inputType === 'table' || item.inputType === 'list' || item.inputType === 'rows-table') {
            filteredTasks[item.inputName] = item.data
        }
        else if (item.inputType === 'dynamic-table') {
            filteredTasks[item.inputName] = item.tableData
        }
        else {
            filteredTasks[item.inputName] = item.data.value
        }
    })
    return (
        <div className='h-full flex flex-col gap-2 my-4' style={{ direction: 'rtl' }}>
            {currentPageNumber === 0 ? null : (
                <>
                    <Header />
                    {getPageComponent(currentPageNumber, filteredTasks)}
                    <Footer number={currentPageNumber} />
                </>
            )}
        </div>
    )
}

export default IT
