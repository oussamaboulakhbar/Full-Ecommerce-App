import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/UserSlice";
import Role from "../common/role";
import Context from "../context";

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatsh = useDispatch()
    console.log("data header", user)
    const [Menu, setMenu] = useState(false)
    const context = useContext(Context)
    const navigate =useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search,setSearch] = useState(searchQuery)
    const handlleLogout = async () => {
        const fetchdata = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include'
        })
        const data = await fetchdata.json();
        if (data.success) {
            toast.success(data.message)
            dispatsh(setUserDetails(null))
        }
        if (data.error) {
            toast.error(data.message)
        }
    }
    const handleSearch = (e) => {
        const {value} = e.target
        setSearch(value)
        if(value){
            navigate(`/Search?q=${value}`)
        }else{
            navigate(`/Search`)
        }
    }
    return (
        <header className="h-16 shadow-md bg-white fixed z-40 w-full">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Link to={"/"} >
                        <Logo w={100} h={60} />
                    </Link>
                </div>
                <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input type="text" placeholder="Search product here" className="w-full outline-none" onChange={handleSearch} value={search}/>
                    <div className="text-lg red min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white">
                        <GrSearch />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="relative flex justify-center" onClick={() => setMenu(prev => !prev)}>
                        {
                            user?._id && (
                                <div className="text-3xl cursor-pointer">
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} alt={user?.name} className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <FaRegCircleUser />
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            Menu && user?.role === Role.ADMIN && (
                                <div className=' absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg hidden md:block'>
                                    <nav>
                                        <Link to={"/admin-panel/all-products"} className="whitespace-nowrap  hover:bg-slate-100 p-2 ">Admin panel</Link>
                                    </nav>
                                </div>
                            )
                        }
                    </div>
                    {
                        user?._id && (
                            <Link to={"/Cart"} className="text-2xl relative cursor-pointer">
                                <span><FaShoppingCart /></span>
                                <div className="red text-white w-5 p-1 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                                    <p className="text-sm">{context.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }
                    <div>
                        {
                            user?._id ? (
                                <button className="text-white bg-gradient-to-r w-28 mx-1 from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-bold text-md rounded-md px-5 py-2.5 text-center me-2 " onClick={handlleLogout}>Logout</button>
                            ) : (
                                <Link to={"/login"}><button className="text-white bg-gradient-to-r w-28 mx-1 from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-bold text-md rounded-md px-5 py-2.5 text-center me-2">Login</button></Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
