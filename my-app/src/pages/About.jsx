import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import img from '../imgs/Rectangle_2.jpg';
import { GoCheck } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import img1 from '../imgs/about-1.jpg'
import img2 from '../imgs/about-2.jpg'
import team1 from '../imgs/Team-1.jpg';
import team2 from '../imgs/Team-2.jpg';
import team3 from '../imgs/Team-3.jpg';
import team4 from '../imgs/Team-4.jpg';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context api/ThemeContext';
import '../style/about.css'


function About() {
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-0 m-0`}>
                <Row className="g-0">
                    <Col>
                        <div className='image-container'>
                            <img src={img} alt="" />
                            <p className='image-text'>{t('about')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} about-section p-5`}>
                <Row className='section-row d-flex g-md-5'>
                    <Col sm={12} md={6} className='container-1'>
                        <h6 className='text-orange'>{t('weDesign')}</h6>
                        <h1 className='text-white'>{t('eliteFurniture')}</h1>
                        <p className='text-light mt-4 mb-5'>{t('description1')}</p>
                        <img src={img2} className='img-fluid rounded-3' alt="furniture-one" />
                    </Col>

                    <Col sm={12} md={6} className='container-2'>
                        <img src={img1} className='img-fluid rounded-3' alt="furniture-two" />
                        <h1 className='text-white mt-2'>{t('craftingFineFurniture')}</h1>
                        <p className='text-light mt-4 mb-5'>{t('description2')}</p>
                        <div className='icons'>
                            <p className='text-light'><GoCheck className='check-icon' /> {t('feature1')}</p>
                            <p className='text-light'><GoCheck className='check-icon' /> {t('feature2')}</p>
                            <p className='text-light'><GoCheck className='check-icon' /> {t('feature3')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} team`}>
                <Row>
                    <div className='text-center mb-5 text-group'>
                        <h6>{t('comfortCrafters')}</h6>
                        <h1 className='text-white'>{t('ourBestTeam')}</h1>
                    </div>
                    <Col sm={12} md={6} lg={3} className='team-col-1'>
                        <div className="col">
                            <img src={team1} className='img-fluid rounded-4' alt="Petro Ago" />
                            <h4>Petro Ago</h4>
                            <p>{t('ceo')}</p>
                            <div className="social-icons">
                                <a href="https://x.com/" target='_blank'><FaXTwitter /></a>
                                <a href="https://www.facebook.com" target='_blank'><FaFacebook /></a>
                                <a href="https://www.youtube.com/" target='_blank'><FaYoutube /></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={3} className='team-col-2'>
                        <div className="col">
                            <img src={team2} className='img-fluid rounded-4' alt="Nyssa Carina" />
                            <h4>Nyssa Carina</h4>
                            <p>{t('Designer')}</p>
                            <div className="social-icons">
                                <a href="https://x.com/" target='_blank'><FaXTwitter /></a>
                                <a href="https://www.facebook.com" target='_blank'><FaFacebook /></a>
                                <a href="https://www.youtube.com/" target='_blank'><FaYoutube /></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={3} className='team-col-3'>
                        <div className="col">
                            <img src={team3} className='img-fluid rounded-4' alt="Meshulam Rudi" />
                            <h4>Meshulam Rudi</h4>
                            <p>{t('Marketing')}</p>
                            <div className="social-icons">
                                <a href="https://x.com/" target='_blank'><FaXTwitter /></a>
                                <a href="https://www.facebook.com" target='_blank'><FaFacebook /></a>
                                <a href="https://www.youtube.com/" target='_blank'><FaYoutube /></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={3} className='mb-5 team-col-4'>
                        <div className="col">
                            <img src={team4} className='img-fluid rounded-4' alt="Berach Ingram" />
                            <h4>Berach Ingram</h4>
                            <p>{t('Customer Support')}</p>
                            <div className="social-icons">
                                <a href="https://x.com/" target='_blank'><FaXTwitter /></a>
                                <a href="https://www.facebook.com" target='_blank'><FaFacebook /></a>
                                <a href="https://www.youtube.com/" target='_blank'><FaYoutube /></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About