import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        <div className="w-full lg:h-screen lg:overflow-auto mx-auto px-20 max-sm:px-3 p-6 flex flex-col">
            <div className="flex justify-start space-x-3 mb-6">
                <button onClick={() => navigate("/")} className="py-2 px-3 hidden max-sm:block rounded-lg text-sm max-sm:text-xs font-semibold transition-all duration-300 bg-gray-800 text-gray-300">
                    Gönderiler
                </button>
                <button
                    onClick={() => navigate("/portfolio")}
                    className="py-2 px-3 hidden max-sm:block rounded-lg text-sm max-sm:text-xs font-semibold transition-all duration-300 bg-yellow-500 text-white"
                >
                    Portfolyo
                </button>
            </div>

            <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 max-sm:gap-4 mb-auto">
                {currentProjects.map((project, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                        key={index}
                        onClick={() => window.open(project.link, "_blank")}
                        className="border border-slate-800 p-3 rounded-md shadow-sm hover:shadow-md cursor-pointer transform hover:scale-105 relative sm:p-4 sm:rounded-lg"
                    >
                        {project.isNew && <span className="absolute top-2 right-2 bg-amber-400 text-[10px] font-semibold text-gray-900 px-1.5 py-0.5 rounded sm:text-xs">Yeni</span>}
                        <div className="flex items-center space-x-3 sm:flex-col sm:justify-center">
                            <img src={project.image} alt={project.title} className="w-36 h-36 max-sm:w-20 max-sm:h-20 object-cover rounded-md" />
                            <div className="flex-1 mt-3 max-sm:mt-0 max-sm:text-left text-center">
                                <h3 className="text-md mt-2 max-sm:text-sm font-medium text-white truncate">{project.title}</h3>
                                <p className="text-sm mt-2 text-gray-400 max-sm:text-xs">{project.date}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-auto">
                <Pagination totalItems={projects.length} itemsPerPage={postsPerPage} currentPage={currentPage} onPageChange={paginate} />
            </div>
        </div>
    );
}

export default Portfolio;
