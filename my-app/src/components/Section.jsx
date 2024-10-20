import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '../imgs/img-1.jpg';
import img2 from '../imgs/img-2.jpg';
import { GoCheck } from "react-icons/go";
import '../style/section.css';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './ThemeContext';

function Section() {
    const { isDarkMode } = useContext(ThemeContext); // ThemeContext-dən istifadə
    const { t } = useTranslation();

    return (
        <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} section p-5`}>
            <Row className='section-row d-flex g-md-5'>
                <Col sm={12} md={6} className='container-1'>
                    <h6 className='text-orange'>{t('SECTION_TITLE')}</h6>
                    <h1 className='text-white'>{t('SECTION_SUBTITLE')}</h1>
                    <p className='text-light mt-4 mb-5'>{t('SECTION_DESCRIPTION_1')}</p>
                    <img src={img1} className='img-fluid rounded-3' alt="furniture-one" />
                </Col>

                <Col sm={12} md={6} className='container-2'>
                    <img src={img2} className='img-fluid rounded-3' alt="furniture-two" />
                    <h1 className='text-white mt-2'>{t('SECTION_DISCOVER_TITLE')}</h1>
                    <p className='text-light mt-4 mb-5'>{t('SECTION_DESCRIPTION_2')}</p>
                    <div>
                        <p className='text-light'><GoCheck className='check-icon' /> {t('SECTION_CHECK_ITEM_1')}</p>
                        <p className='text-light'><GoCheck className='check-icon' /> {t('SECTION_CHECK_ITEM_2')}</p>
                        <p className='text-light'><GoCheck className='check-icon' /> {t('SECTION_CHECK_ITEM_3')}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Section;
