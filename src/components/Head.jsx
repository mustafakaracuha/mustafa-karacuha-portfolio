import React from "react";
import { Link } from "react-router-dom";

import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

import avatar from "../assets/avatar.jpeg";

function Head() {
    return (
        <div className="lg:min-h-screen max-sm:w-full glass border-r border-white/10 flex w-full lg:max-w-sm flex-col items-center justify-between text-white p-6 text-center relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-start">
                <div className="relative mb-6">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 rounded-full p-1">
                        <img 
                            src={avatar} 
                            alt="Avatar" 
                            className="w-full h-full rounded-full object-cover object-top border-4 border-white/20 shadow-2xl" 
                        />
                    </div>
                </div>

                <div>
                    <Link to="/" className="flex items-center justify-center mt-1 text-3xl max-sm:text-2xl font-bold space-x-1">
                        <span className="">Mustafa</span>
                        <span className="text-white">Karaçuha</span>
                    </Link>
                </div>

                <div className="mt-3">
                    <p className="text-lg max-sm:text-base font-medium gradient-text-secondary">
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
                </div>

                <div className="mt-6 flex items-center justify-center space-x-4">
                    <a
                        href="https://instagram.com/muskaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-rose-400 transition-all duration-300 hover:scale-110"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://twitter.com/muskaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    >
                        <FaTwitter />
                    </a>

                    <a
                        href="https://github.com/mustafakaracuha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-gray-300 transition-all duration-300 hover:scale-110"
                    >
                        <FaGithub />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/mustafakaracuha/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    >
                        <FaLinkedin />
                    </a>
                </div>

                <div className="mt-12 text-center max-sm:hidden">
                    <ul className="space-y-4">
                        <li>
                            <Link 
                                to="/" 
                                className="flex items-center space-x-3 px-4 py-3 glass-card hover:bg-white/10 transition-all duration-300 rounded-xl group"
                            >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                                <span className="text-white group-hover:gradient-text transition-all duration-300">Gönderiler</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/portfolio" 
                                className="flex items-center space-x-3 px-4 py-3 glass-card hover:bg-white/10 transition-all duration-300 rounded-xl group"
                            >
                                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
                                <span className="text-white group-hover:gradient-text transition-all duration-300">Portfolyo</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-auto text-sm max-sm:hidden text-white/60 relative z-10">
                <p>© 2025 Mustafa Karaçuha</p>
                <p className="text-xs mt-1 gradient-text-accent">Built with ❤️ & React</p>
            </div>
        </div>
    );
}

export default Head;
