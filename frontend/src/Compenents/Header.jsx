import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { FaRegCircleUser } from "react-icons/fa6";
import {  FaSearch } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/UserSlice";
import Role from "../common/role";
import Context from "../context";
import { FaShoppingBag } from "react-icons/fa";


const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [Menu, setMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false); 
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const handleLogout = async () => {
        const fetchdata = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include'
        })
        const data = await fetchdata.json();
        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }
        if (data.error) {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        if (value) {
            navigate(`/Search?q=${value}`)
        } else {
            navigate(`/Search`)
        }
    }

    return (
        <header className="h-16 shadow-md bg-white fixed z-40 w-full">
            <div className="h-full container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <div>
                    <Link to={"/"} >
                        <Logo w={100} h={60} />
                    </Link>
                </div>
                {/* Barre de recherche */}
                <form className={`relative  w-[600px] ${showSearch ? "" : "hidden"}`}> {/* Utilisation de la classe "hidden" conditionnelle */}
                    <button className="absolute left-2 -translate-y-1/2 top-6">
                        <svg
                            width="17"
                            height="16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-labelledby="search"
                            className="w-5 h-5 text-gray-700"
                        >
                            <path
                                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                                stroke="currentColor"
                                strokeWidth="1.333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <input
                        className="input h-10 rounded-lg w-full px-9 py-3 border-2 border-blue-400 focus:outline-none focus:border-blue-600 placeholder-gray-400 transition-all duration-300 shadow-md"
                        placeholder="Search Product Here"
                        onChange={handleSearch}
                        value={search}
                        required=""
                        type="text"
                    />
                </form>

                {/* Profile */}
                {
                    user?._id && (
                        <div className="relative flex">
                            <div className="w-20 flex justify-around items-center mr-6">
                                <div
                                    className='text-2xl min-w-[50px] h-8 flex items-center justify-center cursor-pointer'
                                    onClick={() => setShowSearch(!showSearch)} 
                                >
                                    <FaSearch />
                                </div>
                                <div>
                                    {
                                        user?._id && (
                                            <Link to={"/cart"} className='text-2xl relative'>
                                                <span><FaShoppingBag /></span>
                                                <div className='bg-red-600 text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2'>
                                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                                </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                            <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => setMenu(prev => !prev)}>
                                <span className="sr-only">Open user menu</span>
                                {user?.profilePic ? (
                                    <img className="w-9 h-9 rounded-full" src={user?.profilePic} alt="user" />
                                ) : (
                                    <FaRegCircleUser />
                                )}
                            </button>
                            {/* Dropdown menu */}
                            {Menu && (
                                <div className="z-50 absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="px-2 py-2">
                                        <span className="block text-base font-medium text-gray-800 dark:text-white">MR {user?.name}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link to="/My-Account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Account</Link>
                                        </li>
                                        {user?.role === Role.ADMIN && (
                                            <li>
                                                <Link to="/admin-panel/all-products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin Panel</Link>
                                            </li>
                                        )}
                                        <li className="">
                                            <button className="flex items-center  p-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:text-white dark:hover:text-white" onClick={handleLogout}>
                                                <span>Logout</span>
                                                <LuLogOut className="ml-2" />
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            )}
                        </div>
                    )
                }

                {/* Login Button */}
                {!user?._id && (
                    <Link to={"/login"}>
                        <button className="text-white bg-gradient-to-r w-28 mx-1 from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-bold text-md rounded-md px-5 py-2.5 text-center me-2">Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
