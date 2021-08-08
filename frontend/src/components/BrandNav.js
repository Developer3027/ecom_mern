import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// history.push(`/search/${brand}`);

const BrandNav = ({ history }) => {
  const [brand, setBrand] = useState('');

  const clickSwanson = (e) => {
    setBrand('Swanson');
  };

  const clickNutraBio = (e) => {
    setBrand('NutraBio');
  };

  const clickSan = (e) => {
    setBrand('san');
  };

  const clickBarleans = (e) => {
    setBrand('barleans');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (brand.trim()) {
      console.log(brand);
      history.push(`/search/${brand}`);
      setBrand('');
    } else {
      history.push('/');
    }
  };

  const clickAll = (e) => {
    submitHandler(e);
  };

  return (
    <>
      <h1>
        <span>Only</span> the best
      </h1>
      <Form onSubmit={submitHandler}>
        <Row className='brand-nav-main'>
          <Col>
            <Button
              type='submit'
              className='brand-link'
              onClick={(e) => clickAll}>
              <h4>All</h4>
              <span className='brand-link-active-all'></span>
            </Button>
          </Col>
          <Col className='brand-brands'>
            <Button type='submit' className='brand-link' onClick={clickSwanson}>
              <h4>Swanson</h4>
              <span className='brand-link-active'></span>
            </Button>
            <Button
              type='submit'
              className='brand-link'
              onClick={clickNutraBio}>
              <h4>NutraBio</h4>
              <span className='brand-link-active'></span>
            </Button>
            <Button type='submit' className='brand-link' onClick={clickSan}>
              <h4>San</h4>
              <span className='brand-link-active'></span>
            </Button>
            <Button
              type='submit'
              className='brand-link'
              onClick={clickBarleans}>
              <h4>Barleans</h4>
              <span className='brand-link-active'></span>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BrandNav;
