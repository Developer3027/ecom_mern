import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import ProductHorizontal from '../components/ProductHorizontal';
import { listProducts } from '../actions/products.actions';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';

//* <Col sm={12} md={6} lg={4} xl={3} w/key>

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Container fluid className='center-flex'>
            <Row>
              {products.map((product) => (
                <Col className='center-flex' key={product._id}>
                  <ProductHorizontal product={product} />
                </Col>
              ))}
            </Row>
          </Container>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
