import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import CategroyWiseProductDisplay from '../Compenents/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import displayDHCurrency from '../helpers/DisplayDHCurrency';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)

    const { fetchUserAddToCart } = useContext(Context)

    const navigate = useNavigate()

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataReponse = await response.json()

        setData(dataReponse?.data)
        setActiveImage(dataReponse?.data?.productImage[0])

    }

    console.log("data", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate("/cart")
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/***product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' alt='' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
                        {/**product zoom */}
                        {zoomImage && (
                            <div className='hidden lg:block absolute min-w-[400px] z-50 overflow-hidden min-h-[384px] bg-slate-200 p-1 -right-[420px] top-0 '>
                                <div
                                    className='w-full h-full min-h-[300px] min-w-[400px] mix-blend-multiply scale-150'
                                    style={{
                                        background: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                                    }}
                                >
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='h-full'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {productImageListLoading.map((el, index) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {data?.productImage?.map((imgURL, index) => (
                                    <div className={`h-20 w-20 bg-slate-200 rounded p-1 ${activeImage === imgURL ? 'active-border' : ''}`} key={imgURL}>
                                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onClick={() => handleMouseEnterProduct(imgURL)} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/***product details */}
                {loading ? (
                    <div className='grid gap-1 w-full'>
                        <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
                        <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
                        <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>
                        <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'></div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                            <p className='text-red-600 bg-slate-200 w-full'></p>
                            <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                        </div>
                        <div className='flex items-center gap-3 my-2 w-full'>
                            <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                            <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                        </div>
                        <div className='w-full'>
                            <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                            <p className='bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full'></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <p className='bg-blue-200 text-black-600 text-lg px-2 rounded-md p-1 inline-block w-fit'>{data?.brandName}</p>
                        <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                        <p className='capitalize text-lg text-slate-400'>{data?.category}</p>
                        <div className='text-yellow-400 flex items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfStroke />
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">4.5</span>
                        </div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                            <p className='text-red-600'>{displayDHCurrency(data.sellingPrice)}</p>
                            <p className='text-slate-400 text-lg relative top-1 line-through'>{displayDHCurrency(data.price)}</p>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium my-1'>Description :</p>
                            <p>{data?.description}</p>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <button className='bg-blue-600 text-white px-4 py-2 rounded-md min-w-[120px]' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                            <button className='bg-green-600 text-white px-4 py-2 rounded-md min-w-[120px] ' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                        </div>
                    </div>
                )}
            </div>
            {data.category && (
                <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product for you"} />
            )}
        </div>
    )
}

export default ProductDetails
