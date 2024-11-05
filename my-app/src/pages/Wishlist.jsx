import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/wishlist.css';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import img from '../imgs/Rectangle_2.jpg';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context api/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Wishlist({ wishlistItems, setWishlistItems, setWishlistCount, cartItems, setCartItems, setCartCount }) {
  const { t } = useTranslation();
  const [quantities, setQuantities] = useState({});
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuantities = localStorage.getItem('wishlistQuantities');
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    } else {
      const initialQuantities = wishlistItems.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      localStorage.setItem('wishlistQuantities', JSON.stringify(initialQuantities));
    }
  }, [wishlistItems]);

  const handleDeleteItem = (id) => {
    const updatedWishlistItems = wishlistItems.filter((item) => item.id !== id);
    setWishlistCount(updatedWishlistItems.length);
    setWishlistItems(updatedWishlistItems);

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    localStorage.setItem('wishlistQuantities', JSON.stringify(updatedQuantities));
    setQuantities(updatedQuantities);
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + (quantities[item.id]) } : cartItem
      ));
      toast.success(t('productAlreadyInCart'));
    } else {
      setCartItems([...cartItems, { ...item, quantity: quantities[item.id] }]);
      setCartCount(prev => prev + (quantities[item.id] || 1));
      toast.success(t('addToCartSuccess'));
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} wishlist`}>
      <Container fluid className="p-0 m-0">
        <Row className="g-0">
          <Col>
            <div className='image-container'>
              <img src={img} alt="" />
              <p className='fs-1 image-text'>{t('wishlist')}</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-5 wishlist-item">
        {wishlistItems.length > 0 ? (
          <Row className="align-items-center justify-content-center">
            {wishlistItems.map((item, index) => (
              <Col key={index} sm={12} md={6} lg={3} className="mb-4 p-4">
                <div className="image-wrapper text-center">
                  <img src={item.image_url} alt={item.title} className="slider-img img-fluid rounded-4" />
                  <div className="img-icons">
                    <FaShoppingCart className="icon" onClick={() => addToCart(item)} />
                  </div>
                  <div className="img-text">
                    <p className='categoria'>{item.name1}</p>
                    <p className='img-text-1 fs-5'>{item.name2}</p>
                    <p className='text-white mt-3 fs-5'>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                    <button className='fs-2 mb-4 text-danger d-block ms-auto me-auto text-white remove-button'
                      onClick={() => handleDeleteItem(item.id)}>{t('remove')}</button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <p className='text-center fs-3' style={{ marginTop: '140px' }}>{t('emptyWishlist')}</p>
            <button onClick={() => navigate("/shop")} style={{ padding: '10px', borderRadius: '30px', backgroundColor: 'rgb(255, 111, 0)', border: 'none', marginBottom: '140px', }} className='text-white d-block ms-auto me-auto mt-4 '>{t('continueShopping')}</button>
          </>
        )}
      </Container>
    </div>
  );
}

export default Wishlist;
