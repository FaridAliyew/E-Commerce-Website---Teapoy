import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; 
import { ThemeContext } from '../context api/ThemeContext';
import '../style/contact.css';

function Contact() {
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <Container className={`${isDarkMode ? 'dark-mode' : 'light-mode'} contact-container`}>
                <Row className="text-center">
                    <Col>
                        <h6 className="text-note mt-5">{t('contact.textNote')}</h6>
                        <h1 className="contact-title">{t('contact.title')}</h1>
                        <p className="contact-description">
                            {t('contact.description')}
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={8}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Control type="text" placeholder={t('contact.namePlaceholder')} required />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className='mt-2 mt-md-0'>
                                    <Form.Group controlId="formCall">
                                        <Form.Control type="text" placeholder={t('contact.callPlaceholder')} required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formEmail" className='mt-2'>
                                <Form.Control type="email" placeholder={t('contact.emailPlaceholder')} required />
                            </Form.Group>
                            <Form.Group controlId="formComment" className='mt-2'>
                                <Form.Control as="textarea" rows={4} placeholder={t('contact.commentPlaceholder')} required />
                            </Form.Group>
                            <div className="text-center mt-4">
                                <Button className="submit-btn" variant="warning" type="submit">
                                    {t('contact.submitButton')}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row className="mt-5">
                    <Col>
                        <div className="map-container">
                            <iframe 
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093706!2d144.9537363155047!3d-37.81627917975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5779f0e7e02b4a3!2sFederation+Square!5e0!3m2!1sen!2sau!4v1552176372537"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;
