import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import { resetInput } from "../inputsSlice";

enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

type AuthState = {
  auth: Data<string | undefined> | null;
  status: keyof typeof Status;
  error: string | null;
};
type Data<T> = {
  id: T;
  email: T;
  password: T;
};

const initialState: AuthState = {
  auth: null,
  status: "idle",
  error: null,
};

export const setLogin = createAsyncThunk(
  "auth/setLogin",
  async (_, { getState, dispatch }) => {
    const { formInputs } = getState() as RootState;
    dispatch(resetInput());
    const res = await axios.post("api/login", formInputs);
    return res.data;
  }
);

export const setSignup = createAsyncThunk(
  "auth/setSignup",
  async (_, { getState, dispatch }) => {
    const { formInputs } = getState() as RootState;
    dispatch(resetInput());
    const res = await axios.post("api/signup", formInputs);
    return res.data;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const res = await axios.get("api/user");
  return res.data;
});

export const setLogout = createAsyncThunk("auth/setLogout", async () => {
  const res = await axios.get("api/logout");
  return res.data;
});

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
        state.auth = action.payload;
      })
      .addCase(setLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(setSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSignup.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(setSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(setLogout.fulfilled, (state, action: AnyAction) => {
        state.status = "idle";
        state.auth = action.payload;
      });
  },
});

export default authSlice.reducer;
export const authenState = (state: RootState) => state.auth;
