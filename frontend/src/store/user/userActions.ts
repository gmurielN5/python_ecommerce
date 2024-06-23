import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login/`,
        {
          username: credentials.email,
          password: credentials.password,
        },
        config
      );
      const { _id, name, username, email, isAdmin, token } = data;
      return { _id, name, username, email, isAdmin, token };
    } catch (error) {
      console.log('error', error.response.data.detail);
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (
    profileData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register/`,
        profileData,
        config
      );
      return data;
    } catch (error) {
      console.log('error register', error);
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    credentials: {
      id: number;
      name: string;
      email: string;
      password: string;
    },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      return rejectWithValue('No user found');
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile/update/`,
        {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        },
        config
      );
      return data;
    } catch (error) {
      console.log('error register', error);
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
