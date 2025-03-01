import React, { useState, useEffect } from 'react';
import './style/darkMode.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Slider from './components/Slider';
import Section from './components/Section';
import Banner from './components/Banner';
import Collection from './components/Collection';
import SectionTwo from './components/SectionTwo';
import SliderTwo from './components/SliderTwo';
import Collections from './pages/Collections';
import BLog from './pages/BLog';
import Contact from './pages/Contact';
import About from './pages/About';
import Faq from './pages/Faq';
import Shop from './pages/Shop';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddToCart from './pages/AddToCart';
import HomeDecoration from './pages/HomeDecoration';
import OfficeDecoration from './pages/OfficeDecoration';
import IndoorDecoration from './pages/IndoorDecoration';
import OutdoorDecoration from './pages/OutdoorDecoration';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import CheckOut from './pages/CheckOut';
import AdminLogin from './pages/AdminLogin';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18/i18n';
import ScrollToTopButton from './components/ScrollToTopButton';
import { ThemeProvider } from './context api/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [quantities, setQuantities] = useState({});


    useEffect(() => {
        const storedCartCount = localStorage.getItem('cartCount');
        const storedWishlistCount = localStorage.getItem('wishlistCount');
        const storedCartItems = localStorage.getItem('cartItems');
        const storedWishlistItems = localStorage.getItem('wishlistItems');

        if (storedCartCount) {
            setCartCount(parseInt(storedCartCount, 10));
        }
        if (storedWishlistCount) {
            setWishlistCount(parseInt(storedWishlistCount, 10));
        }
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        if (storedWishlistItems) {
            setWishlistItems(JSON.parse(storedWishlistItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('wishlistCount', wishlistCount);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [cartCount, wishlistCount, cartItems, wishlistItems]);

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider>
                <Header />
                <Navbar
                    cartCount={cartCount}
                    wishlistCount={wishlistCount}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
                <ToastContainer position="bottom-left" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
                <Routes>

                    <Route path="/" element={
                        <>
                            <Slider />
                            <Section />
                            <Banner />
                            <Collection />
                            <SectionTwo />
                            <SliderTwo />
                        </>
                    }>
                        <Route path="/" element={<HomeDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} />} />
                        <Route path="office-decoration" element={<OfficeDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} />} />
                        <Route path="indoor-decoration" element={<IndoorDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} />} />
                        <Route path="outdoor-decoration" element={<OutdoorDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} />} />
                    </Route>

                    <Route path='/collection' element={<Collections />} />
                    <Route path='/shop' element={<Shop setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} />} />
                    <Route path='/blog' element={<BLog />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/faq' element={<Faq />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />

                    <Route path='/addtocart' element={
                        <AddToCart
                            quantities={quantities}
                            setQuantities={setQuantities}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            setCartCount={setCartCount}
                            isAuthenticated={isAuthenticated}
                        />
                    } />

                    <Route path='/wishlist' element={<Wishlist
                        wishlistItems={wishlistItems}
                        setWishlistItems={setWishlistItems}
                        setWishlistCount={setWishlistCount}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        setCartCount={setCartCount}
                        quantities={quantities}
                        setQuantities={setQuantities}
                    />} />

                    <Route path='/admin' element={<AdminLogin setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />

                    <Route path="/product/:id" element={
                        <ProductDetail setCartCount={setCartCount} setCartItems={setCartItems} setWishlistCount={setWishlistCount} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} quantities={quantities} setQuantities={setQuantities} isAuthenticated={isAuthenticated} />
                    } />
                    <Route path='checkout' element={<CheckOut cartItems={cartItems} quantities={quantities} />} />
                    <Route path="/other" element={<div>Other page</div>} />
                </Routes>
                <ScrollToTopButton />
                <Footer />
                <SpeedInsights />
            </ThemeProvider>
        </I18nextProvider>
    );
}

export default App;
