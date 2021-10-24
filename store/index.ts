import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import logger from "redux-logger";
import inputsReducer from "./features/inputsSlice";
import authReducer from "./features/auth/authSlice";
import conversationReducer from "./features/conversationSlice";
import chatReducer from "./features/chatSlice";
import messagesReducer from "./features/messagesSlice";
import textReducer from "./features/textSlice";
import tabReducer from "./features/tabSlice";
import friendsReducer from "./features/friendsSlice";

declare const reducer: Reducer<{}>;

const store = configureStore({
  reducer: {
    formInputs: inputsReducer,
    authState: authReducer,
    conversationState: conversationReducer,
    chat: chatReducer,
    messagesState: messagesReducer,
    text: textReducer,
    tabState: tabReducer,
    friendsState: friendsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
