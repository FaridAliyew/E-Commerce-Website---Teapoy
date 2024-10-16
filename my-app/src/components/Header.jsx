import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from 'react-i18next';
import '../style/header.css'; // CSS faylını import edin

function Header() {
  const { t, i18n } = useTranslation();

  // Dil dəyişmək funksiyası
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Seçili dilin kodunu əldə et
  const currentLanguage = i18n.language;

  return (
    <Container fluid>
      <Row className="p-3 bg-black">
        {/* Sosial Media İkonları */}
        <Col xs={4} className="d-flex align-items-center justify-content-start gap-3">
          <RiTwitterXFill size={24} className="social-icon" />
          <FaFacebook size={24} className="social-icon" />
          <FiInstagram size={24} className="social-icon" />
        </Col>

        {/* Mətn - Mərkəz */}
        <Col xs={4} className="d-flex align-items-center justify-content-center">
          <div className="marquee_annoucement">
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement1')}
                {/* <span>
                  <a href="/" className="announcement-bar__link text-white">
                    {t('shopSale')}
                  </a>
                </span> */}
              </p>
            </div>
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement2')}
                {/* <span>
                  <a href="/" className="announcement-bar__link text-white">
                    {t('shopSale')}
                  </a>
                </span> */}
              </p>
            </div>
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement3')}
                {/* <span>
                  <a href="/" className="announcement-bar__link text-white">
                    {t('shopSale')}
                  </a>
                </span> */}
              </p>
            </div>
          </div>
        </Col>

        {/* Dropdown Menü - Sağ */}
        <Col xs={4} className="d-flex align-items-center justify-content-end gap-3">
          <Dropdown>
            <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
              <ReactCountryFlag 
                countryCode={currentLanguage === 'az' ? 'AZ' : currentLanguage === 'ru' ? 'RU' : 'GB'} 
                svg 
                style={{ marginRight: '10px' }} 
              />
              {currentLanguage === 'az' ? 'Az' : currentLanguage === 'ru' ? 'Rus' : 'En'}
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu text-end">
              {['az', 'ru', 'en'].map((lang) => (
                currentLanguage !== lang && ( // Yalnız seçilməmiş dilləri göstər
                  <Dropdown.Item 
                    onClick={() => changeLanguage(lang)} 
                    key={lang}
                  >
                    <ReactCountryFlag 
                      countryCode={lang === 'az' ? 'AZ' : lang === 'ru' ? 'RU' : 'GB'} 
                      svg 
                      style={{ marginRight: '10px' }} 
                    />
                    {lang === 'az' ? 'Az' : lang === 'ru' ? 'Rus' : 'En'}
                  </Dropdown.Item>
                )
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
