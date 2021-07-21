import React from 'react';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';

import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand href='/'>NutraSite</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/cart'>
              <FaShoppingCart className='me-2' />
              Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <FaUserAlt className='me-2' />
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
