import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../imgs/Rectangle_2.jpg';
import '../style/collections.css';
import img1 from '../imgs/shop-1.jpg';
import img2 from '../imgs/shop-2.jpg';
import img3 from '../imgs/shop-3.jpg';
import img4 from '../imgs/shop-4.jpg';
import { useTranslation } from 'react-i18next';

function Collections() {
    const { t } = useTranslation();

    return (
        <>
            <Container fluid className="p-0 m-0">
                <Row className="g-0">
                    <Col>
                        <div className='image-container'>
                            <img src={img} alt="" />
                            <p className='image-text'>{t('ALL_COLLECTIONS')}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="g-0 p-5 mt-5">
                    <Col sm={12} md={6} lg={3}>
                        <img src={img4} className='img-fluid rounded-3' width={300} alt="shopImg1" />
                        <Link to={"/shop"} className='text-center text-white mt-2 fs-3 d-block text-decoration-none'>{t('HOME_DECORATION')}</Link>
                        <p className='text-center text-white fs-5'>{t('ITEM_COUNT', { count: 5 })}</p>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <img src={img3} className='img-fluid rounded-3' width={300} alt="shopImg2" />
                        <Link to={"/shop"} className='text-center text-white mt-2 fs-3 d-block text-decoration-none'>{t('INDOOR_DECORATION')}</Link>
                        <p className='text-center text-white fs-5'>{t('ITEM_COUNT', { count: 5 })}</p>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <img src={img2} className='img-fluid rounded-3' width={300} alt="shopImg3" />
                        <Link to={"/shop"} className='text-center text-white mt-2 fs-3 d-block text-decoration-none'>{t('OFFICE_DECORATION')}</Link>
                        <p className='text-center text-white fs-5'>{t('ITEM_COUNT', { count: 4 })}</p>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <img src={img1} className='img-fluid rounded-3' width={300} alt="shopImg4" />
                        <Link to={"/shop"} className='text-center text-white mt-2 fs-3 d-block text-decoration-none'>{t('OUTDOOR_DECORATION')}</Link>
                        <p className='text-center text-white fs-5'>{t('ITEM_COUNT', { count: 4 })}</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Collections;
