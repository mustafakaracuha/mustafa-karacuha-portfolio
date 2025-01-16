import React from "react";
import { motion } from "framer-motion";

const BackToTopButton = ({ showBackToTop, scrollToTop }) => {
    return (
        showBackToTop && (
            <motion.button
                className="max-sm:w-24 w-auto max-sm:text-sm h-10 fixed max-sm:bottom-14 max-sm:right-0 max-sm:left-0 max-sm:mx-auto bottom-10 right-10 text-md flex items-center justify-center bg-gray-700 text-white p-4 rounded-full hover:bg-amber-400"
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
