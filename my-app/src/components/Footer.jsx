import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaCcDinersClub, FaCcDiscover } from 'react-icons/fa';
import '../style/footer.css'
import { useTranslation } from 'react-i18next';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { ThemeContext } from '../context api/ThemeContext';


function Footer() {
    const { t } = useTranslation();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    return (
        <Container fluid className='footer bg-black p-5 '>
            <Row className='footer-row d-flex justify-content-between'>
                <Col sm={12} xl={2} className='text-sm-center text-xl-start ms-xl-5'>
                    <img src="https://wdt-teapoy.myshopify.com/cdn/shop/files/logo.svg?v=1719825267&width=160" width={150} alt="logo" className='mb-3' />
                    <p className='text-white text-sm-center text-xl-start'>{t('title2')}</p>
                    <div className='mt-4'>
                        <RiTwitterXFill size={24} onClick={() => window.open('https://x.com/', '_blank')} className="social-icon" />
                        <FaFacebook size={24} onClick={() => window.open('https://www.facebook.com', '_blank')} className="social-icon mx-2" />
                        <FiInstagram size={24} onClick={() => window.open('https://www.instagram.com/', '_blank')} className="social-icon " />
                    </div>
                </Col>

                <Col sm={12} md={3} xl={2} className='mt-5 mt-md-5 ms-md-5'>
                    <Link to={'/about'} className='text-decoration-none text-white d-block'>{t('About')}</Link>
                    <Link to={'/faq'} className='text-decoration-none text-white d-block my-3'>{t('Faq')}</Link>
                    <Link to={'/contact'} className='text-decoration-none text-white d-block'>{t('Contact')}</Link>
                    <Link to={'/about'} className='text-decoration-none text-white d-block mt-3'>{t('About')}</Link>
                </Col>

                <Col sm={12} md={3} xl={2} className='mt-5 mt-md-5 '>
                    <Link to={'/contact'} className='text-decoration-none text-white d-block'>{t('Store_Location')}</Link>
                    <Link to={'/collection'} className='text-decoration-none text-white d-block my-3'>{t('Collection')}</Link>
                    <Link to={'/shop'} className='text-decoration-none text-white d-block'>{t('Shop')}</Link>
                    <Link to={'/blog'} className='text-decoration-none text-white d-block mt-3'>{t('Blog')}</Link>
                </Col>

                <Col sm={12} md={3} xl={2} className='mt-5 ms-0 ms-md-5 mt-md-5'>
                    <Link to={'/signin'} className='text-decoration-none text-white d-block'>{t('Login')}</Link>
                    <Button variant="outline-light" className='fs-5 icons' onClick={toggleTheme}>
                        {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
                    </Button>
                </Col>
                <hr className='text-white mt-4' />
            </Row>
            <Row className='mt-3'>
                <Col sm={12} lg={5} >
                    <p className='text-white text-center'>{t('copyright')}</p>

                </Col>
                <Col sm={12} lg={5} className='text-center text-lg-end'>
                    <div>
                        <FaCcVisa className='visa' />
                        <FaCcMastercard className='master' />
                        <FaCcAmex className='amex' />
                        <FaPaypal className='paypal' />
                        <FaCcDinersClub className='dinersClub' />
                        <FaCcDiscover className='discover' />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer