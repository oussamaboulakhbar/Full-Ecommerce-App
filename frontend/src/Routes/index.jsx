import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/Allusers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import MyAcount from "../Pages/MyAcount";
const Router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgot-password",
            element:<ForgotPassword/>
        },
        {
            path:"sign-up",
            element:<SignUp/>
        },
        {
            path:"product-category/:CategoryName",
            element:<CategoryProduct/>
        },
        {
            path:"product/:id",
            element:<ProductDetails/>
        },
        {
            path:"Cart",
            element:<Cart/>
        },
        {
            path:"Search",
            element:<SearchProduct/>
        },
        {
            path:"My-Account",
            element:<MyAcount/>
        },
        {
            path : "admin-panel",
            element : <AdminPanel/>,
            children : [
                {
                    path : "all-users",
                    element : <AllUsers/>
                },
                {
                    path : "all-products",
                    element : <AllProducts/>
                }
            ]
        },
    ]
    },
]);
export default Router;