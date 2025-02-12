import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-4 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                {/* Left Section - Branding */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://media1.thehungryjpeg.com/thumbs/800_3656449_67zia1zy6datiwxo1hjh9dlv6ldctr7pg218elfs.jpg"
                        alt="Logo"
                        className="w-10 h-10 rounded-full object-cover border border-gray-400 shadow-md"
                    />
                    <span className="text-lg font-semibold">CodeKeep</span>
                </div>

                {/* Center Section - Contact Info */}
                <div className="text-sm text-gray-400 mt-3 md:mt-0 text-center">
                    <p>📞 +91 62821858035</p>
                    <p>📧 shaiksameerbasha886@gmail.com</p>
                </div>

                {/* Right Section - Social Links */}
                <div className="flex gap-4 mt-3 md:mt-0">
                    <a
                        href="https://www.linkedin.com/in/shaik-sameer-basha-9b9054228/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition flex items-center gap-2"
                    >
                        <i className="fab fa-linkedin text-xl"></i>
                        <span className="text-sm">LinkedIn</span>
                    </a>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center text-gray-500 text-sm mt-3">
                © {new Date().getFullYear()} CodeKeep. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
