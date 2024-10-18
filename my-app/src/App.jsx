import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import AdminPanel from './pages/AdminPanel';
// import './i18n';
import ProductDetail from './pages/ProductDetail';
import CheckOut from './pages/CheckOut';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]); // Yeni wishlist state
    const [quantities, setQuantities] = useState({}); //Add to cartdakı sayğac
    const [isLoggedIn, setIsLoggedIn] = useState(false); // İstifadəçi girişi statusu


    // Səhifə açıldığında localStorage-dan cartCount, wishlistCount və cartItems-u yüklə
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

    // cartCount, wishlistCount və cartItems dəyişdikcə localStorage-a yaz
    useEffect(() => {
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('wishlistCount', wishlistCount);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [cartCount, wishlistCount, cartItems, wishlistItems]);

    return (
        <>
            <I18nextProvider i18n={i18n}>

                <Header />
                <Navbar
                    cartCount={cartCount}
                    wishlistCount={wishlistCount}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
                <ToastContainer position="bottom-left" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
                <Routes>
                    {/* Ana səhifə */}
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
                        <Route path="/" element={<HomeDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} />} />
                        <Route path="office-decoration" element={<OfficeDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} />} />
                        <Route path="indoor-decoration" element={<IndoorDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} />} />
                        <Route path="outdoor-decoration" element={<OutdoorDecoration setCartCount={setCartCount} setWishlistCount={setWishlistCount} setCartItems={setCartItems} setWishlistItems={setWishlistItems} />} />
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
                            setCartCount={setCartCount} // yeni əlavə
                        />
                    } />

                    <Route path='/wishlist' element={<Wishlist
                        wishlistItems={wishlistItems}
                        setWishlistItems={setWishlistItems}
                        setWishlistCount={setWishlistCount}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        setCartCount={setCartCount}
                    />} />

                    <Route path='/admin' element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />

                    <Route
                        path="/adminpanel"
                        element={isLoggedIn ? <AdminPanel /> : <Navigate to="*" />}
                    />

                    <Route path="*" element={<NotFound />} />

                    <Route path="/product/:id" element={<ProductDetail setCartCount={setCartCount} setCartItems={setCartItems} setWishlistCount={setWishlistCount} setWishlistItems={setWishlistItems} cartItems={cartItems} wishlistItems={wishlistItems} quantities={quantities}  setQuantities={setQuantities}/>} />

                    <Route path='checkout' element={<CheckOut cartItems={cartItems} quantities={quantities} />} />

                    {/* Digər səhifələr */}
                    <Route path="/other" element={<div>Other page</div>} />
                </Routes>
                <ScrollToTopButton/>
                <Footer />
            </I18nextProvider>
        </>
    );
}

export default App;
