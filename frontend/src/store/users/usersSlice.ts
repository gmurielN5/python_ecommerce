import { createAppSlice } from '../createAppSlice';

import {
  getUsersList,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from './usersActions';

export type UserProfileType = {
  _id: number;
  name: string;
  username: string;
  isAdmin: boolean;
};

type UserSliceState = {
  usersList: UserProfileType[];
  userProfile: UserProfileType | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserSliceState = {
  usersList: [],
  userProfile: null,
  loading: false,
  error: null,
};

export const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersList: (state) => {
      state.usersList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = state.usersList.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectUsersList: (users) => users.usersList,
    selectUserProfile: (users) => users.userProfile,
    selectUsersLoading: (users) => users.loading,
    selectUsersError: (users) => users.error,
  },
});

export const { clearUsersList } = usersSlice.actions;

export const {
  selectUsersList,
  selectUserProfile,
  selectUsersLoading,
  selectUsersError,
} = usersSlice.selectors;
