import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container fluid className='bg-black'>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; NutraSite</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
