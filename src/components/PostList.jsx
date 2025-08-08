import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import posts from "../posts/posts.json";
import colors from "../colors/colors.json";
import SortedButton from "./SortedButton";
import Pagination from "./Pagination";

const PostList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("newest");
    const [postsPerPage, setPostsPerPage] = useState(4);
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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setPostsPerPage(6);
            } else {
                setPostsPerPage(4);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
        <div className="w-full mx-auto px-8 max-sm:px-4 p-6 flex flex-col">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl max-sm:text-2xl font-bold mb-2">
                    <span className="gradient-text">Blog</span>
                    <span className="text-white"> Yazıları</span>
                </h1>
                <p className="text-white/70 text-lg max-sm:text-base">  
                    Teknoloji ve web geliştirme üzerine yazılarım
                </p>
            </div>

            <SortedButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
            
            {/* Post List */}
            <div className="space-y-6 mb-8">
                {currentPosts.map((post, index) => (
                    <div
                        key={post.id}
                        className="glass-card p-6 max-sm:p-4 relative overflow-hidden group"
                    >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {post.isNew && (
                            <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-gray-900 px-3 py-1 rounded-full shadow-lg">
                                Yeni
                            </span>
                        )}
                        
                        <div className="relative z-10">
                            <div className="flex max-sm:flex-col items-center max-sm:items-start max-sm:space-y-4 justify-between">
                                <div className="flex items-center space-x-4 max-sm:space-x-3">
                                    <div 
                                        className="w-10 h-10 rounded-xl max-sm:w-8 max-sm:h-8 shadow-lg"
                                        style={{ backgroundColor: getRandomColor() }}
                                    ></div>
                                    <Link
                                        title={post.title}
                                        to={`/post/${post.link}`}
                                        className="text-xl w-96 max-sm:w-60 text-ellipsis whitespace-nowrap overflow-hidden max-sm:text-lg font-semibold text-white hover:gradient-text transition-all duration-300"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                            
                            <p className="text-white/70 text-lg max-sm:text-base mt-4 max-w-2xl leading-relaxed">
                                {post.sortDesc}
                            </p>
                            
                            <div className="flex items-center justify-between mt-6">
                                <div className="flex flex-wrap gap-2 max-sm:hidden">
                                    {post.tag.split(' ').map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex}
                                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80 border border-white/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                                    {post.trDate}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-auto">
                <Pagination totalItems={posts.length} itemsPerPage={postsPerPage} currentPage={currentPage} onPageChange={paginate} />
            </div>
        </div>
    );
};

export default PostList;
