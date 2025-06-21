import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
    pagination,
    setPagination,
    totalPages,
    currentPage
}: {
    pagination: { page: number, limit: number }
    setPagination: (pagination: { page: number, limit: number }) => void
    totalPages: number
    currentPage: number
}) => {
    const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);
    const [selectedPage, setSelectedPage] = useState(currentPage);

    useEffect(() => {
        setSelectedPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, page });
    };

    return (
        <nav aria-label="Pagination" className="flex justify-center">
            <ul className="flex items-center space-x-2">
                <li>
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="flex items-center px-3 py-2 rounded-l-lg bg-white hover:bg-primary-green/80 hover:cursor-pointer hover:text-white transition-all duration-300 ease-in-out h-10"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Previous</span>
                    </button>
                </li>
                {pages.slice(Math.max(selectedPage - 2, 0), Math.min(selectedPage + 4, totalPages)).map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 rounded-sm py-2 h-10 ${selectedPage !== page ? "bg-white hover:bg-primary-green/80 hover:cursor-pointer hover:text-white transition-all duration-300 ease-in-out" : "bg-primary-green/80 text-white"}`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                {pagination.page < totalPages - 1 && (
                    <li>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-2 h-10"
                        >
                            ...
                        </button>
                    </li>
                )}
                <li>
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === totalPages}
                        className="flex items-center px-3 py-2 rounded-r-lg bg-white hover:bg-primary-green/80 hover:cursor-pointer hover:text-white transition-all duration-300 ease-in-out h-10"
                    >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;