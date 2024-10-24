import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Recommended({ quantity, cartItems, setCartItems, setCartCount, wishlistItems, setWishlistItems, setWishlistCount }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'https://xnykiejhjsppxvnmqcev.supabase.co';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY'; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/rest/v1/all_imgs?select=*`, {
                    headers: {
                        apikey: apiKey,
                        Authorization: `Bearer ${apiKey}`
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl, apiKey]);

    const handleAddToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity }]);
            setCartCount(prev => prev + 1);
            toast.success('Successfully added to cart!'); 
        }
    };

    const handleAddToWishlist = (item) => {
        const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
        if (existingItem) {
            setWishlistItems(wishlistItems.map(wishlistItem =>
                wishlistItem.id === item.id ? { ...wishlistItem, quantity: wishlistItem.quantity + 1 } : wishlistItem
            ));
        } else {
            setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
            setWishlistCount(prev => prev + 1);
            toast.success('Successfully added to wishlist!');
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container fluid className='mt-5 p-5 recommended'>
            <Row>
                <h1 className='text-white mt-5 mb-5'>Recommended Products</h1>
            </Row>
            <Swiper
                spaceBetween={20}
                pagination={false}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-wrapper">
                            <img src={item.image_url} alt={item.title} className="slider-img" />
                            <div className="img-icons">
                                <FaHeart className="icon" onClick={() => handleAddToWishlist(item)} />
                                <FaShoppingCart className="icon" onClick={() => handleAddToCart(item)} />
                            </div>
                        </div>
                        <div className="img-text">
                            <p className='categoria'>{item.name1}</p>
                            <p className='img-text-1 fs-5'>{item.name2}</p>
                            <p className='img-text-1'>{item.price} $</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

export default Recommended;
