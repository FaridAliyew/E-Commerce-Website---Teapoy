import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { FaCouch, FaArchive, FaCubes, FaTable, FaUtensils, FaImage, FaDesktop, FaBoxes } from 'react-icons/fa';
import '../style/banner.css';
import Sofa from '../imgs/sofa.jpg';
import Cabinet from '../imgs/cabinet.jpg';
import Shelving_Units from '../imgs/Shelving_Units.jpg';
import Tea_Table from '../imgs/Tea_Table.jpg';
import Kitchen_Furniture from '../imgs/Kitchen_Furniture.jpg';
import Decors from '../imgs/Decors.jpg';
import Office_Table from '../imgs/Office_Table.jpg';
import Storage_Furniture from '../imgs/Storage_Furniture.jpg';

function Banner() {
    const { t } = useTranslation(); // Initialize translation
    const [backgroundImage, setBackgroundImage] = useState(Sofa);

    const items = [
        {
            icon: <FaCouch className="icon" />,
            image: Sofa,
            name: t('ITEMS.0.NAME'),
        },
        {
            icon: <FaArchive className="icon" />,
            image: Cabinet,
            name: t('ITEMS.1.NAME'),
        },
        {
            icon: <FaCubes className="icon" />,
            image: Shelving_Units,
            name: t('ITEMS.2.NAME'),
        },
        {
            icon: <FaTable className="icon" />,
            image: Tea_Table,
            name: t('ITEMS.3.NAME'),
        },
        {
            icon: <FaUtensils className="icon" />,
            image: Kitchen_Furniture,
            name: t('ITEMS.4.NAME'),
        },
        {
            icon: <FaImage className="icon" />,
            image: Decors,
            name: t('ITEMS.5.NAME'),
        },
        {
            icon: <FaDesktop className="icon" />,
            image: Office_Table,
            name: t('ITEMS.6.NAME'),
        },
        {
            icon: <FaBoxes className="icon" />,
            image: Storage_Furniture,
            name: t('ITEMS.7.NAME'),
        }
    ];

    const handleMouseEnter = (image) => {
        setBackgroundImage(image);
    };

    const handleMouseLeave = () => {
        setBackgroundImage(Sofa);
    };

    return (
        <Container fluid className="banner-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="overlay"></div>
            <Row className="justify-content-center align-items-center text-center content" style={{ minHeight: '50vh' }}>
                {items.map((item, index) => (
                    <Col xs={6} md={3} className="item" key={index} onMouseEnter={() => handleMouseEnter(item.image)} onMouseLeave={handleMouseLeave}>
                        {item.icon}
                        <h2>{item.name}</h2>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Banner;
