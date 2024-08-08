import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  getUserProfile,
  updateUserProfile,
} from '../store/users/usersActions';
import {
  selectUserProfile,
  selectUsersLoading,
  selectUsersError,
} from '../store/users/usersSlice';

import { Form, Button } from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

type Params = {
  id: string;
};

const UserEditPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams<Params>();

  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectUserProfile);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    if (!userProfile || userProfile._id !== Number(id)) {
      dispatch(getUserProfile(Number(id)));
    } else {
      setName(userProfile.name);
      setUsername(userProfile.username);
      setIsAdmin(userProfile.isAdmin);
    }
  }, [dispatch, userProfile, id]);

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        _id: Number(userProfile?._id),
        name,
        username,
        isAdmin,
      })
    );
  };

  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <h1>Edit User</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UserEditPage;
