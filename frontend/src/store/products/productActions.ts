import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const productsList = createAsyncThunk(
  'products/productsList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
      console.log('data products', data);

      return data;
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

export const productInfo = createAsyncThunk(
  'products/productInfo',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      console.log('data product', data);
      return data;
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
