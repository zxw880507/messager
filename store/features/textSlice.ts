import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: string = "";

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    textOnChange(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
    textOnReset(state) {
      state = initialState;
      return state;
    },
  },
});

export default textSlice.reducer;
export const { textOnChange, textOnReset } = textSlice.actions;
export const text = (state: RootState) => state.text;
