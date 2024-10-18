import React, { useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18next-in import edilməsi
import '../style/collection.css';

function Collection() {
  const { t } = useTranslation(); // Tercüməni əldə etmək
  const [selectedDecoration, setSelectedDecoration] = useState(t('HOME_DECORATION'));
  return (
    <Container className="collection-container">
      <Row className="justify-content-center text-center">
        <Col>
          <h6>{t('EXPLORE_OUR')}</h6>
          <h1>{t('LUXURIOUS_HAVEN_COLLECTION')}</h1>

          {/* Mobil modda dropdown */}
          <div className="d-block d-sm-none mt-5 fs-4">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle-custom">
                {selectedDecoration}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item as={NavLink} to="/" onClick={()=>setSelectedDecoration(t('HOME_DECORATION'))}>
                  {t('HOME_DECORATION')}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="office-decoration" onClick={()=>setSelectedDecoration(t('OFFICE_DECORATION'))}>
                  {t('OFFICE_DECORATION')}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="indoor-decoration" onClick={()=>setSelectedDecoration(t('INDOOR_DECORATION'))}>
                  {t('INDOOR_DECORATION')}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="outdoor-decoration" onClick={()=>setSelectedDecoration(t('OUTDOOR_DECORATION'))}>
                  {t('OUTDOOR_DECORATION')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Böyük ekranlar üçün linklər */}
          <div className="link-container mt-5 fs-4 d-none d-sm-block">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('HOME_DECORATION')}
            </NavLink>
            <NavLink to="office-decoration" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('OFFICE_DECORATION')}
            </NavLink>
            <NavLink to="indoor-decoration" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('INDOOR_DECORATION')}
            </NavLink>
            <NavLink to="outdoor-decoration" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('OUTDOOR_DECORATION')}
            </NavLink>
          </div>

          {/* Burada Outlet məlumatların dinamik göstərilməsi üçündür */}
          <div className="mt-5">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Collection;
