import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-primary shadow-lg border-white border-b ">
            <div className="container px-4 py-4 flex justify-between items-center">
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
                </div>
                <div className={`w-full lg:items-end md:flex md:items-end md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/Homepage" className="block text-white mt-4 md:mt-0 hover:text-secondary transition duration-300">Home</Link>
                    <Link to="/CheckIn" className="block text-start text-white mt-4 md:mt-0 hover:text-secondary transition duration-300">Check In</Link>
                    <Link to="/Login" className="block text-white mt-4 md:mt-0 hover:text-secondary transition duration-300">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
