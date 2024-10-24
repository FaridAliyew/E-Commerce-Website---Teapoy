import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../imgs/slider-img-2.jpg';
import img3 from '../imgs/slider-img-3.jpg';
import img4 from '../imgs/slider-img-4.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../style/slider.css';

const Slider = () => {
  const { t } = useTranslation();

  return (
    <Carousel fade style={{ position: 'relative', marginTop: '-66px' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption className="caption-center">
          <h4 style={{ color: 'orange' }}>{t('CRAFTSMANSHIP')}</h4>
          <h1>{t('ENJOY_STYLE_AND_COMFORT')}</h1>
          <p style={{ marginTop: "30px" }}>{t('FIRST_SLIDE_DESCRIPTION')}</p>
          <Link to={"/shop"}>{t('SHOP_NOW')}</Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img4}
          alt="Second slide"
        />
        <Carousel.Caption className="caption-center">
          <h4 style={{ color: 'orange' }}>{t('LUXURIOUS_LIFESTYLE')}</h4>
          <h1>{t('BROWSE_LIVING_ROOM_PIECES')}</h1>
          <p style={{ marginTop: "30px" }}>{t('SECOND_SLIDE_DESCRIPTION')}</p>
          <Link to={"/shop"}>{t('SHOP_NOW')}</Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption className="caption-center">
          <h4 style={{ color: 'orange' }}>{t('MASTERPIECE')}</h4>
          <h1>{t('ART_OF_BEAUTIFUL_LIVING')}</h1>
          <p style={{ marginTop: "30px" }}>{t('THIRD_SLIDE_DESCRIPTION')}</p>
          <Link to={"/shop"}>{t('SHOP_NOW')}</Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
