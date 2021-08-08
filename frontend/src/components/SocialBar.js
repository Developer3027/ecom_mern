import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const SocialBar = () => {
  return (
    <Container>
      <Nav className='justify-content-between'>
        <Nav.Item className='center-number'>
          <span>1(888)555-2365</span>
        </Nav.Item>
        <div className='justify-content-end'>
          <a href='https://www.facebook.com/NutraSite-114894313670593'>
            <IconContext.Provider value={{ size: '2em' }}>
              <FaFacebookSquare className='icon' />
            </IconContext.Provider>
          </a>
          <a href='https://www.facebook.com/NutraSite-114894313670593'>
            <IconContext.Provider value={{ size: '2em' }}>
              <FaInstagram className='icon' />
            </IconContext.Provider>
          </a>
          <a href='https://www.facebook.com/NutraSite-114894313670593'>
            <IconContext.Provider value={{ size: '2em' }}>
              <FaTwitterSquare className='icon' />
            </IconContext.Provider>
          </a>
        </div>
      </Nav>
    </Container>
  );
};

export default SocialBar;
