import React from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = ({ showBackToTop, scrollToTop }) => {
    return (
        <>
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 glass-card rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group hover:scale-110"
                >
                    <FaArrowUp className="text-lg group-hover:text-purple-300 transition-colors duration-300" />
                </button>
            )}
        </>
    );
};

export default BackToTopButton;
