import { useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { login } from '../store/user/userActions';

import { Link, useLocation, Navigate } from 'react-router-dom';

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const location = useLocation();

  const redirect = location.state?.from?.pathname || '/';

  const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      {user && <Navigate to={redirect} replace={true} />}
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      {error && (
        <Message severity="error">
          <>{error}</>
        </Message>
      )}
      {loading && <Loader />}
      <form onSubmit={(e) => handleLogin(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ mb: 2 }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container justifyContent="flex-end">
        <Grid item>
          New Customer?{' '}
          <Link
            to={
              redirect
                ? `/register?redirect=${redirect}`
                : '/register'
            }
          >
            Register
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LoginPage;
