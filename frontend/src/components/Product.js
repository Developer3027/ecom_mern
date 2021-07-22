import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from './Rating';

const Product = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>

          <Card.Text as='div'>
            <Rating value={rating} text={`${numReviews} reviews`} />
          </Card.Text>
          <Card.Text as='h3'>${price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
