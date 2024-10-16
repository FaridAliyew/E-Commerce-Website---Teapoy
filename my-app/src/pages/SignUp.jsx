// SignUp.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signUp.css';

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Error təmizlənir
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasiya yoxlamaları
        let newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
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

        // Əgər səhvlər varsa, formu submit etmə
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Dataları localStorage-ə qeyd et
        localStorage.setItem('userData', JSON.stringify(formData));

        // Uğurlu qeydiyyat mesajı göstər
        alert('Registration completed successfully!');

        // Sign in səhifəsinə yönləndir
        navigate('/signin');
    };

    return (
        <Container className="signup-container d-flex align-items-center justify-content-center">
            <div className="signup-box p-4">
                <h2 className="text-center mb-3 fs-1">Sign Up</h2>
                <p className="text-center">
                    Already have an account? <Link to={"/signin"} className="signin-link">Sign In</Link>
                </p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Username"
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
                                    placeholder="Email"
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
                                    placeholder="Password"
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
                        CREATE
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SignUp;
