import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { TbBus } from "react-icons/tb";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";


function ProductDetail() {
    const { id } = useParams(); // URL-dən məhsul ID-sini alın
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/all_imgs?id=eq.${id}`, {
                    headers: {
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY`
                    }
                });
                setProduct(response.data[0]); // Məhsul məlumatını təyin edin
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const increment = () => {
        setQuantity(quantity + 1); // Counter artır
    };

    const decrement = () => {
        if (quantity > 1) { // Minimum 1 olmalıdır
            setQuantity(quantity - 1); // Counter azald
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container className='mt-5'>
            <Row className="">
                {product && (
                    <>
                        <Col md={6}>
                            <img src={product.image_url} width={550} className='rounded-4 img-fluid' alt={product.name2} />
                        </Col>
                        <Col md={6} className=''>
                            <p className='text-white text-start fs-1'>{product.name2}</p>
                            <div className='text-warning'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                            </div>
                            <p className='text-white text-start mt-3 fs-2'>${product.price}</p>
                            <p className='text-start text-secondary'>Vestibulum dapibus ultrices arcu, id varius mauris viverra ac. Aliquam erat volutpat. Pellentesque commodo ut elit at gravida. Nunc ac molestie turpis. san, fermentum condimentum ligula.</p>
                            <b className='text-white fs-5'>Vendor: </b>
                            <span className='text-secondary text-start'>{product.name1}</span> <br />
                            <TbBus className='fs-2 text-secondary mt-4 me-2' /> <span className='text-secondary' style={{ position: 'relative', top: '12px' }}>Estimate delivery times:12-26 days (International)</span> <br />
                            <LuShoppingBag className='fs-2 text-secondary mt-3 me-2' /> <span className='text-secondary' style={{ position: 'relative', top: '12px' }}>Free return within 30 days of purchase.$79</span>

                            <div className='d-flex align-items-center mt-4'>
                                <Button variant='black' className='border-warning text-white' onClick={decrement}>-</Button>
                                <span className='mx-3 fs-3 text-white'>{quantity}</span>
                                <Button variant='black'className='border-warning text-white' onClick={increment}>+</Button>
                                <Button variant="black" className='ms-3 w-75 border-warning text-white'>Add to Cart</Button>
                                <AiOutlineHeart className='ms-2 fs-2 text-white' /> {/* Wishlist icon */}
                            </div>

                            <Button variant="warning" className='mt-4 w-100'>Buy it now</Button>
                            <p className='text-white mt-3 fs-5'>Sub total: ${((product.price || 0) * quantity).toFixed(2)}</p> {/* Yekun məbləğ */}
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    );
}

export default ProductDetail;
