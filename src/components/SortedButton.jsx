import React from "react";

const SortedButton = ({ sortOrder, setSortOrder }) => {
    return (
        <div className="mb-6 flex items-center space-x-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => setSortOrder("newest")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        sortOrder === "newest"
                            ? "btn-modern"
                            : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                    En Yeni
                </button>
                <button
                    onClick={() => setSortOrder("oldest")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        sortOrder === "oldest"
                            ? "btn-modern"
                            : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                    En Eski
                </button>
            </div>
        </div>
    );
};

export default SortedButton;
