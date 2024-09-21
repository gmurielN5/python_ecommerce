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

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

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
    <Container>
      <Link to="/admin/userlist">Go Back</Link>
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          Edit User
        </Typography>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">
            <>{error}</>
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="username"
                  label="Email Address"
                  name="username"
                  placeholder="Enter Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Is Admin"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        )}
      </Container>
    </Container>
  );
};

export default UserEditPage;
