const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    userLogout: {
        url: `${backendDomin}/api/userLogout`,
        method: "get"
    },
    AllUser: {
        url: `${backendDomin}/api/all-users`,
        method: "get"
    },
    UpdateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    allproduct: {
        url: `${backendDomin}/api/get-product`,
        method: "get"
    },
    updateproduct: {
        url: `${backendDomin}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-Product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartViewProduct: {
        url: `${backendDomin}/api/view-cart-product`,
        method: "get"
    },
    updateAddToCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: "post"
    },
    deleteAddToCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: "post"
    },
}
export default SummaryApi