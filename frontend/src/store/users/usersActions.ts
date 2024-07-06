import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { UserProfileType } from './usersSlice';

import axios from 'axios';

export const getUsersList = createAsyncThunk(
  'users/getUsersList',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('User not authorized');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/`,
      config
    );
    return data;
  }
);

export const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  async (id: number, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('User not authorized');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${id}/`,
      config
    );
    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (userDetails: UserProfileType, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('User not authorized');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/update/${
        userDetails._id
      }/`,
      userDetails,
      config
    );
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('User not authorized');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/delete/${id}/`,
      config
    );
    return id;
  }
);
