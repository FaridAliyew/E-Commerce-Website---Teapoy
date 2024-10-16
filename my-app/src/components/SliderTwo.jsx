import React from 'react';
import { Container, Row, Carousel } from 'react-bootstrap';
import img1 from '../imgs/profileImg_1.jpg';
import img2 from '../imgs/profileImg_2.jpg';
import img3 from '../imgs/profileImg_3.jpg';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import '../style/sliderTwo.css';
import { useTranslation } from 'react-i18next';

function SliderTwo() {
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <Row>
                    <div className='slider-two text-center mb-5'>
                        <h6>{t('CUSTOMER_COMMENTS')}</h6>
                        <h1 className='text-white'>{t('WORDS_FROM_CUSTOMERS')}</h1>
                    </div>
                </Row>
            </Container>

            <Carousel className='main-carusel'>
                <Carousel.Item>
                    <div className="carousel-content text-center w-75 ms-auto me-auto">
                        <div className='mb-4 text-warning'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <p className='fs-3 text-white'>
                            {t('COMMENT_1')}
                        </p>
                        <img
                            className="d-block mx-auto"
                            src={img1}
                            alt="Profile"
                        />
                        <h5 className='text-white'>{t('CUSTOMER_NAME_1')}</h5>
                        <p className='text-secondary'>{t('COUNTRY_1')}</p>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="carousel-content text-center w-75 ms-auto me-auto">
                        <div className='mb-4 text-warning'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <p className='fs-3 text-white'>
                            {t('COMMENT_2')}
                        </p>
                        <img
                            className="d-block mx-auto"
                            src={img2}
                            alt="Profile"
                        />
                        <h5 className='text-white'>{t('CUSTOMER_NAME_2')}</h5>
                        <p className='text-secondary'>{t('COUNTRY_2')}</p>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="carousel-content text-center w-75 ms-auto me-auto">
                        <div className='mb-4 text-warning'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <p className='fs-3 text-white'>
                            {t('COMMENT_3')}
                        </p>
                        <img
                            className="d-block mx-auto"
                            src={img3}
                            alt="Profile"
                        />
                        <h5 className='text-white'>{t('CUSTOMER_NAME_3')}</h5>
                        <p className='text-secondary'>{t('COUNTRY_3')}</p>
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default SliderTwo;
