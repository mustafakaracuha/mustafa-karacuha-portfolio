import React from "react";
import { motion } from "framer-motion";

const BackToTopButton = ({ showBackToTop, scrollToTop }) => {
    return (
        showBackToTop && (
            <motion.button
                className="w-auto h-10 fixed bottom-10 right-10 text-md flex items-center justify-center bg-gray-700 text-white p-4 rounded-full hover:bg-amber-400"
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                Yukarı çık
            </motion.button>
        )
    );
};

export default BackToTopButton;
