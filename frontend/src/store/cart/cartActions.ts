import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    credentials: {
      id: string;
      qty: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${credentials.id}`
      );
      return {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity: credentials.qty,
      };
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
