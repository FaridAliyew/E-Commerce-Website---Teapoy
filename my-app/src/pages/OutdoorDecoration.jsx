import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Container, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function OfficeDecoration({ setCartCount, setWishlistCount, setCartItems, setWishlistItems, cartItems, wishlistItems }) {
  const { t } = useTranslation();
  const baseUrl = 'https://xnykiejhjsppxvnmqcev.supabase.co';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/rest/v1/outdoor_decoration?select=*`, {
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response ? err.response.data : err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, apiKey]);

  if (loading) return (
    <div className="spinner-container">
      <Spinner animation="border" variant="white" />
    </div>
  );

  if (error) return <p>Error: {error.message}</p>;

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
      toast.success(t('productAlreadyInCart'));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setCartCount(prev => prev + 1);
      toast.success(t('successAddCart'));
    }
  };

  const handleAddToWishlist = (item) => {
    const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
    if (existingItem) {
      setWishlistItems(wishlistItems.map(wishlistItem =>
        wishlistItem.id === item.id ? { ...wishlistItem, quantity: wishlistItem.quantity + 1 } : wishlistItem
      ));
      toast.success(t('productAlreadyInWishlist'));
    } else {
      setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
      setWishlistCount(prev => prev + 1);
      toast.success(t('successAddWishlist'));
    }
  };


  return (
    <div className="swiper-container">
      <Container>
        <Row>
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="image-wrapper">
                  <img src={item.image_url} alt={item.title} className="slider-img rounded-4" />
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
        </Row>
      </Container>
    </div>
  );
}

export default OfficeDecoration;
