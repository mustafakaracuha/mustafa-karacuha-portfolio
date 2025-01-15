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
            <div className="flex justify-start space-x-3 mb-6">
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
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                        key={index}
                        onClick={() => window.open(project.link, "_blank")}
                        className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 relative"
                    >
                        {project.isNew && <span className="absolute top-2 right-2 bg-amber-400 text-xs font-semibold text-gray-900 px-2 py-0.5 rounded">Yeni</span>}
                        <div className="flex justify-center items-center mb-3">
                            <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded-md" />
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="text-sm font-medium text-white truncate">{project.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">{project.date}</p>
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
