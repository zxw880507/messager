import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

type AuthState = {
  auth: Data | undefined;
  status: keyof typeof Status;
  error: string | undefined;
};
type Data = {
  user: string | undefined;
};

const initialState: AuthState = {
  auth: undefined,
  status: "idle",
  error: undefined,
};

export const setLogin = createAsyncThunk(
  "auth/setLogin",
  async (_, { getState, dispatch }) => {
    const { formInputs } = getState() as RootState;
    const res = await axios.post("api/login", formInputs);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLogin.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        console.log("payload:", action.payload);
        state.auth = action.payload;
      })
      .addCase(setLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const authenState = (state: RootState) => state.auth.auth;
