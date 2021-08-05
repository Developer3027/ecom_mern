import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

const ProductHorizontal = ({ product }) => {
  const { _id, image, name, price, description } = product;
  return (
    <Card
      className='p-1 mb-4 rounded bg-light-grey'
      style={{ width: '345px', height: '250px' }}>
      <Row className='g-0'>
        <Col className='card-image-col' style={{ maxWidth: '115px' }}>
          <Link to={`/product/${_id}`}>
            <Card.Img src={image} className='mb-1' />
          </Link>
          <Card.Title as='h6' className='text-center p-1 drk-txt'>
            <strong>{name}</strong>
          </Card.Title>
          <Card.Text as='h4' className='text-center drk-txt'>
            ${price}
          </Card.Text>
        </Col>
        <Col className='card-image-col'>
          <Link to={`/product/${_id}`}>
            <Card.Text className='m-1 p-2 drk-txt bg-white rounded'>
              {description}
            </Card.Text>
          </Link>
          <Button className='mt-2'>Buy Now</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductHorizontal;
