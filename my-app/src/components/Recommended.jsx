import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

function Recommended({ quantity, cartItems, setCartItems, setCartCount, wishlistItems, setWishlistItems, setWishlistCount }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const baseUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_SHOP_KEY;

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

    return (
        <Container fluid className='mt-5 recommended'>
            <Row>
                <h1 className='text-white mt-5 mb-5'>{t('recommendedProducts')}</h1>
            </Row>
            <Swiper
                spaceBetween={20}
                pagination={false}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-wrapper">
                            <img src={item.image_url} alt={item.title} className="img-fluid" />
                        </div>
                        <div className="img-text">
                            <p className='categoria'>{item.name1}</p>
                            <p className='img-text-1 fs-5'>{item.name2}</p>
                            <p className='img-text-1'>{item.price} $</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

export default Recommended;
