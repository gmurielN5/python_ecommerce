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

import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Container>
      <Typography component="h1" variant="h5">
        Users
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ADMIN</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UsersListPage;
