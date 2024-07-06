import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

import {
  createOrder,
  getOrderDetails,
  getUserOrdersList,
  getOrdersList,
  payOrder,
  deliverOrder,
} from './orderActions';

import { UserType } from '../user/userSlice';
import {
  CartItemsType,
  ShippingAddressType,
} from '../cart/cartSlice';

export type OrderType = {
  _id: number;
  createdAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: CartItemsType[];
  paidAt: string;
  paymentMethod: string;
  shippingAddress: ShippingAddressType;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: UserType;
};

type OrderSliceState = {
  order: OrderType | null;
  ordersList: OrderType[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: OrderSliceState = {
  order: null,
  ordersList: [],
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
      state.ordersList = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<OrderType>) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getOrderDetails.fulfilled,
        (state, action: PayloadAction<OrderType>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserOrdersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrdersList.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.loading = false;
      })
      .addCase(getUserOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.loading = false;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loading = false;
        state.order?.isPaid ? true : false;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliverOrder.fulfilled, (state) => {
        state.loading = false;
        state.order?.isDelivered ? true : false;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectOrder: (order) => order.order,
    selectOrderList: (order) => order.ordersList,
    selectOrderLoading: (order) => order.loading,
    selectOrderSuccess: (order) => order.success,
    selectOrderError: (order) => order.error,
  },
});

export const {
  selectOrder,
  selectOrderList,
  selectOrderLoading,
  selectOrderSuccess,
  selectOrderError,
} = orderSlice.selectors;

export const { clearOrderItem } = orderSlice.actions;
