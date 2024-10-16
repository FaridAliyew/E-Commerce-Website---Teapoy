import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signIn.css';

function SignIn({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Xətaları təmizləyir
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        // Validasiya yoxlamaları
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        // Əgər səhvlər varsa, formu submit etmə
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Yoxlama: email və password uyğun gəlirmi?
        if (storedUserData && formData.email === storedUserData.email && formData.password === storedUserData.password) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true'); // Auth məlumatını localStorage-ə qeyd edir
            navigate('/');
        } else {
            alert('Invalid credentials'); // Yanlış məlumat varsa xəbərdarlıq
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`form-input ${errors.email && 'is-invalid'}`}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <div className="text-danger mb-3 text-start">{errors.email}</div>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={`form-input ${errors.password && 'is-invalid'}`}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <div className="text-danger text-start">{errors.password}</div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="signin-btn">
                        SIGN IN
                    </Button>
                </Form>
                <div className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
