import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-700 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-8">
                {/* Social Media Links */}
                <div className="flex space-x-6">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaFacebookF size={20} />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaLinkedinIn size={20} />
                    </a>
                </div>

                {/* Website Links */}
                <div className="flex space-x-6">
                    <span className="hover:text-gray-300">
                        Privacy Policy
                    </span>
                    <span className="hover:text-gray-300">
                        Terms of Service
                    </span>
                    <span className="hover:text-gray-300">
                        Contact Us
                    </span>
                </div>
            </div>

            <div className="text-center text-sm mt-4 text-gray-300">
                © {new Date().getFullYear()} MyCompany. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
