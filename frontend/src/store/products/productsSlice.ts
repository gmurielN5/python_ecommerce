import { createAppSlice } from '../createAppSlice';

import {
  listProducts,
  productDetails,
  listTopProducts,
  createProduct,
  uploadImage,
  updateProduct,
  deleteProduct,
  createProductReview,
} from './productActions';

type ReviewType = {
  _id: number;
  name: string;
  rating: number;
  comment: string;
  product: number;
  user: number;
};

export type ProductType = {
  _id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: ReviewType[];
  createdAt: string;
  user: number;
};

type ProductsSliceState = {
  products: ProductType[];
  product: ProductType | null;
  topRatedProduct: ProductType[];
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsSliceState = {
  products: [],
  product: null,
  topRatedProduct: [],
  page: 1,
  pages: 1,
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
      .addCase(listProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(listTopProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(listTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedProduct = action.payload;
      })
      .addCase(listTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(productDetails.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productDetails.rejected, (state, action) => {
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
      })
      .addCase(createProductReview.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectProducts: (products) => products.products,
    selectProduct: (products) => products.product,
    selectTopRated: (products) => products.topRatedProduct,
    selectPage: (products) => products.page,
    selectPages: (products) => products.pages,
    selectLoading: (products) => products.loading,
    selectError: (products) => products.error,
  },
});

export const {
  selectProducts,
  selectProduct,
  selectTopRated,
  selectPage,
  selectPages,
  selectLoading,
  selectError,
} = productsSlice.selectors;

export const { clearProduct } = productsSlice.actions;
