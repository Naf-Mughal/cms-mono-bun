export const dynamic = 'force-dynamic';
import BookletTable, { type TableData } from '@/components/home/booklet-table'
import React from 'react'
import { tryCatch } from "@utils/try-catch"
import { axiosAuthClient } from '@/lib/axios'
interface InputData {
    booklets: TableData[],
    currentPage: number,
    perPage: number,
    totalDocuments: number,
    totalPages: number
}

const transformData = (data: InputData): TableData[] => {
    const res = data?.booklets?.map((item, index) => {
        switch (item.category) {
            case "Information Technology":
                item.department = "IT Department";
                break;
            case "Healthcare Services":
                item.department = "Health Department";
                break;
            case "Urban Planning":
                item.department = "UrbanVision Authority";
                break;
            case "Education":
                item.department = "Education Department";
                break;
            case "Municipal, Rural Affairs and Housing":
                item.department = "Municipal Affairs Authority";
                break;
            case "Industry and Mineral Resources":
                item.department = "Industry Authority";
                break;
            case "Environment, Water and Agriculture":
                item.department = "Environment Authority";
                break;
            default:
                item.department = "Unknown";
        }
        item.index = ((data.currentPage - 1) * data.perPage) + (index + 1)
        return item
    })
    return res
}

const Dashboard: React.FC = async () => {

    const { error, data: response } = await tryCatch(axiosAuthClient.post("/booklets/paginate", { page: 1, limit: 10 }))
    if (error) return "An error occured";
    const data = transformData(response.data.data)
    return (
        <section className='flex-1 flex flex-col gap-4 px-4'>
            <div className=""></div>
            <div>
                <BookletTable data={data} />
            </div>
        </section>
    )
}

export default Dashboard
