import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { TbBus } from "react-icons/tb";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import '../style/productDetail.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context api/ThemeContext';

function ProductDetail({ setCartCount, setWishlistCount, setCartItems, setWishlistItems, cartItems, wishlistItems, setQuantities, isAuthenticated }) {
    const { id } = useParams();
    const { t } = useTranslation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);

    const baseUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_SHOP_KEY;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUrl}/rest/v1/all_imgs?id=eq.${id}`, {
                    headers: {
                        apikey: apiKey,
                        Authorization: `Bearer ${apiKey}`
                    }
                });
                setProduct(response.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            ));
            toast.success(t('productAlreadyInCart'));
        } else {
            setCartItems([...cartItems, { ...item, quantity }]);
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

    const handleQuantityChange = (id, change) => {
        setQuantity(prev => Math.max(1, prev + change));
        setQuantities((prev) => {
            const newQuantity = Math.max(1, (prev[id] || 1) + change);
            const updatedQuantities = {
                ...prev,
                [id]: newQuantity,
            };
            localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
            return updatedQuantities;
        });
    };

    const success = () => {
        if (isAuthenticated) {
            handleAddToCart(product);
            navigate('/checkout');
        } else {
            navigate('/signin');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <Container className='product-detail'>
                <Row>
                    {product && (
                        <>
                            <Col md={6} className='my-5'>
                                <img src={product.image_url} width={550} className='rounded-4 img-fluid' alt={product.name2} />
                            </Col>
                            <Col md={6} className='my-5'>
                                <p className='text-white text-start fs-1'>{product.name2}</p>
                                <div className='text-warning'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />
                                </div>
                                <p className='text-white text-start mt-3 fs-2'>${product.price}</p>
                                <p className='text-start text-secondary'>{t('product_description')}</p>
                                <b className='text-white fs-5 categories'>{t('categories')}: </b>
                                <span className='text-secondary text-start'>{product.name1}</span> <br />
                                <TbBus className='fs-2 text-secondary mt-4 me-2' /> <span className='text-secondary' style={{ position: 'relative', top: '12px' }}>{t('estimate_delivery')}</span> <br />
                                <LuShoppingBag className='fs-2 text-secondary mt-3 me-2' /> <span className='text-secondary' style={{ position: 'relative', top: '12px' }}>{t('free_return')}</span>

                                {product.stock_status === 'in stock' && (
                                    <div className='d-flex align-items-center mt-4'>
                                        <Button variant='black' className='border-warning text-white decrement' onClick={() => handleQuantityChange(product.id, -1)}>-</Button>
                                        <span className='mx-3 fs-3 text-white'>{quantity}</span>
                                        <Button variant='black' className='border-warning text-white increment' onClick={() => handleQuantityChange(product.id, 1)}>+</Button>
                                        <Button variant="black" className='ms-3 w-75 border-warning text-white add-to-cart' onClick={() => handleAddToCart(product)}>{t('add_to_cart')}</Button>
                                        <AiOutlineHeart className='ms-2 fs-2 text-danger' onClick={() => handleAddToWishlist(product)} style={{ cursor: 'pointer' }} />
                                    </div>
                                )}

                                {product.stock_status === 'in stock' && (
                                    <>
                                        <Button variant="warning" onClick={success} className='mt-4 w-100 text-decoration-none text-black d-block by-now p-2 rounded-3'>{t('buy_now')}</Button>
                                        <p className='text-white mt-3 fs-5'>{t('sub_total')}: ${(product.price * quantity).toFixed(2)}</p>
                                    </>
                                )}
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetail;
