import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
export default function Footer() {
    return (
        <footer className="bg-black  text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Company</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Our Product</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Mouse</a></li>
                            <li><a href="#" className="hover:underline">TV</a></li>
                            <li><a href="#" className="hover:underline">Earphones</a></li>
                            <li><a href="#" className="hover:underline">Mobile</a></li>
                            <li><a href="#" className="hover:underline">Printers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Other Product</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Scanners</a></li>
                            <li><a href="#" className="hover:underline">Trimmers</a></li>
                            <li><a href="#" className="hover:underline">Watches</a></li>
                            <li><a href="#" className="hover:underline">Speskers</a></li>
                            <li><a href="#" className="hover:underline">Camera</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Legal</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Licensing</a></li>
                            <li><a href="#" className="hover:underline">Terms &amp; Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Information</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">Albandox-Ecommerce-App</a></li>
                            <li><a href="#" className="hover:underline">Ecommerce@gmail.com</a></li>
                            <li><a href="#" className="hover:underline">Morocco</a></li>
                            <li className="flex items-center">
                                <a href="#" className="hover:underline mr-2 text-green-600"><FaPhone /></a>
                                <span>+212 69086156</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center ">
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-blue-600"><BsFacebook /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-blue-600"><BsInstagram /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-blue-600"><BsTwitter /></a>
                    <a href="#" className="text-gray-400 text-2xl mr-4 hover:text-blue-600"><BsGithub /></a>
                    <a href="#" className="text-gray-400 text-2xl hover:text-blue-600"><BsDribbble /></a>
                </div>
                <div className="text-gray-400 text-center mt-8">
                    &copy; {new Date().getFullYear()} Ecommerce App. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
