import { createAppSlice } from '../createAppSlice';

import { ProductType } from '../products/productsSlice';

export type CartItemsType = {
  quantity: number;
} & ProductType;

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
};

const initialState: CardSliceState = {
  cartItems: [],
  shippingAddress: null,
  paymentMethod: null,
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('action', action);
      const { product, qty } = action.payload;
      const itemInCart = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (itemInCart) {
        itemInCart.quantity = qty;
      } else {
        state.cartItems.push({ ...product, quantity: qty });
      }
    },
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
  selectors: {
    selectCart: (cart) => cart.cartItems,
    selectShippingAddress: (cart) => cart.shippingAddress,
    selectPaymentMethod: (cart) => cart.paymentMethod,
  },
});

export const {
  addToCart,
  removeItem,
  clearCart,
  addShippingAddress,
  addPaymentMethod,
} = cartSlice.actions;

export const {
  selectCart,
  selectShippingAddress,
  selectPaymentMethod,
} = cartSlice.selectors;
