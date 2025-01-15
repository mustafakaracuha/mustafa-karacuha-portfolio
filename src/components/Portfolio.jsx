import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { projects } from "../data/project";
import Pagination from "./Pagination"; // Sayfalama bileşeni

function Portfolio() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-start space-x-4 mb-6">
                <button onClick={() => navigate("/")} className="py-2 px-3 rounded-lg text-sm max-sm:text-xs font-semibold transition-all duration-300 bg-gray-800 text-gray-300">
                    Gönderiler
                </button>
                <button onClick={() => navigate("/projects")} className="py-2 px-3 rounded-lg text-sm max-sm:text-xs font-semibold transition-all duration-300 bg-yellow-500 text-white">
                    Projeler
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        key={index}
                        onClick={() => window.open(project.link, "_blank")}
                        className="bg-slate-800 p-5 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl cursor-pointer transform hover:scale-105 relative"
                    >
                        {project.isNew && <span className="absolute top-4 right-4 z-50 bg-amber-400 text-xs font-bold text-gray-900 px-2 py-1 rounded">Yeni</span>}
                        <div className="w-full flex items-center justify-center overflow-hidden rounded-lg mb-4">
                            <img src={project.image} alt={project.title} className="w-36 h-36 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-md font-semibold text-gray-800 truncate">{project.title}</h2>
                            <p className="text-gray-500 text-sm mt-2">{project.date}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Sayfalama */}
            <Pagination totalItems={projects.length} itemsPerPage={postsPerPage} currentPage={currentPage} onPageChange={paginate} />
        </div>
    );
}

export default Portfolio;
