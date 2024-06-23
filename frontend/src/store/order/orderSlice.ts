import { createAppSlice } from '../createAppSlice';

import { placeOrder } from './orderActions';

import { UserType } from '../user/userSlice';
import {
  CartItemsType,
  ShippingAddressType,
} from '../cart/cartSlice';

export type OrderType = {
  createdAt?: Date;
  isDelivered?: boolean;
  isPaid?: boolean;
  orderItems: CartItemsType[];
  paidAt?: string;
  shippingAddress: ShippingAddressType;
  shippingPrice: string;
  taxPrice: string;
  user?: UserType;
  _id?: number;
};

type OrderSliceState = {
  order: OrderType | null;
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: OrderSliceState = {
  order: null,
  loading: false,
  success: false,
  error: null,
};

export const orderSlice = createAppSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderItem: (state) => {
      state.order = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectOrder: (order) => order.order,
    selectOrderLoading: (order) => order.loading,
    selectOrderSuccess: (order) => order.success,
    selectOrderError: (order) => order.error,
  },
});

export const {
  selectOrder,
  selectOrderLoading,
  selectOrderSuccess,
  selectOrderError,
} = orderSlice.selectors;

export const { clearOrderItem } = orderSlice.actions;
