import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; 
import { ThemeContext } from './ThemeContext';
import img from '../imgs/Rectangle_2.jpg';
import img2 from '../imgs/Frame_1.png';
import img3 from '../imgs/Frame_2.png';
import img4 from '../imgs/Frame_3.png';
import img5 from '../imgs/Frame_4.png';
import img6 from '../imgs/Frame_5.png';
import img7 from '../imgs/Frame_6.png';
import '../style/sectionTwo.css';

function SectionTwo() {
    const { t } = useTranslation(); 
    const { isDarkMode } = useContext(ThemeContext); 

    return (
        <>
            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <Row>
                    <div className='moving-list-container'>
                        <ul className="moving-list">
                            <div>
                                <img width={30} src="https://wdt-teapoy.myshopify.com/cdn/shop/files/marquee_icon_dc329c34-c962-4b3a-85de-f432c888a143.svg?v=1719912196&width=1920" alt="logo" />
                                <li>{t('FIND_YOUR_DREAM_FURNITURE')}</li>
                            </div>
                            <div>
                                <img width={30} src="https://wdt-teapoy.myshopify.com/cdn/shop/files/marquee_icon_dc329c34-c962-4b3a-85de-f432c888a143.svg?v=1719912196&width=1920" alt="logo" />
                                <li>{t('LUXURIOUS_COMFORT')}</li>
                            </div>
                            <div>
                                <img width={30} src="https://wdt-teapoy.myshopify.com/cdn/shop/files/marquee_icon_dc329c34-c962-4b3a-85de-f432c888a143.svg?v=1719912196&width=1920" alt="logo" />
                                <li>{t('REVAMP_YOUR_HOME')}</li>
                            </div>
                            <div>
                                <img width={30} src="https://wdt-teapoy.myshopify.com/cdn/shop/files/marquee_icon_dc329c34-c962-4b3a-85de-f432c888a143.svg?v=1719912196&width=1920" alt="logo" />
                                <li>{t('LUXURIOUS_COMFORT')}</li>
                            </div>
                        </ul>
                    </div>
                </Row>
            </Container>

            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'}  multicolumn-list p-5`}>
                <Row className='mt-5 multirow'>
                    <Col sm={12} lg={6}>
                        <h6>{t('SLEEK_AND_STYLISH')}</h6>
                        <h1 className='text-white'>{t('STYLISH_FURNITURE_DESIGNS')}</h1>
                    </Col>
                    <Col sm={12} lg={6}>
                        <p className='mt-4'>{t('DESCRIPTION')}</p>
                    </Col>
                    <img src={img} alt="Furniture" className='img-fluid mt-4 rounded-5 w-100' />
                </Row>

                <Row className="justify-content-center mt-5">
                    <Col sm={6} lg={4} xl={3} className="image-col">
                        <div className="img-container">
                            <img src={img2} alt="" />
                            <p className='text-center mt-2'>{t('HOME_FRAGRANCES')}</p>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} xl={3} className="image-col">
                        <div className="img-container">
                            <img src={img3} alt="" />
                            <p className='text-center mt-2'>{t('GARDEN_DECOR')}</p>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} xl={3} className="image-col">
                        <div className="img-container">
                            <img src={img4} alt="" />
                            <p className='text-center mt-2'>{t('CANDLE_HOLDERS')}</p>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} xl={3} className="image-col">
                        <div className="img-container">
                            <img src={img5} alt="" />
                            <p className='text-center mt-2'>{t('FURNITURE_ACCESSORIES')}</p>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} xl={6} className="image-col">
                        <div className="img-container">
                            <img src={img6} alt="" />
                            <p className='text-center mt-2'>{t('STORAGE_SOLUTIONS')}</p>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} xl={6} className="image-col">
                        <div className="img-container">
                            <img src={img7} alt="" />
                            <p className='text-center mt-2'>{t('SEASONAL_DECOR')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SectionTwo;
