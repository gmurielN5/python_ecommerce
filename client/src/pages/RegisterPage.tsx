import React, { useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { Link, useLocation, Navigate } from 'react-router-dom';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { register } from '../store/user/userActions';

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const location = useLocation();

  const redirect = location.state?.from?.pathname || '/';

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
      setMessage('');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      {user && <Navigate to="/" replace={true} />}
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Register
      </Typography>

      {message && (
        <Message severity="error">
          <p>{message}</p>
        </Message>
      )}
      {error && (
        <Message severity="error">
          <p>{error}</p>
        </Message>
      )}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
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
            <TextField
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container justifyContent="flex-end">
        <Grid item>
          Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            Sign In
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
