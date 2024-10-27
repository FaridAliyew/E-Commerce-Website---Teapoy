import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ThemeContext } from '../context api/ThemeContext';
import AdminPanel from './AdminPanel';

function AdminLogin() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isAdmin');
    const username = localStorage.getItem('username');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    if (username === 'admin') {
      setAdmin(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === 'admin' && formData.password === 'admin') {
      setErrorMessage('');
      setIsLoggedIn(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      setErrorMessage('No such user exists.');
    }
  };

  return (
    <>
      {admin ? <AdminPanel /> : (!isLoggedIn ? (
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} d-flex justify-content-center align-items-center`} >
          <Form onSubmit={handleSubmit} className="w-25 admin-login" style={{ margin: '130px 130px' }}>
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
      ) : <AdminPanel setIsLoggedIn={setIsLoggedIn} />)}
    </>
  );
}

export default AdminLogin;
