import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaCcDinersClub, FaCcDiscover } from 'react-icons/fa';

import '../style/footer.css'


function Footer() {
    return (

        <Container fluid className='footer mt-5 bg-black p-5'>
            <Row className='footer-row'>
                <Col sm={12} xl={3} className='text-sm-center text-xl-start'>
                    <img src="https://wdt-teapoy.myshopify.com/cdn/shop/files/logo.svg?v=1719825267&width=160" width={150} alt="logo" className='mb-3' />
                    <p className='text-white'>Donec elementum aliquet dui, ut feugiat est vulputate quis. Etiam egestas nulla nec odio posuere, ut porta tortor pretiumt.</p>
                    <div className='mt-4'>
                        <RiTwitterXFill size={24} className="social-icon" />
                        <FaFacebook size={24} className="social-icon ms-2" />
                        <FiInstagram size={24} className="social-icon ms-2" />
                    </div>
                </Col>

                <Col sm={12} md={4} xl={3} className='mt-5 mt-md-4'>
                    <h2 className='text-white text-start mb-3'>About</h2>
                    <ul>
                        <li>History</li>
                        <li>Our Team</li>
                        <li>Privacy Policy</li>
                        <li>Services Offered</li>
                        <li>Product Catalog</li>
                    </ul>
                </Col>

                <Col sm={12} md={4} xl={3}>
                    <h2 className='text-white text-start mb-3 mt-md-4'>Information</h2>
                    <ul>
                        <li>Store Location</li>
                        <li>Order Tracking</li>
                        <li>Affiliate</li>
                        <li>Sizing Guide</li>
                        <li>Accessibility</li>
                    </ul>
                </Col>

                <Col sm={12} md={4} xl={3}>
                    <h2 className='text-white text-start mb-3 mt-md-4'>Support</h2>
                    <ul>
                        <li>Your Account</li>
                        <li>Press Release</li>
                        <li>Return Centre</li>
                        <li>App Download</li>
                        <li>Advertisements</li>
                    </ul>
                </Col>
                <hr className='text-white mt-4' />
            </Row>
            <Row className='mt-3'>
                <Col sm={12} lg={5} className='text-center'>
                    <p className='text-white'>All Right Reserved © 2024 Wedesigntech Pvt Ltd</p>

                </Col>
                <Col sm={12} lg={5} className='text-center text-lg-end'>
                    <div>
                        <FaCcVisa style={{ color: 'white', fontSize: '30px' }} /> {/* Visa - Blue */}
                        <FaCcMastercard style={{ color: '#EB001B', fontSize: '30px' }} /> {/* Mastercard - Red */}
                        <FaCcAmex style={{ color: '#2DAAE1', fontSize: '30px' }} /> {/* American Express - Bright Blue */}
                        <FaPaypal style={{ color: '#253B80', fontSize: '30px' }} /> {/* PayPal - Deep Blue */}
                        <FaCcDinersClub style={{ color: '#0079BE', fontSize: '30px' }} /> {/* Diners Club - Bright Blue */}
                        <FaCcDiscover style={{ color: '#86B8E3', fontSize: '30px' }} /> {/* Discover - Light Blue */}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer