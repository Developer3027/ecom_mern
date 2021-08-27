import React from 'react';
import {} from 'react-icons';
import { Nav } from 'react-bootstrap';

const DashSideNav = () => {
  return (
    <Nav variant='tabs' className='flex-column' defaultActiveKey='/home'>
      <Nav.Item>
        <Nav.Link href='/home'>Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-1'>Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='disabled' disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default DashSideNav;
