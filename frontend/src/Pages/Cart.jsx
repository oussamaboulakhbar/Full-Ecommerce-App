import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import { MdDelete } from "react-icons/md";
import displayDHCurrency from '../helpers/DisplayDHCurrency';
import { toast } from 'react-toastify';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartViewProduct.url, {
            method: SummaryApi.addToCartViewProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
            method: SummaryApi.updateAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty === 1) {
            setModalProductId(id);
            setModalVisible(true);
        } else {
            const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
                method: SummaryApi.updateAddToCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
            method: SummaryApi.deleteAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message);
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const handleDeleteConfirm = () => {
        deleteCartProduct(modalProductId);
        setModalVisible(false);
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='p-4'>
                {/***view product */}
                <div className='w-full'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            ))
                        ) : (
                            <table className='min-w-full bg-white border border-gray-300'>
                                <thead>
                                    <tr className='bg-black text-white'>
                                        <th className='px-1 py-1 border'>N°</th>
                                        <th className='px-1 py-1 border'>Product Image</th>
                                        <th className='px-1 py-1 border'>Product Name</th>
                                        <th className='px-1 py-1 border'>Category</th>
                                        <th className='px-1 py-1 border'>Price</th>
                                        <th className='px-1 py-1 border'>Quantity</th>
                                        <th className='px-1 py-1 border'>Total</th>
                                        <th className='px-1 py-1 border'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((product, index) => (
                                            <tr key={product?._id} className='border'>
                                                <td className='px-4 py-2 border'>{index + 1}</td>
                                                <td className='px-3 py-2 border '>
                                                    <img src={product?.productId?.productImage[0]} className='w-28 mx-auto h-16 object-scale-down' alt={product?.productId?.productName} />
                                                </td>
                                                <td className='px-2 py-1 border text-center truncate max-w-xs' title={product?.productId?.productName}>
                                                    {product?.productId?.productName}
                                                </td>
                                                <td className='px-2 py-1 border text-center'>{product?.productId?.category}</td>
                                                <td className='px-2 py-1 border text-center'>{displayDHCurrency(product?.productId?.sellingPrice)}</td>
                                                <td className='px-2 py-1 border text-center'>
                                                    <div className='flex items-center gap-3 justify-center'>
                                                        <button className='border bg-green-600 text-white w-7 h-7 flex justify-center items-center rounded-md' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                        <span className='text-lg font-bold'>{product?.quantity}</span>
                                                        <button className='border bg-blue-600 text-white w-7 h-7 flex justify-center items-center rounded-md' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                                    </div>
                                                </td>
                                                <td className='px-4 py-2 border text-center'>{displayDHCurrency(product?.productId?.sellingPrice * product?.quantity)}</td>
                                                <td className='px-5 py-3 border '>
                                                    <div className='w-fit ml-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => { setModalProductId(product?._id); setModalVisible(true); }}>
                                                        <MdDelete />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>

                <div className='flex justify-around '>
                    {/***Coupoun */}
                    <div className='mt-5 lg:mt-10 w-96  max-w-sm mb-7 mx-auto'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                </div>
                            ) : (
                                <div className='bg-white rounded-md h-full'>
                                    <h2 className='text-white bg-orange-600 p-2 rounded-t-md mb-2 text-center text-lg'>COUPOUN</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 my-3'>
                                        <p>Enter your coupoun code to have -20% of TotalPrice :</p>
                                    </div>
                                    <div className='flex items-center justify-between w-full p-4'>
                                        <input type="text" id="coupoun" class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coupoun Code" required />
                                        <button className='bg-blue-600 p-2 rounded-lg text-white'>Aplly Coupoun</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/***summary  */}
                    <div className='mt-5 lg:mt-10 w-full max-w-sm mb-7 mx-auto'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                </div>
                            ) : (
                                <div className='h-36 bg-white rounded-md'>
                                    <h2 className='text-white bg-red-600 p-2 rounded-t-md mb-2 text-center text-lg'>Cart Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity :</p>
                                        <p>{totalQty}</p>
                                    </div>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price :</p>
                                        <p>{displayDHCurrency(totalPrice)}</p>
                                    </div>
                                    <button className='bg-blue-600 p-2 text-white w-full mt-4 rounded-b-md text-xl'>Payment</button>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>

            {modalVisible && (
                <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setModalVisible(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button onClick={handleDeleteConfirm} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setModalVisible(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
