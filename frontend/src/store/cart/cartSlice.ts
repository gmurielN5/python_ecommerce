import { createAppSlice } from '../createAppSlice';

import { ProductType } from '../products/productsSlice';

export type CartItems = {
  quantity: number;
} & ProductType;

type CardSliceState = {
  cartItems: CartItems[];
};

const initialState: CardSliceState = {
  cartItems: [],
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
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
  },
  selectors: { selectCart: (cart) => cart.cartItems },
});

export const { addToCart, removeItem } = cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
