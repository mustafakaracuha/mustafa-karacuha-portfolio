import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import posts from "../posts/posts.json";
import colors from "../colors/colors.json";
import SortedButton from "./SortedButton";
import Pagination from "./Pagination";

const PostList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("newest");
    const postsPerPage = 5;
    let usedColors = [];

    const getRandomColor = () => {
        if (usedColors.length === colors.length) {
            usedColors = [];
        }

        const availableColors = colors.filter((color) => !usedColors.includes(color));

        const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

        usedColors.push(randomColor);

        return randomColor;
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === "newest") {
            return new Date(b.date) - new Date(a.date);
        }
        return new Date(a.date) - new Date(b.date);
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <SortedButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
            {/* Post List */}
            <div className="space-y-6">
                {currentPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        className="bg-slate-800 max-sm:p-4 p-6 rounded-xl transition-shadow duration-300 relative"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        {post.isNew && <span className="absolute top-4 right-4 bg-amber-400 text-xs font-bold text-gray-900 px-2 py-1 rounded">Yeni</span>}
                        <div className="flex max-sm:flex-col items-center max-sm:items-baseline max-sm:space-y-4 justify-between">
                            <div className="flex items-center space-x-3 max-sm:space-x-0">
                                <div className="w-8 h-8 rounded-xl max-sm:hidden" style={{ backgroundColor: getRandomColor() }}></div>
                                <Link
                                    title={post.title}
                                    to={`/post/${post.link}`}
                                    className="text-lg w-96 text-ellipsis whitespace-nowrap overflow-hidden max-sm:w-full max-sm:text-sm font-semibold text-gray-300 hover:text-amber-400"
                                >
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                        <p className="text-gray-500 text-md max-sm:text-xs mt-4 max-w-xl text-ellipsis whitespace-nowrap overflow-hidden">{post.sortDesc}</p>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-gray-600 max-sm:hidden text-sm max-sm:text-xs">{post.tag}</p>
                            <p className="text-xs font-semibold max-sm:text-gray-400 flex items-center gap-2 text-gray-400">{post.trDate}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Pagination */}
            <Pagination totalItems={posts.length} itemsPerPage={postsPerPage} currentPage={currentPage} onPageChange={paginate} />
        </div>
    );
};

export default PostList;
