import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

export const getUsersList = createAsyncThunk(
  'users/getUsersList',
  async (_, { getState, rejectWithValue }) => {
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/`,
        config
      );
      console.log('data', data);
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
