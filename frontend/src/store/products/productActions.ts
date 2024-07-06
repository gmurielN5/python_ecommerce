import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { ProductType } from './productsSlice';

import axios from 'axios';

type ReviewType = {
  rating: number;
  comment: string;
};

type ProductReviewArgs = {
  id: number;
  review: ReviewType;
};

type ProductArgs = {
  _id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  createdAt: string;
};

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async (keyword: string) => {
    if (!keyword) {
      keyword = '';
    }
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products${keyword}`
    );
    return data;
  }
);

export const listTopProducts = createAsyncThunk(
  'products/listTopProducts',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/top/`
    );
    return data;
  }
);

export const productDetails = createAsyncThunk(
  'products/productDetails',
  async (id: number) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
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
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/products/create/`,
      {},
      config
    );
    return data;
  }
);

export const uploadImage = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string }
>(
  'products/uploadImage',
  async (formData, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.userInfo?.token;

    if (!token) {
      throw new Error('No user found');
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
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || 'Unknown error occurred'
        );
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productDetails: ProductArgs, { getState }) => {
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
      `${import.meta.env.VITE_API_URL}/products/update/${
        productDetails._id
      }/`,
      productDetails,
      config
    );
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, { getState }) => {
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
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/delete/${id}/`,
      config
    );
    return id;
  }
);

export const createProductReview = createAsyncThunk<
  ProductType,
  ProductReviewArgs,
  { rejectValue: string }
>(
  'products/createProductReview',
  async (
    { id, review }: ProductReviewArgs,
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
        `${import.meta.env.VITE_API_URL}/products/${id}/reviews/`,
        review,
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
