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
            <div className="min-h-screen bg-gray-900 font-sans">
                <Head />

                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/post/:postName" element={<BlogDetail />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                </Routes>

                <BackToTopButton showBackToTop={showBackToTop} scrollToTop={scrollToTop} />
            </div>
        </Router>
    );
};

export default App;
