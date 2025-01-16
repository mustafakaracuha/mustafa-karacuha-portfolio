import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import moment from "moment";
import posts from "../posts/posts.json";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const BlogDetail = ({isDarkMode}) => {
    const { postName } = useParams();
    const [content, setContent] = useState("");
    const [metaData, setMetaData] = useState({});
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const post = posts.find((p) => p.link.toString() === postName);

        if (post) {
            setMetaData({
                title: post.title,
                date: post.trDate,
                author: post.author,
                tag: post.tag,
            });

            fetch(`/posts/${post.content}`)
                .then((res) => res.text())
                .then((data) => {
                    setContent(data);
                })
                .catch((err) => {
                    console.error("İçerik yüklenirken bir hata oluştu.", err);
                    setContent("İçerik yüklenirken bir hata oluştu.");
                });
        }
    }, [postName]);

    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    };

    return (
        <div className="w-full max-w-3xl lg:h-screen lg:overflow-auto mx-auto p-10 max-sm:p-2">
            <button onClick={() => navigate("/")} className="ml-6 text-gray-200 rounded-md hover:text-amber-400 hover:underline transition duration-300">
                Geri
            </button>
            <div className="p-6">
                <h2 className="text-xl max-sm:text-md font-semibold text-gray-200">{metaData.title}</h2>
                <p className="text-gray-400 text-sm max-sm:text-sm mt-2"> {metaData.date}</p>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="!bg-transparent" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                    className="flex-col items-center justify-center !max-w- !text-gray-400 !text-start max-sm:text-sm text-md prose mt-8"
                >
                    {content}
                </ReactMarkdown>

                <div className="mt-6 flex items-center justify-start max-sm:justify-between">
                    <button onClick={handleShare} className="py-1 px-3 bg-amber-400 max-sm:text-sm text-white rounded-md hover:bg-amber-500 transition duration-300">
                        {copied ? <span className="text-white text-sm">Link kopyalandı!</span> : "Paylaş"}
                    </button>

                    <div className="space-x-4 hidden max-sm:flex">
                        <a
                            href={`https://twitter.com/share?url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-sm:text-sm text-xl text-gray-300 hover:text-blue-500"
                        >
                            <FaTwitter />
                        </a>
                        <a href={`https://github.com/mustafakaracuha`} target="_blank" rel="noopener noreferrer" className="max-sm:text-sm text-xl  text-gray-300 hover:text-gray-400">
                            <FaGithub />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-sm:text-sm text-xl  text-gray-300 hover:text-blue-600"
                        >
                            <FaLinkedin />
                        </a>
                        <a href={`https://instagram.com/muskaracuha`} target="_blank" rel="noopener noreferrer" className="max-sm:text-sm text-xl text-gray-300 hover:text-pink-500">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                <div className="mt-8  hidden max-sm:flex justify-between items-center">
                    <p className="max-sm:text-xs text-gray-400 text-sm">{metaData.author}</p>
                    <div className="flex space-x-3">
                        {metaData.tag &&
                            metaData.tag.split(",").map((tag, index) => (
                                <span key={index} className="max-sm:text-xs text-sm text-gray-400 border border-gray-600 rounded px-2 py-1">
                                    {tag.trim()}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
