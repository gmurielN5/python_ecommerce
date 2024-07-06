import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (credentials: { id: number; quantity: number }) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${credentials.id}`
    );
    return {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: credentials.quantity,
    };
  }
);
