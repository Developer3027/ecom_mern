import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaEllipsisH, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import Message from '../components/Message';
import Loader from '../components/Loader';
import actionTypes from '../action_types/action.types';
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../actions/products.actions';

const ProductListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const delProduct = useSelector((state) => state.delProduct);
  const {
    loading: loadingDel,
    error: errorDel,
    success: successDel
  } = delProduct;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: actionTypes.PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDel,
    successCreate,
    createdProduct,
    pageNumber
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        `This will delete, (last 4) ${id.substring(
          id.length - 4,
          id.length
        )}. Are you sure?`
      )
    ) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            Add Product
          </Button>
        </Col>
      </Row>

      {loadingDel && <Loader />}
      {errorDel && <Message variant='danger'>{errorDel}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                      <Button className='btn-sm'>
                        <FaEllipsisH />
                      </Button>
                    </LinkContainer>
                    &nbsp;
                    <IconContext.Provider
                      value={{ color: 'red', cursor: 'pointer' }}>
                      <Button
                        className='btn-sm'
                        onClick={() => handleDelete(item._id)}>
                        <FaTrash />
                      </Button>
                    </IconContext.Provider>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
