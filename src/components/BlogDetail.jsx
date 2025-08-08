import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from "react-icons/fa";

import posts from "../posts/posts.json";

const BlogDetail = () => {
    const { postName } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundPost = posts.find((p) => p.link === postName);
        if (foundPost) {
            setPost(foundPost);
            fetch(`/posts/${foundPost.content}`)
                .then((response) => response.text())
                .then((text) => {
                    setContent(text);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error loading post:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [postName]);

    if (loading) {
        return (
            <div className="w-full mx-auto px-8 max-sm:px-4 p-6 flex flex-col">
                <div className="flex items-center justify-center py-20">
                    <div className="glass-card p-8 rounded-xl text-center">
                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/70">Yazı yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="w-full mx-auto px-8 max-sm:px-4 p-6 flex flex-col">
                <div className="flex items-center justify-center py-20">
                    <div className="glass-card p-8 rounded-xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Yazı bulunamadı</h2>
                        <p className="text-white/70 mb-6">Aradığınız yazı mevcut değil.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="btn-modern"
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto px-8 max-sm:px-4 p-6 flex flex-col">
            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 mb-6 group"
            >
                <FaArrowLeft className="group-hover:text-purple-400 transition-colors duration-300" />
                <span>Geri Dön</span>
            </button>

            {/* Article Header */}
            <div className="glass-card p-8 rounded-xl mb-8">
                <h1 className="text-4xl max-sm:text-2xl font-bold mb-4">
                    <span className="gradient-text">{post.title}</span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/70 mb-6">
                    <div className="flex items-center space-x-2">
                        <FaUser className="text-purple-400" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCalendar className="text-blue-400" />
                        <span>{post.trDate}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {post.tag.split(' ').map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/80 border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Article Content */}
            <div className="glass-card p-8 rounded-xl prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-bold mb-6 gradient-text">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-bold mb-4 gradient-text-secondary">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl font-bold mb-3 gradient-text-accent">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="text-white/80 leading-relaxed mb-4">{children}</p>
                        ),
                        code: ({ children }) => (
                            <code className="bg-white/10 px-2 py-1 rounded text-purple-300 font-mono text-sm">{children}</code>
                        ),
                        pre: ({ children }) => (
                            <pre className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-white/10">{children}</pre>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-white/70 mb-4">{children}</blockquote>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="text-white/80">{children}</li>
                        ),
                        a: ({ href, children }) => (
                            <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors duration-300">{children}</a>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-bold text-white">{children}</strong>
                        ),
                        em: ({ children }) => (
                            <em className="italic text-white/90">{children}</em>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogDetail;
