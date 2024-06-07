import React, { useContext, useState } from 'react'
import loginimage from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [Showpassword, setShowpassword] = useState(false)
    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    const navigate =useNavigate()
    const {fetchUserdetails , fetchUserAddToCart} = useContext(Context)
    const handlechange = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    console.log("data login", data);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials:'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserdetails()
            fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }
    return (
        <section id='login '>
            <div className='mx-auto container p-4 '>
                <div className='bg-white w-full max-w-sm mx-auto p-5 shadow-xl rounded-md'>
                    <div className='w-20 h-20 mx-auto '>
                        <img src={loginimage} alt="" className='bg-white'/>
                    </div>
                    <form action="" className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="email">Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email"
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handlechange}
                                    className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={Showpassword ? "text" : "password"}
                                    name='password'
                                    value={data.password}
                                    onChange={handlechange}
                                    placeholder='enter password'
                                    className='w-full h-full outline-none bg-transparent' required />
                                <div className='cursor-pointer' onClick={() => { setShowpassword((prev => !prev)) }}>
                                    <span>
                                        {
                                            Showpassword ? (<FaEyeSlash />) : (<FaEye />)
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>forgot password ?</Link>
                        </div>
                        <button className='red hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all rounded-full mx-auto mt-6 block'>Login</button>
                    </form>
                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-violet-600 hover:text-violet-700 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login