'use client'
import BookletTable, { type TableData } from '@/components/home/booklet-table'
import { Client } from '@/lib/eden';
import { createSearch, searchItems } from '@/utils/search-utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSearch } from '@/providers/search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchInput } from '@/components/ui/search-input';
import { useTranslations } from '@/providers/language';

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


const Booklets: React.FC = () => {
    const client = Client();
    const t = useTranslations("BookletTable");
    const { searchTerm, searchFilter, setSearchFilter } = useSearch();
    const [paginateion, setPagination] = useState({ page: 1, limit: 10 })
    const { data: res, isLoading, isError } = useQuery({
        queryKey: ['booklets', paginateion.page, paginateion.limit],
        queryFn: () => client?.api.booklets.paginate.post({ page: paginateion.page, limit: paginateion.limit }),
        retry: false,
    });
    if (isError && !isLoading && !res) return "An error occured";
    const searchByFilter = createSearch([searchFilter])
    const data = searchByFilter(transformData(res?.data.data), searchTerm) || searchItems(transformData(res?.data.data), searchTerm)
    return (
        <section className='flex-1 flex flex-col gap-4 px-4'>
            <div className="h-14 flex items-center justify-between gap-4 px-6">
                <div className="flex-1 flex items-center gap-2">
                    <h6 className="text-sm font-medium whitespace-nowrap">{t("filter")}</h6>
                    <Select value={searchFilter} onValueChange={setSearchFilter}>
                        <SelectTrigger className="bg-white w-full shadow-none !border-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder={t("selectFilter")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="index">{t("index")}</SelectItem>
                            <SelectItem value="category">{t("category")}</SelectItem>
                            <SelectItem value="projectName">{t("projectName")}</SelectItem>
                            <SelectItem value="bookletNumber">{t("bookletNumber")}</SelectItem>
                            <SelectItem value="department">{t("department")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <SearchInput placeholder={t("searchBooklets")} className="bg-white !border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
            </div>
            <div>
                <BookletTable data={data as any} isLoading={isLoading} pagination={paginateion} setPagination={setPagination} totalPages={res?.data.data.totalPages} currentPage={res?.data.data.currentPage} />
            </div>
        </section>
    )
}

export default Booklets
