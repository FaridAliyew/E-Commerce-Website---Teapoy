import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from 'react-i18next';
import '../style/header.css'; 

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  return (
    <Container fluid>
      <Row className="p-3 bg-black">
        <Col xs={4} className="d-flex align-items-center justify-content-start gap-3">
          <RiTwitterXFill size={24} onClick={() => window.open('https://x.com/', '_blank')} className="social-icon" />
          <FaFacebook size={24} onClick={() => window.open('https://www.facebook.com', '_blank')} className="social-icon" />
          <FiInstagram size={24} onClick={() => window.open('https://www.instagram.com/', '_blank')} className="social-icon" />
        </Col>

        <Col xs={4} className="d-flex align-items-center justify-content-center">
          <div className="marquee_annoucement">
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement1')}
              </p>
            </div>
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement2')}
              </p>
            </div>
            <div className="announcement-bar" role="region" aria-label="Announcement">
              <p className="announcement-bar__message">
                {t('announcement3')}
              </p>
            </div>
          </div>
        </Col>

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
                currentLanguage !== lang && (
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
