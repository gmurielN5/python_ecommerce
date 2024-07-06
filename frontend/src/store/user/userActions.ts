import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

import { UserType } from './userSlice';

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  name: string;
} & LoginArgs;

export const login = createAsyncThunk<
  UserType,
  LoginArgs,
  { rejectValue: string }
>(
  'user/login',
  async ({ email, password }: LoginArgs, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const info = { username: email, password: password };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login/`,
        info,
        config
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || 'Unknown error occurred'
        );
      }
    }
  }
);

export const register = createAsyncThunk<
  UserType,
  RegisterArgs,
  { rejectValue: string }
>(
  'user/register',
  async (
    { name, email, password }: RegisterArgs,
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
        {
          name,
          email,
          password,
        },
        config
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || 'Unknown error occurred'
        );
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
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('No user found');
    }

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
  }
);
