import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

import {
  CartItemsType,
  ShippingAddressType,
} from '../cart/cartSlice';

import { OrderType } from './orderSlice';

type OrderArgs = {
  orderItems: CartItemsType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export const createOrder = createAsyncThunk<
  OrderType,
  OrderArgs,
  { rejectValue: string }
>(
  'order/createOrder',
  async (orderDetails: OrderArgs, { getState, rejectWithValue }) => {
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
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || 'Unknown error occurred'
        );
      }
    }
  }
);

export const getOrderDetails = createAsyncThunk<
  OrderType,
  number,
  { rejectValue: string }
>(
  'order/getOrderDetails',
  async (id: number, { getState, rejectWithValue }) => {
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
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || 'Unknown error occurred'
        );
      }
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async (
    credentials: { id: number; details: any; data: any },
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
      `${import.meta.env.VITE_API_URL}/orders/${credentials.id}/pay/`,
      {
        detail: credentials.details,
        data: credentials.data,
      },
      config
    );
    return data;
  }
);

export const getUserOrdersList = createAsyncThunk(
  'order/getUserOrdersList',
  async (_, { getState }) => {
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
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/myorders/`,
      config
    );
    return data;
  }
);

export const getOrdersList = createAsyncThunk(
  'order/getOrdersList',
  async (_, { getState }) => {
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
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/`,
      config
    );
    return data;
  }
);

export const deliverOrder = createAsyncThunk(
  'order/deliverOrder',
  async (orderDetails: OrderType, { getState }) => {
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
      `${import.meta.env.VITE_API_URL}/orders/${
        orderDetails._id
      }/deliver/`,
      {},
      config
    );
    return data;
  }
);
