import { createAppSlice } from '../createAppSlice';

import { addToCart } from './cartActions';

export type CartItemsType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
};

export type ShippingAddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CardSliceState = {
  cartItems: CartItemsType[];
  shippingAddress: ShippingAddressType | null;
  paymentMethod: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: CardSliceState = {
  cartItems: [],
  shippingAddress: null,
  paymentMethod: null,
  loading: false,
  error: null,
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = removeItem;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const existItem = state.cartItems.find(
          (el) => el._id === item._id
        );
        if (existItem) {
          existItem.quantity = item?.quantity;
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectCart: (cart) => cart.cartItems,
    selectCartLoading: (cart) => cart.loading,
    selectCartError: (cart) => cart.error,
    selectShippingAddress: (cart) => cart.shippingAddress,
    selectPaymentMethod: (cart) => cart.paymentMethod,
  },
});

export const {
  removeItem,
  clearCart,
  addShippingAddress,
  addPaymentMethod,
} = cartSlice.actions;

export const {
  selectCart,
  selectCartLoading,
  selectCartError,
  selectShippingAddress,
  selectPaymentMethod,
} = cartSlice.selectors;
