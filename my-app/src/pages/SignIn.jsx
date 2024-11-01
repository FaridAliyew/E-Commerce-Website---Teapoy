import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signIn.css';
import { ThemeContext } from '../context api/ThemeContext';
import { useTranslation } from 'react-i18next';

function SignIn({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('users'))

        let newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const user = storedUsers.find(user => user.email === formData.email && user.password === formData.password);
        console.log(user)

        if (user) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', user.username); 
            localStorage.setItem('email', user.email); 
            localStorage.setItem('usernamee', user.username); 
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} signin-container`}>
            <div className="signin-box">
                <h2>{t('SIGN_IN')}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder={t('EMAIL_ADDRESS')}
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
                            placeholder={t('PASSWORD')}
                            className={`form-input ${errors.password && 'is-invalid'}`}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <div className="text-danger text-start">{errors.password}</div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="signin-btn">
                        {t('SIGN_IN')}
                    </Button>
                </Form>
                <div className="signup-link">
                    {t(`DON'T_HAVE_ACCOUNT`)} <Link to="/signup">{t('SIGN_UP')}</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
