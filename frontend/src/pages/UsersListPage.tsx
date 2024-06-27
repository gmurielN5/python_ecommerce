import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  getUsersList,
  deleteUser,
} from '../store/users/usersActions';
import {
  selectUsersList,
  selectUsersLoading,
  selectUsersError,
} from '../store/users/usersSlice';

import { Table, Button } from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const UsersListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const deleteHandler = (id: number): void => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
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
            {usersList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check"
                      style={{ color: 'green' }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-check"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>

                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsersListPage;
