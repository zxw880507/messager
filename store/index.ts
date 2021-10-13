import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import logger from "redux-logger";
import inputsReducer from "./features/inputsSlice";
import authReducer from "./features/auth/authSlice";

declare const reducer: Reducer<{}>;

const store = configureStore({
  reducer: {
    formInputs: inputsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
