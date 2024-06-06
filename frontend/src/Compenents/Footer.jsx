import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Company</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Promotion</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Our Product</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Discord Server</a></li>
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Other Product</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">iOS</a></li>
                            <li><a href="#" className="hover:underline">Android</a></li>
                            <li><a href="#" className="hover:underline">Windows</a></li>
                            <li><a href="#" className="hover:underline">MacOS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Legal</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Licensing</a></li>
                            <li><a href="#" className="hover:underline">Terms &amp; Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Information</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Albandox-Ecommerce-App</a></li>
                            <li><a href="#" className="hover:underline">Ecommerce@gmail.com</a></li>
                            <li><a href="#" className="hover:underline">United Kingdom</a></li>
                            <li className="flex items-center">
                                <a href="#" className="hover:underline mr-2 text-green-500"><FaPhone /></a>
                                <span>+234 190876156</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center ">
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-red-500"><BsFacebook /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-red-500"><BsInstagram /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-red-500"><BsTwitter /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-red-500"><BsGithub /></a>
                    <a href="#" className="text-gray-400 text-2xl hover:text-red-500"><BsDribbble /></a>
                </div>
                <div className="text-gray-400 text-center mt-8">
                    &copy; {new Date().getFullYear()} Ecommerce App. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
