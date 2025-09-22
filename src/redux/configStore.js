import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import adminSlice from "./features/admin/adminSlice.js";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  storage,
  version: 1,
  key: "root",
};
const rootReducer = combineReducers({
  user: adminSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
  { reducer: persistedReducer },
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
