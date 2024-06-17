import { createAppSlice } from '../createAppSlice';

export type ProductType = {
  _id: string;
  // user: UserType;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
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
  reducers: (create) => ({
    fetchProducts: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products/`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data: ProductType[] = await response.json();
          return data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.products = action.payload;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      }
    ),
    fetchProduct: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data: ProductType = await response.json();
          return data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.product = action.payload;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      }
    ),
  }),
  selectors: {
    selectProducts: (products) => products.products,
    selectProduct: (products) => products.product,
    selectLoading: (products) => products.loading,
    selectError: (products) => products.error,
  },
});

export const { fetchProducts, fetchProduct } = productsSlice.actions;

export const {
  selectProducts,
  selectProduct,
  selectLoading,
  selectError,
} = productsSlice.selectors;
