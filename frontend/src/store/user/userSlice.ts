import { createAppSlice } from '../createAppSlice';

import { login, register, updateUser } from './userActions';

export type UserType = {
  _id: number;
  name: string;
  username: string;
  email: string;
  token: string;
  isAdmin: boolean;
};

type UserSliceState = {
  loading: boolean;
  userInfo: UserType | null;
  error: string | null;
};

const initialState: UserSliceState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    logout: create.reducer((state) => {
      state.userInfo = null;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectUser: (user) => user.userInfo,
    selectUserLoading: (user) => user.loading,
    selectUserError: (user) => user.error,
  },
});

export const { logout } = userSlice.actions;

export const { selectUser, selectUserLoading, selectUserError } =
  userSlice.selectors;
