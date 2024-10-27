import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signUp.css';
import { ThemeContext } from '../context api/ThemeContext';
import { useTranslation } from 'react-i18next';

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (/[^a-zA-Z_]/.test(formData.username)) {
            newErrors.username = 'Username must contain only letters and underscores';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        existingUsers.push(formData);

        localStorage.setItem('users', JSON.stringify(existingUsers));

        navigate('/signin');
    };


    return (
        <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} signup-container d-flex align-items-center justify-content-center`}>
            <div className="signup-box p-4">
                <h2 className="text-center mb-3 fs-1">{t('SIGN_UP')}</h2>
                <p className="text-center">
                    {t('already_have_account')} <Link to={"/signin"} className="signin-link">{t('SIGN_IN')}</Link>
                </p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder={t('USERNAME')}
                                    className={`form-input ${errors.username && 'is-invalid'}`}
                                    onChange={handleInputChange}
                                />
                                {errors.username && (
                                    <div className="text-danger mb-3">{errors.username}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder={t('EMAIL_ADDRESS')}
                                    className={`form-input ${errors.email && 'is-invalid'}`}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <div className="text-danger mb-3">{errors.email}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder={t('PASSWORD')}
                                    className={`form-input ${errors.password && 'is-invalid'}`}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <div className="text-danger">{errors.password}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="create-btn mt-3 d-block ms-auto me-auto">
                        {t('create')}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SignUp;
