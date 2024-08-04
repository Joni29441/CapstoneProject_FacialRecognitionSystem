import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-800 p-4 shadow-xl border-b-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">MySEEU</Link>
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
                </div>
                <div className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
                    <Link to="/Homepage" className="text-white block mt-4 md:mt-0">Home</Link>
                    <Link to="/profile" className="text-white block mt-4 md:mt-0">Profile</Link>
                    <Link to="/settings" className="text-white block mt-4 md:mt-0">Settings</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
