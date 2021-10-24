import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

enum Tabs {
  friends = "friends",
  conversation = "conversation",
  profile = "profile",
}

type Tab = keyof typeof Tabs;

interface TabState<T> {
  tab: T;
}

const initialState: TabState<Tab> = { tab: "friends" };

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    tabOnSelect(state, action: PayloadAction<Tab>) {
      state.tab = action.payload;
      return state;
    },
  },
});

export default tabSlice.reducer;
export const { tabOnSelect } = tabSlice.actions;
export const tab = (state: RootState) => state.tabState.tab;
