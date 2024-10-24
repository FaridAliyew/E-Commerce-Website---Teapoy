import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import img from '../imgs/Rectangle_2.jpg';
import '../style/shop.css';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../components/ThemeContext';

function Shop({ setCartCount, setWishlistCount, setCartItems, setWishlistItems, cartItems, wishlistItems }) {
    const { t } = useTranslation();
    const baseUrl = 'https://xnykiejhjsppxvnmqcev.supabase.co';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY'; 

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ inStock: false, outOfStock: false });
    const [filteredData, setFilteredData] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [searchTerm, setSearchTerm] = useState(''); 
    const { isDarkMode } = useContext(ThemeContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/rest/v1/all_imgs?select=*`, {
                    headers: {
                        apikey: apiKey,
                        Authorization: `Bearer ${apiKey}`
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl, apiKey]);

    useEffect(() => {
        let filtered = data.filter(item => {
            const itemPrice = parseFloat(item.price);
            const withinPriceRange = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
            const isInStock = filter.inStock && item.stock_status === 'in stock';
            const isOutOfStock = filter.outOfStock && item.stock_status === 'out of stock';
            const matchesSearch = item.name2.toLowerCase().startsWith(searchTerm.toLowerCase());
    
            return (
                withinPriceRange &&
                (selectedBrand === '' || item.name1 === selectedBrand) &&
                (isInStock || isOutOfStock || (!filter.inStock && !filter.outOfStock)) &&
                matchesSearch
            );
        });
    
        switch (sortOrder) {
            case 'A-Z':
                filtered.sort((a, b) => a.name2.localeCompare(b.name2));
                break;
            case 'Z-A':
                filtered.sort((a, b) => b.name2.localeCompare(a.name2));
                break;
            case 'Price-Low-High':
                filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'Price-High-Low':
                filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            default:
                break;
        }
    
        setFilteredData(filtered);
    }, [data, filter, priceRange, selectedBrand, sortOrder, searchTerm]);
    
    useEffect(() => {
        window.scrollTo(0,0);
      
    }, [])

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    if (error) return <p>Error: {error.message}</p>;

    const handleAddToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            setCartCount(prev => prev + 1);
            toast.success(t('successAddCart'));
        }
    };

    const handleAddToWishlist = (item) => {
        const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
        if (existingItem) {
            setWishlistItems(wishlistItems.map(wishlistItem =>
                wishlistItem.id === item.id ? { ...wishlistItem, quantity: wishlistItem.quantity + 1 } : wishlistItem
            ));
        } else {
            setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
            setWishlistCount(prev => prev + 1);
            toast.success(t('successAddWishlist'));
        }

    };

    const handleFilterChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked
        });
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setPriceRange([priceRange[0], value]);
    };

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <>
            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-0 m-0`}>
                <Row className="g-0">
                    <Col>
                        <div className='image-container'>
                            <img src={img} alt="" />
                            <p className='image-text'>{t('products')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} shop-container`}>
                <Row>
                    <Col lg={3} className='shop-col mt-5'>
                        <div style={{ position: 'sticky', top: '80px' }}>
                            <h2 className='fs-2 text-white p-4'>Filter:</h2>
                            <Form className="ps-4 pt-4">
                                <h5 className="text-white mb-3">{t('availability')}</h5>
                                <Form.Check
                                    type="checkbox"
                                    id="inStock"
                                    label={t('inStock')}
                                    name="inStock"
                                    checked={filter.inStock}
                                    onChange={handleFilterChange}
                                    className='text-white' />
                                <Form.Check
                                    type="checkbox"
                                    id="outOfStock"
                                    label={t('outOfStock')}
                                    name="outOfStock"
                                    checked={filter.outOfStock}
                                    onChange={handleFilterChange}
                                    className='text-white' />

                                <h5 className="text-white mt-5">{t('price')}</h5>
                                <p className="text-white">{t('highestPrice')} $ {priceRange[1].toLocaleString('en-US')}</p>
                                <input
                                    type="range"
                                    className="slider"
                                    min="10"
                                    max="300"
                                    value={priceRange[1]}
                                    onChange={handlePriceChange}
                                    style={{ width: '100%', accentColor: 'orange' }}
                                />
                                <div className="d-flex justify-content-between">
                                    <span className="text-white">$ {priceRange[0].toLocaleString('en-US')}</span>
                                    <span className="text-white">$ {priceRange[1].toLocaleString('en-US')}</span>
                                </div>
                            </Form>

                            <h5 className="text-white p-4 mt-4">{t('brand')}</h5>
                            <div className='ps-2'>
                                {['HOME DECORATION', 'INDOOR DECORATION', 'OFFICE DECORATION', 'OUTDOOR DECORATION'].map(brand => (
                                    <Button style={{ fontSize: '13px' }}
                                        key={brand}
                                        variant="outline-light"
                                        className="mb-3 me-3 rounded-4 border border-white"
                                        onClick={() => handleBrandClick(brand)}>
                                        {brand}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Col>

                    <Col lg={9} style={{ padding: '80px' }} className='shop-col-2 mt-5'>
                        <div className="d-flex justify-content-between  align-items-center mb-4">
                            <Form.Control
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                style={{ width: '200px', backgroundColor: '#101010', color: 'white' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-3 border-1 search-input"
                            />
                            <Form.Select
                                aria-label="Default select example"
                                style={{ width: '150px', backgroundColor: '#101010' }}
                                className='rounded-3 border-1 text-white drop-down'
                                onChange={handleSortChange}
                                defaultValue="A-Z">
                                 <option value="A-Z">{t('aToZ')}</option>
                                <option value="Z-A">{t('zToA')}</option>
                                <option value="Price-Low-High">{t('priceLowToHigh')}</option>
                                <option value="Price-High-Low">{t('priceHighToLow')}</option>
                            </Form.Select>
                        </div>

                        <Row>
                            {filteredData.map((item) => (
                                <Col lg={4} md={6} sm={12} key={item.id} className='shop-col-3'>
                                    <div className="image-wrapper">
                                        <Link to={`/product/${item.id}`}> 
                                            <img src={item.image_url} alt={item.title} className="slider-img img-fluid w-100 rounded-4" />
                                        </Link>
                                        <div className="img-icons">
                                            <FaHeart className="icon" onClick={() => handleAddToWishlist(item)} />
                                            <FaShoppingCart className="icon" onClick={() => handleAddToCart(item)} />
                                        </div>
                                    </div>
                                    <div className="img-text mt-3 mb-5">
                                        <p className='categoria'>{item.name1}</p>
                                        <p className='img-text-1 fs-5'>{item.name2}</p>
                                        <p className='img-text-1'>${item.price}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Shop;
