import { createAppSlice } from '../createAppSlice';

import {
  createOrder,
  getOrderDetails,
  payOrder,
  getOrdersList,
} from './orderActions';

import { UserType } from '../user/userSlice';
import {
  CartItemsType,
  ShippingAddressType,
} from '../cart/cartSlice';

export type OrderType = {
  createdAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: CartItemsType[];
  paidAt: string;
  paymentMethod: string;
  shippingAddress: ShippingAddressType;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  user: UserType;
  _id: number;
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
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loading = false;
        state.order.isPaid = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
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
