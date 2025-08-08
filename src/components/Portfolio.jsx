import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { projects } from "../data/project";
import Pagination from "./Pagination";

function Portfolio() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-full mx-auto px-8 max-sm:px-4 p-6 flex flex-col">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl max-sm:text-2xl font-bold mb-2">
                    <span className="gradient-text">Proje</span>
                    <span className="text-white"> Portfolyosu</span>
                </h1>
                <p className="text-white/70 text-lg max-sm:text-base">
                    Geliştirdiğim web uygulamaları ve projeler
                </p>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-start space-x-3 mb-8">
                <button 
                    onClick={() => navigate("/")} 
                    className="py-2 px-4 hidden max-sm:block glass-card text-sm max-sm:text-xs font-semibold transition-all duration-300 hover:bg-white/10"
                >
                    Gönderiler
                </button>
                <button
                    onClick={() => navigate("/portfolio")}
                    className="py-2 px-4 hidden max-sm:block btn-modern text-sm max-sm:text-xs font-semibold"
                >
                    Portfolyo
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 max-sm:gap-4 mb-8">
                {currentProjects.map((project, index) => (
                    <div
                        key={index}
                        onClick={() => window.open(project.link, "_blank")}
                        className="glass-card p-4 rounded-xl shadow-lg cursor-pointer group relative overflow-hidden"
                    >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {project.isNew && (
                            <span className="absolute z-50 top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-[10px] font-bold text-gray-900 px-2 py-1 rounded-full shadow-lg z-10">
                                Yeni
                            </span>
                        )}
                        
                        <div className="relative z-10">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="relative overflow-hidden rounded-lg shadow-xl">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-40 max-sm:h-32 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300" 
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                        <span className="text-white text-xs font-medium">Görüntüle</span>
                                    </div>
                                </div>
                                
                                <div className="text-center w-full">
                                    <h3 className="text-lg max-sm:text-base font-semibold text-white truncate group-hover:gradient-text transition-all duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm mt-2 text-white/60 max-sm:text-xs">
                                        {project.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-auto">
                <Pagination totalItems={projects.length} itemsPerPage={postsPerPage} currentPage={currentPage} onPageChange={paginate} />
            </div>
        </div>
    );
}

export default Portfolio;
