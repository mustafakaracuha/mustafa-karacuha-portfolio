import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === 1
                        ? "glass-card text-white/30 cursor-not-allowed"
                        : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                }`}
            >
                ←
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                            ? "btn-modern"
                            : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === totalPages
                        ? "glass-card text-white/30 cursor-not-allowed"
                        : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                }`}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
