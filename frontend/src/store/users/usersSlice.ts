import { createAppSlice } from '../createAppSlice';
import { login } from '../user/userActions';

import { UserType, userSlice } from '../user/userSlice';

import { getUsersList } from './usersActions';

type UserSliceState = {
  usersList: UserType[];
  loading: boolean;
  error: string | null;
};

const initialState: UserSliceState = {
  usersList: [],
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
        console.log('action', action);
        state.loading = false;
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    // selectUser: (user) => user.userInfo,
    // selectUserLoading: (user) => user.loading,
    // selectUserError: (user) => user.error,
  },
});

export const { clearUsersList } = usersSlice.actions;

export const {} = usersSlice.selectors;
