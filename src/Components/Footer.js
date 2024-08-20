import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <p className="text-sm">&copy; This project is strictly used of University purposes. All rights reserved.</p>
                    </div>
                    <div className="text-center md:text-right mt-2 md:mt-0">
                        <a href="/privacy-policy" className="text-gray-400 hover:text-white mx-2">
                            Privacy Policy
                        </a>
                        <a href="/terms-of-service" className="text-gray-400 hover:text-white mx-2">
                            Terms of Service
                        </a>
                        <a href="/contact-us" className="text-gray-400 hover:text-white mx-2">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
