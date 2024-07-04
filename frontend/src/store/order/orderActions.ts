import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

import { OrderType } from './orderSlice';

export const createOrder = createAsyncThunk(
  'order/createOrder',
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
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id: string, { getState, rejectWithValue }) => {
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
        `${import.meta.env.VITE_API_URL}/orders/${id}/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async (
    credentials: { id: string; details: any; data: any },
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
        `${import.meta.env.VITE_API_URL}/orders/${
          credentials.id
        }/pay/`,
        {
          detail: credentials.details,
          data: credentials.data,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserOrdersList = createAsyncThunk(
  'order/getUserOrdersList',
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
        `${import.meta.env.VITE_API_URL}/orders/myorders/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getOrdersList = createAsyncThunk(
  'order/getOrdersList',
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
        `${import.meta.env.VITE_API_URL}/orders/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deliverOrder = createAsyncThunk(
  'order/deliverOrder',
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
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${
          orderDetails._id
        }/deliver/`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
