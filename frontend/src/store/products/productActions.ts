import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { ProductType, ReviewType } from './productsSlice';

import axios from 'axios';

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
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

export const productDetails = createAsyncThunk(
  'products/productDetails',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
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

export const createProduct = createAsyncThunk(
  'products/createProduct',
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/create/`,
        {},
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

export const uploadImage = createAsyncThunk(
  'products/uploadImage',
  async (formData, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      return rejectWithValue('No user found');
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/upload/`,
        formData,
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (
    productDetails: ProductType,
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
        `${import.meta.env.VITE_API_URL}/products/update/${
          productDetails._id
        }/`,
        productDetails,
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

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/delete/${id}/`,
        config
      );
      return id;
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

export const createProductReview = createAsyncThunk(
  'products/createProductReview',
  async (
    credentials: { id: number; review: ReviewType },
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${
          credentials.id
        }/reviews/`,
        credentials.review,
        config
      );
      console.log('data', data);
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
