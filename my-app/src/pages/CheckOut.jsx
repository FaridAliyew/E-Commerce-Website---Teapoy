import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../style/checkOut.css';

function CheckOut({ cartItems, quantities }) {
    // Local storage-dan quantities oxumaq
    useEffect(() => {
        const savedQuantities = localStorage.getItem('quantities');
        if (savedQuantities) {
            const parsedQuantities = JSON.parse(savedQuantities);
            // props olan quantities-i localStorage-dan gətirilmiş dəyərlərlə yeniləyirik
            Object.keys(parsedQuantities).forEach((key) => {
                if (!(key in quantities)) {
                    quantities[key] = parsedQuantities[key];
                }
            });
        }
    }, [quantities]);

    // Quantities-i local storage-a yazırıq
    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);

    // Total qiyməti hesablamaq
    const calculateTotal = (cartItems, quantities) => {
        return cartItems.reduce((total, item) => {
            const itemQuantity = quantities[item.id] || 1;
            return total + (item.price * itemQuantity);
        }, 0).toFixed(2);
    };

    return (
        <Container fluid className='mt-5 check-out d-flex justify-content-center'>
            <Row className=' w-75 justify-content-between'>
                <Col lg={5} >
                    <Form className='form-group'>
                        <h2 className='text-white text-start mb-3'>Contact</h2>
                        <Form.Group controlId="contact">
                            <Form.Control
                                type="text"
                                placeholder="Email or mobile phone number"
                            />
                        </Form.Group>

                        <h2 className="mt-5 text-start text-white mb-3">Delivery</h2>
                        <Form.Group controlId="country">
                            <Form.Control type="text" placeholder='Country/Region' />
                        </Form.Group>

                        <Row className='mt-3'>
                            <Col>
                                <Form.Group controlId="firstname">
                                    <Form.Control type="text" placeholder='First Name' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="lastname">
                                    <Form.Control type="text" placeholder='Last Name' />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="apartment" className='mt-3'>
                            <Form.Control type="text" placeholder='Apartment, suite, etc. (optional)' />
                        </Form.Group>

                        <Form.Group controlId="city" className='mt-3'>
                            <Form.Control type="text" placeholder='City' />
                        </Form.Group>

                        <Form.Group controlId="state" className='mt-3'>
                            <Form.Control type="text" placeholder='State' />
                        </Form.Group>

                        <Form.Group controlId="pincode" className='mt-3'>
                            <Form.Control type="text" placeholder='PIN code' />
                        </Form.Group>

                        <h2 className="mt-5 text-start text-white mb-3">Payment</h2>
                        <Form.Group controlId="cardNumber">
                            <Form.Control type="text" placeholder='Card Number' />
                        </Form.Group>

                        <Row className='mt-3'>
                            <Col>
                                <Form.Group controlId="expirationDate">
                                    <Form.Control type="text" placeholder='Expiration Date (MM / YY)' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="securityCode">
                                    <Form.Control type="text" placeholder='Security Code' />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="nameOnCard" className='mt-3'>
                            <Form.Control type="text" placeholder='Name on Card' />
                        </Form.Group>

                        <Button className="mt-4 w-100" variant="primary" type="submit">
                            Pay Now
                        </Button>
                    </Form>
                </Col>

                {/* Sağ tərəfdə səbətə əlavə edilmiş məhsullar */}
                <Col lg={5} className='mt-5 mt-lg-0'>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={index} className="product-container d-flex justify-content-between align-items-center mb-4 p-3 border rounded-3 w-100">
                                    <div className="d-flex align-items-center">
                                        <div className='main-container'>
                                            {quantities[item.id] > 0 && (
                                                <div className="quantity-badge text-white">
                                                    {quantities[item.id]}
                                                </div>
                                            )}
                                            <img src={item.image_url} alt={item.name1} className="img-fluid rounded-3" />
                                        </div>
                                        <div className="ms-3">
                                            <p className='text-white mb-1 ms-auto me-auto product-name'>{item.name2}</p>
                                        </div>
                                    </div>
                                    <p className='text-white fs-6'>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                                </div>
                            ))}
                            <h4 className='text-white mt-4'>Total: ${calculateTotal(cartItems, quantities)}</h4>
                        </>
                    ) : (
                        <h5 className='text-center text-white'>Your Cart is Empty</h5>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default CheckOut;
