import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Compenents/Header';
import Foter from './Compenents/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';
import { FaAnglesUp } from "react-icons/fa6";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchUserdetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserdetails();
    fetchUserAddToCart();

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Context.Provider value={{
        fetchUserdetails, // user details fetch
        cartProductCount, // current-user add to cart product count list
        fetchUserAddToCart
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-100px)] pt-16'>
          <Outlet />
        </main>
        <Foter />
        {showScrollTop && (
          <div 
            onClick={scrollToTop} 
            className="fixed bottom-4 right-4 p-3 bg-green-500 hover:bg-green-600 text-xl z-50 text-white rounded-full cursor-pointer"
          >
            <FaAnglesUp size={24} />
          </div>
        )}
      </Context.Provider>
    </>
  );
}

export default App;
