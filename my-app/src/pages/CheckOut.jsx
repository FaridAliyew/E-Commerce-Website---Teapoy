import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../style/checkOut.css';
import { motion } from 'framer-motion';
import { FaRegCircleCheck } from "react-icons/fa6";
import Recommended from '../components/Recommended';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context api/ThemeContext';

function CheckOut({ cartItems, quantities }) {
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [finalPrice, setFinalPrice] = useState();
    const [finalPriceValue, setFinalPriceValue] = useState(false);
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext); 

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        const savedQuantities = localStorage.getItem('quantities');
        if (savedQuantities) {
            const parsedQuantities = JSON.parse(savedQuantities);
            Object.keys(parsedQuantities).forEach((key) => {
                if (!(key in quantities)) {
                    quantities[key] = parsedQuantities[key];
                }
            });
        }
    }, [quantities]);

    useEffect(() => {
        const finalPricee = localStorage.getItem('finalPrice');
        if (finalPricee) {
            setFinalPrice(finalPricee);
            setFinalPriceValue(true);
        }
    }, [finalPriceValue]);

    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);

    const calculateTotal = (cartItems, quantities) => {
        return cartItems.reduce((total, item) => {
            const itemQuantity = quantities[item.id] || 1;
            return total + (item.price * itemQuantity);
        }, 0).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPaymentSuccessful(true);
    };

    return (
        <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} check-out d-flex justify-content-center`}>
            <Row className='w-75 justify-content-between mt-5'>
                {isPaymentSuccessful ? (
                    <>
                        <div className="success-animation text-center" style={{ marginTop: 100 }}>
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                                animate={{ scale: 1, opacity: 1, rotate: 720, color: "#00ff00" }}
                                transition={{
                                    duration: 2,
                                    ease: [0.175, 0.85, 0.42, 0.96],
                                    repeatType: "reverse"
                                }}
                                style={{ color: 'green' }}
                            >
                                <FaRegCircleCheck size={100} />
                            </motion.div>
                            <h3 className='mt-5'>{t('successMessage')}</h3>
                        </div>

                        <Recommended />
                    </>

                ) : (
                    <Col lg={5}>
                        <Form className='form-group' onSubmit={handleSubmit}>
                            <h2 className='text-white text-start mb-3'>{t('contactt')}</h2>
                            <Form.Group controlId="contact">
                                <Form.Control
                                    type="text"
                                    placeholder={t('emailPlaceholder')}
                                    className='rounded-3'
                                    required
                                />
                            </Form.Group>

                            <h2 className="mt-5 text-start text-white mb-3">{t('delivery')}</h2>
                            <Form.Group controlId="country">
                                <Form.Control type="text" placeholder={t('countryPlaceholder')} className='rounded-3' required />
                            </Form.Group>

                            <Row className='mt-3'>
                                <Col>
                                    <Form.Group controlId="firstname">
                                        <Form.Control type="text" placeholder={t('firstNamePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="lastname">
                                        <Form.Control type="text" placeholder={t('lastNamePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="apartment" className='mt-3'>
                                <Form.Control type="text" placeholder={t('apartmentPlaceholder')} className='rounded-3' />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="city" className='mt-3'>
                                        <Form.Control type="text" placeholder={t('cityPlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="state" className='mt-3'>
                                        <Form.Control type="text" placeholder={t('statePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="pincode" className='mt-3'>
                                        <Form.Control type="text" placeholder={t('pinCodePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h2 className="mt-5 text-start text-white mb-3">{t('payment')}</h2>
                            <Form.Group controlId="cardNumber">
                                <Form.Control type="text" placeholder={t('cardNumberPlaceholder')} className='rounded-3' required />
                            </Form.Group>

                            <Row className='mt-3'>
                                <Col>
                                    <Form.Group controlId="expirationDate">
                                        <Form.Control type="text" placeholder={t('expirationDatePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="securityCode">
                                        <Form.Control type="text" placeholder={t('securityCodePlaceholder')} className='rounded-3' required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="nameOnCard" className='mt-3'>
                                <Form.Control type="text" placeholder={t('nameOnCardPlaceholder')} className='rounded-3' required />
                            </Form.Group>

                            <Button className="mt-4 mb-5 w-100" variant="primary" type="submit">
                                {t('payNowButton')}
                            </Button>
                        </Form>
                    </Col>
                )}

                {isPaymentSuccessful ? '' : (
                    <Col lg={5} className='mt-5 mt-lg-0 product'>
                        {cartItems.length > 0 ? (
                            <>
                                {cartItems.map((item, index) => (
                                    <div key={index} className="product-container d-flex justify-content-between align-items-center mb-4 p-3 border rounded-3 w-100">
                                        <div className="d-flex align-items-center">
                                            <div className='main-container'>
                                                {quantities[item.id] > 0 && (
                                                    <div className="quantity-badge text-white">
                                                        {quantities[item.id]}
                                                    </div>
                                                )}
                                                <img src={item.image_url} alt={item.name1} className="img-fluid rounded-3" />
                                            </div>
                                            <div className="ms-3">
                                                <p className='text-white mb-1 ms-auto me-auto product-name'>{item.name2}</p>
                                            </div>
                                        </div>
                                        <p className='text-white fs-6'>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                                    </div>
                                ))}
                                <h4 className='text-white mt-4'>{t('totall')}: ${finalPriceValue ? finalPrice : calculateTotal(cartItems, quantities)}</h4>
                            </>
                        ) : (
                            <h5 className='text-center text-white'>{t('emptyCart')}</h5>
                        )}
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CheckOut;
