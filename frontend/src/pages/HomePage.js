import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import ProductHorizontal from '../components/ProductHorizontal';
import { listProducts } from '../actions/products.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container fluid className='center-flex'>
          <Row>
            {products.map((product) => (
              <Col className='center-flex' key={product._id}>
                <ProductHorizontal product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomePage;
