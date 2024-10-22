import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';

function AdminLogin({setIsLoggedIn}) {
  const { isDarkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage(''); // Form dəyişdiyində səhv mesajını təmizləyir
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasiya
    if (formData.username === 'admin' && formData.password === 'admin') {
      setErrorMessage('');
      setIsLoggedIn(true)
      navigate('/adminpanel');
    } else {
      setErrorMessage('No such user exists.');
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} d-flex justify-content-center align-items-center`} >
      <Form onSubmit={handleSubmit} className="w-25 admin-login" style={{margin:'130px 130px'}}>
        <h3 className="text-center mb-3 text-white">Admin Login</h3>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
