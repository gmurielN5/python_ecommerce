import { createAppSlice } from '../createAppSlice';

import {
  getProducts,
  getProduct,
  createProduct,
  uploadImage,
  updateProduct,
  deleteProduct,
} from './productActions';

export type ProductType = {
  _id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  createdAt: string;
};

type ProductsSliceState = {
  products: ProductType[];
  product: ProductType | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsSliceState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productsSlice = createAppSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadImage.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (el) => el._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectProducts: (products) => products.products,
    selectProduct: (products) => products.product,
    selectLoading: (products) => products.loading,
    selectError: (products) => products.error,
  },
});

export const {
  selectProducts,
  selectProduct,
  selectLoading,
  selectError,
} = productsSlice.selectors;

export const { clearProduct } = productsSlice.actions;
