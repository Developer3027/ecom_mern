import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import ProductHorizontal from '../components/ProductHorizontal';
import { listProducts } from '../actions/products.actions';
import Meta from '../components/Meta';
import BrandNav from '../components/BrandNav';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';

//* <Col className='center-flex' sm={12} md={6} lg={4} xl={3} w/key>

const HomePage = ({ match, history }) => {
  const keyword = match.params.keyword;
  const brand = match.params.brand;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, brand, pageNumber));
  }, [dispatch, keyword, brand, pageNumber]);

  return (
    <>
      <Route render={({ history }) => <BrandNav history={history} />} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta />
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
            brand={brand ? brand : ''}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
