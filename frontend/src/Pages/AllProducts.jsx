import React, { useEffect, useState } from 'react'
import UploadProduct from '../Compenents/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../Compenents/AdminProductCard'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allproduct.url)
        const dataResponse = await response.json()

        console.log("product data", dataResponse)

        setAllProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Product</h2>
                    <button className='flex justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700' onClick={() => setOpenUploadProduct(true)}>
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Upload Product
                    </button>
            </div>
            {/**all product */}
            <div className='flex items-center flex-wrap gap-7 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                        )
                    })
                }
            </div>





            {/**upload prouct component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }


        </div>
    )
}

export default AllProducts