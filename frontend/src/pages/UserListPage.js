import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaCheck, FaTimes, FaEllipsisH, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/user.actions';

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        `This will delete, (last 4) ${id.substring(
          id.length - 4,
          id.length
        )}. Are you sure?`
      )
    ) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((member) => (
              <tr key={member._id}>
                <td>{member._id}</td>
                <td>{member.name}</td>
                <td>
                  <a href={`${member.email}`}>{member.email}</a>
                </td>
                <td>
                  {member.isAdmin ? (
                    <IconContext.Provider value={{ color: 'green' }}>
                      <FaCheck />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ color: 'red' }}>
                      <FaTimes />
                    </IconContext.Provider>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${member._id}/edit`}>
                    <Button className='btn-sm'>
                      <FaEllipsisH />
                    </Button>
                  </LinkContainer>
                  &nbsp;
                  <IconContext.Provider
                    value={{ color: 'red', cursor: 'pointer' }}>
                    <Button
                      className='btn-sm'
                      onClick={() => handleDelete(member._id)}>
                      <FaTrash />
                    </Button>
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
