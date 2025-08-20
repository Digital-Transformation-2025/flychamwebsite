import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './flightSlice';
import manageReducer from './manageSlice';
import { Provider } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { PersistGate } from 'redux-persist/integration/react';

// 1️⃣ Config to persist only desired parts of the slice (optional)
const flightsPersistConfig = {
  key: 'flights',
  storage,
};
const managePersistConfig = { key: 'manage', storage };

// 2️⃣ Persist the reducer
const persistedFlightsReducer = persistReducer(flightsPersistConfig, flightsReducer);
const persistedManageReducer = persistReducer(managePersistConfig, manageReducer);

// 3️⃣ Create store with persisted reducer
export const store = configureStore({
  reducer: {
    flights: persistedFlightsReducer,
    manageBook: persistedManageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 4️⃣ Create persistor
export const persistor = persistStore(store);

// 5️⃣ Wrap with PersistGate
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
