    import React, { useContext, useEffect, useRef, useState } from 'react'
    import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
    import { FaAngleLeft, FaAngleRight, FaStarHalfStroke } from 'react-icons/fa6'
    import { Link } from 'react-router-dom'
    import addToCart from '../helpers/addToCart'
    import Context from '../context/index'
    import displayDHCurrency from '../helpers/DisplayDHCurrency'
    import { FaStar } from 'react-icons/fa'

    const VerticalCardProduct = ({ category, heading }) => {
        const [data, setData] = useState([])
        const [loading, setLoading] = useState(true)
        const loadingList = new Array(13).fill(null)

        const [scroll, setScroll] = useState(0)
        const [maxScroll, setMaxScroll] = useState(0)
        const scrollElement = useRef()

        const { fetchUserAddToCart } = useContext(Context)

        const handleAddToCart = async (e, id) => {
            await addToCart(e, id)
            fetchUserAddToCart()
        }

        const fetchData = async () => {
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setLoading(false)

            console.log("horizontal data", categoryProduct.data)
            setData(categoryProduct?.data)
        }

        useEffect(() => {
            fetchData()
        }, [])

        useEffect(() => {
            const handleScroll = () => {
                const element = scrollElement.current
                setScroll(element.scrollLeft)
                setMaxScroll(element.scrollWidth - element.clientWidth)
            }
            const element = scrollElement.current
            element.addEventListener('scroll', handleScroll)
            handleScroll(); // Initialize the scroll values
            return () => {
                element.removeEventListener('scroll', handleScroll)
            }
        }, [])

        const scrollRight = () => {
            scrollElement.current.scrollLeft += 300
        }
        const scrollLeft = () => {
            scrollElement.current.scrollLeft -= 300
        }

        return (
            <div className='container mx-auto px-4 my-6 relative'>
                <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
                <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                    {scroll > 0 && (
                        <button className='bg-white shadow-md rounded-full p-2 absolute left-0 text-xl hidden md:block z-50 hover:bg-green-500 hover:text-white' onClick={scrollLeft}><FaAngleLeft /></button>
                    )}
                    {scroll < maxScroll && (
                        <button className='bg-white shadow-md rounded-full p-2 absolute right-0 text-xl hidden md:block z-50 hover:bg-green-500 hover:text-white' onClick={scrollRight}><FaAngleRight /></button>
                    )}

                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px]  md:min-w-[293px] max-w-[280px] md:max-w-[293px]  bg-white rounded-lg shad '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link key={product?._id} to={"product/" + product?._id} className='w-full min-w-[280px]  md:min-w-[292px] max-w-[280px] md:max-w-[292px]  bg-white rounded-lg shad '>
                                <div className='bg-slate-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center brdr'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt='' />
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium  md:text-lg text-ellipsis line-clamp-1 text3 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='text-yellow-400 flex items-center gap-1'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfStroke />
                                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">4.5</span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <p className='text2 font-medium'>{displayDHCurrency(product?.sellingPrice)}</p>
                                        <p className=' line-through text1'>{displayDHCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        )
    }

    export default VerticalCardProduct
