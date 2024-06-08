import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [submitCount, setSubmitCount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitCount === 0) {
            toast.info("Your message is sending");
        } else if (submitCount >= 1) {
            toast.error("You have already sent the message");
        }
        setSubmitCount(submitCount + 1);
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                <div className="w-16 h-1 bg-red-600"></div>
            </div>
            <div className="flex justify-center items-center p-4">
                <div className="w-full lg:w-[1200px] bg-white p-20 m-2 rounded-lg shadow-xl flex flex-col lg:flex-row">
                    {/* Contact Information */}
                    <div className="lg:w-1/2 pr-8">
                        <h2 className="text-3xl font-bold text-orange-400 mb-4">Contact Us</h2>
                        <p className="mb-4">Ecommerce@gmail.com</p>
                        <p className="mb-4">Albandox-Ecommerce-App</p>
                        <p className="mb-4">Morooco </p>
                        <p className="mb-4 flex items-center"><a href="#" className="hover:underline mr-2 text-green-500"><FaPhone /></a>
                                <span>+212 69087156</span></p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-violet-600 text-xl"><FaFacebookF /></a>
                            <a href="#" className="text-gray-600 hover:text-violet-600 text-xl"><FaTwitter /></a>
                            <a href="#" className="text-gray-600 hover:text-violet-600 text-xl"><FaInstagram /></a>
                            <a href="#" className="text-gray-600 hover:text-violet-600 text-xl"><FaGooglePlusG /></a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-1/2 pl-8 mt-8 lg:mt-0">
                        <p className="mb-4 font-bold text-lg">Send a message for contacting with us:</p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Enter a valid email address"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                            <textarea
                                placeholder="Enter your message"
                                className="w-full p-2 border border-gray-300 rounded-lg h-24"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                            >
                                submit
                            </button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default ContactUs;
