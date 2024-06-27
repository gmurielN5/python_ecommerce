import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { productsSlice } from './products/productsSlice';
import { userSlice } from './user/userSlice';
import { cartSlice } from './cart/cartSlice';
import { orderSlice } from './order/orderSlice';
import { usersSlice } from './users/usersSlice';

const rootReducer = combineSlices(
  productsSlice,
  userSlice,
  orderSlice,
  cartSlice,
  usersSlice
);

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'user', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
        },
      }),
  });
  return store;
};

export const store = makeStore();

export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
