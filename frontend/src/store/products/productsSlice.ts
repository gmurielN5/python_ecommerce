import { createAppSlice } from '../createAppSlice';

import { productsList, productInfo } from './productActions';

export type ProductType = {
  _id: string;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsList.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(productInfo.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(productInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productInfo.rejected, (state, action) => {
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
