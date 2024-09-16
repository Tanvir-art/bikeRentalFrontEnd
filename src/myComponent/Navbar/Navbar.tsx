import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/features/loginSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const Navbar: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('user');
        navigate('/login');
        toast('Logout Successful');
        // window.location.reload();
    };

    return (
        <nav className="bg-blue-700 text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-xl font-bold">
                    <Link to="/">MyLogo</Link>
                </div>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/bikeList" className="hover:text-gray-300">
                        Bikes
                    </Link>
                    <Link to="/about" className="hover:text-gray-300">
                        About
                    </Link>
                    {user?.email ? (
                        <div className="relative z-10">
                            <button
                                onClick={toggleDropdown}
                                className="hover:text-gray-300 flex items-center space-x-2"
                            >
                                <span>{user.name}</span>
                                <svg
                                    className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                    <Link
                                        to="/rental-page"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={toggleDropdown}
                                    >
                                        My Rental Page
                                    </Link>
                                    <Link
                                        to="/userProfile"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={toggleDropdown}
                                    >
                                        Profile
                                    </Link>
                                    <span
                                        onClick={() => {
                                            handleLogout();
                                            toggleDropdown();
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-gray-300">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700">
                    <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-blue-800"
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="block px-4 py-2 hover:bg-blue-800"
                        onClick={toggleMenu}
                    >
                        About
                    </Link>
                    {user?.email ? (
                        <>
                            <Link
                                to="/rental-page"
                                className="block px-4 py-2 hover:bg-blue-800"
                                onClick={toggleMenu}
                            >
                                My Rental Page
                            </Link>
                            <Link
                                to="/userProfile"
                                className="block px-4 py-2 hover:bg-blue-800"
                                onClick={toggleMenu}
                            >
                                Profile
                            </Link>
                            <span
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="block px-4 py-2 hover:bg-blue-800 cursor-pointer"
                            >
                                Logout
                            </span>
                            <ToastContainer />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block px-4 py-2 hover:bg-blue-800"
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="block px-4 py-2 hover:bg-blue-800"
                                onClick={toggleMenu}
                            >
                                Signup
                            </Link>

                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
