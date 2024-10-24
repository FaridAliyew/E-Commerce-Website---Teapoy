import React, { useContext } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import img from '../imgs/Rectangle_2.jpg';
import faq from '../imgs/faq.jpg';
import { useTranslation } from 'react-i18next'; 
import { ThemeContext } from '../components/ThemeContext';
import '../style/faq.css';

function Faq() {
    const { t } = useTranslation(); 
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <>
            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-0 m-0`}>
                <Row className="g-0">
                    <Col>
                        <div className='image-container'>
                            <img src={img} alt="" />
                            <p className='image-text'>{t('faqTitle')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} faq-container`}>
                <div className='d-flex justify-content-center ms-5'>
                    <Row>
                        <Col sm={12} md={6} className='text-white faqs'>
                            <h6 className='ms-3'>{t('productsAndService')}</h6>
                            <h1 className='ms-3'>{t('productsAndService')}</h1>
                            <Accordion defaultActiveKey="0" className='mt-4'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{t('faqQuestion0')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer0')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion1')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer1')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion2')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer2')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion3')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer3')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion4')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer4')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion5')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer5')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="6" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion6')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer6')}</Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="7" className='mt-4'>
                                    <Accordion.Header>{t('faqQuestion7')}</Accordion.Header>
                                    <Accordion.Body>{t('faqAnswer7')}</Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col sm={12} md={6} className='mt-5 mt-md-0'>
                            <div>
                                <div className='text-white ms-5 contact-us'>
                                    <h4>{t('contactUs')}</h4>
                                    <p className='mt-4 text-white-50 fw-bold'>{t('contactAddress')}</p>
                                    <p className='text-white-50 fw-bold'>{t('contactPhone')}</p>
                                </div>
                                <img src={faq} width={600} className='img-fluid faq-furniture' alt="faq-furniture" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Faq;
