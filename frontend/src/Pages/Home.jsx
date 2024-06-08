import React from 'react'
import CategoryList from '../Compenents/CategoryList'
import BannerProduct from '../Compenents/BannerProduct'
// import HorizontalCardProduct from '../Compenents/HorizontalCardProduct'
import VerticalCardProduct from '../Compenents/VerticalCardProduct'
import ContactUs from '../Compenents/ContactUs'

const Home = () => {
    return (
        <>
            <CategoryList />
            <BannerProduct />
            <VerticalCardProduct id="Home" category={"airpodes"} heading={"Discover our premium selection of Airpodes!"}  />
            <VerticalCardProduct category={"watches"} heading={"Discover our premium selection of Watches!"} />
            <VerticalCardProduct category={"mobiles"} heading={"Discover our premium selection of Mobiles!"} />
            <VerticalCardProduct category={"Mouse"} heading={"Discover our premium selection of Mouse!"} />
            <VerticalCardProduct category={"televisions"} heading={"Check out our Top's Televisions!"} />
            <VerticalCardProduct category={"camera"} heading={"Check out our Top's Camera & Photography!"} />
            <VerticalCardProduct category={"earphones"} heading={"Discover our premium selection of Wired Earphones!"} />
            <VerticalCardProduct category={"speakers"} heading={"Check out our Top's Bluetooth Speakers!"} />
            <VerticalCardProduct category={"refrigerator"} heading={"Check out our Top's Refrigerator!"} />
            <VerticalCardProduct category={"trimmers"} heading={"Discover our premium selection of Trimmers!"} />
            <ContactUs/>

        </>
    )
}

export default Home