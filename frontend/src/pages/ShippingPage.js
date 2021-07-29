import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/formContainer';
import { saveShippingAddress } from '../actions/cart.actions';

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, zipCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label className='my-2'>Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label className='my-2'>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='zipCode'>
          <Form.Label className='my-2'>Zip Code</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter Zip Code'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label className='my-2'>Country</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter the Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button className='my-2' type='submit' variant='primary'>
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
