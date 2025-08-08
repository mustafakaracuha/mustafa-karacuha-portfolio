import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PostList from "./components/PostList";
import BlogDetail from "./components/BlogDetail";
import Portfolio from "./components/Portfolio";
import Head from "./components/Head";
import BackToTopButton from "./components/BackToTopButton";

const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Router>
            <div className="min-h-screen font-sans flex max-sm:flex-col relative">
                {/* Optimized background particles - sadece desktop'ta göster */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none hidden lg:block">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0s'}}></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
                </div>

                <Head />

                <main className="flex-1 relative z-10 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/post/:postName" element={<BlogDetail />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </main>

                <BackToTopButton showBackToTop={showBackToTop} scrollToTop={scrollToTop} />
            </div>
        </Router>
    );
};

export default App;
