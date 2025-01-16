import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex justify-center items-center  mt-5 space-x-2">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={`py-2 px-3 rounded-lg text-xs transition duration-300 ${currentPage === 1 ? "bg-gray-700 text-gray-400" : "bg-gray-800 text-gray-300 hover:bg-amber-400 hover:text-white"}`}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`py-2 px-3 rounded-lg text-xs transition duration-300 ${
                                currentPage === pageNumber ? "bg-amber-400 text-white" : "bg-gray-800 text-gray-300 hover:bg-amber-400 hover:text-white"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                }

                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return (
                        <span key={pageNumber} className="text-gray-500 px-2">
                            ...
                        </span>
                    );
                }

                return null;
            })}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={`py-2 px-3 rounded-lg text-xs transition duration-300 ${
                    currentPage === totalPages ? "bg-gray-700 text-gray-400" : "bg-gray-800 text-gray-300 hover:bg-amber-400 hover:text-white"
                }`}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
