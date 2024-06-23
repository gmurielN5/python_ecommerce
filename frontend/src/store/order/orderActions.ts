import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

import { OrderType } from './orderSlice';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderDetails: OrderType, { getState, rejectWithValue }) => {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/add/`,
        orderDetails,
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
