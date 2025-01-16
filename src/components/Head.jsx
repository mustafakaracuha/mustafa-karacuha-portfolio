import React from "react";
import { Link } from "react-router-dom";

import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import avatar from "../assets/avatar.jpeg";

function Head() {
    return (
        <div className="lg:min-h-screen max-sm:w-full bg-slate-900 border-r border-slate-800 flex w-full lg:max-w-sm flex-col items-center justify-between text-white p-6 text-center">
            <div className="flex flex-col items-center justify-start">
                <img src={avatar} alt="Avatar" className="max-sm:w-20 max-sm:h-20 w-24 h-24 rounded-full border-4 object-top object-cover border-yellow-400 shadow-lg mb-4" />
                <Link to="/" className="flex items-center justify-center mt-1 text-3xl max-sm:text-2xl font-normal space-x-1">
                    Mustafa Karaçuha
                </Link>

                <p className="mt-2 text-md max-sm:text-sm text-yellow-500">
                    <TypeAnimation
                        sequence={[
                            "Front End Developer",  
                            2000,
                            "JavaScript Enthusiast",
                            2000,
                            "Building Dynamic Web Apps",
                            2000,
                            "Passionate About Clean Code",
                            2000,
                            "Always Learning and Evolving",
                            2000,
                        ]}
                        wrapper="span"
                        speed={250}
                        deleteSpeed={200}
                        repeat={Infinity}
                    />
                </p>

                <div className="mt-4 flex items-center justify-center space-x-4">
                    <motion.a
                        href="https://instagram.com/muskaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-rose-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        <FaInstagram />
                    </motion.a>

                    <motion.a
                        href="https://twitter.com/muskaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                    >
                        <FaTwitter />
                    </motion.a>

                    <motion.a
                        href="https://github.com/mustafakaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-gray-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                    >
                        <FaGithub />
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/mustafakaracuha/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.4 }}
                    >
                        <FaLinkedin />
                    </motion.a>
                </div>

                <div className="mt-14 text-center max-sm:hidden">
                    <ul className="space-y-5">
                        <li>
                            <Link to="/" className="!text-white">
                                Gönderiler
                            </Link>
                        </li>
                        <li>
                            <Link to="/portfolio" className="!text-white">
                                Portfolyo
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-auto text-sm max-sm:hidden text-gray-400">
                <p>© 2025 Mustafa Karaçuha</p>
                <p>Son güncellenme: Ocak 2025</p>
            </div>
        </div>
    );
}

export default Head;
