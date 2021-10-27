import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  nickname: undefined,
  first_name: undefined,
  last_name: undefined,
  date_of_birth: undefined,
  location: undefined,
  bio: undefined,
};

const infofieldSlice = createSlice({
  name: "infofield",
  initialState,
  reducers: {},
});

export default infofieldSlice.reducer;

export const infofieldState = (state: RootState) => state.infofield;
