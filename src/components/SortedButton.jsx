import React from "react";
import { useNavigate } from "react-router-dom";

function SortedButton({ sortOrder, setSortOrder }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-start space-x-4 mb-6">
            <button
                onClick={() => setSortOrder("newest")}
                className={`py-2 px-3 rounded-lg text-sm max-sm:text-xs font-semibold transition duration-300 ${sortOrder === "newest" ? "bg-yellow-500 text-white" : "bg-gray-800 text-gray-300"}`}
            >
                En Yeni
            </button>
            <button
                onClick={() => setSortOrder("oldest")}
                className={`py-2 px-3 rounded-lg text-sm max-sm:text-xs font-semibold transition duration-300 ${sortOrder === "oldest" ? "bg-yellow-500 text-white" : "bg-gray-800 text-gray-300"}`}
            >
                En Eski
            </button>
            <button onClick={() => navigate("/portfolio")} className={`py-2 px-3 rounded-lg text-sm max-sm:text-xs font-semibold transition duration-300 bg-gray-800 text-gray-300`}>
                Projeler
            </button>
        </div>
    );
}

export default SortedButton;
