import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../..";
import { resetInput } from "../inputsSlice";

enum Status {
  idle = "idle",
  loading = "loading",
  pending = "pending",
  succeeded = "succeeded",
  failed = "failed",
}

interface AuthState {
  auth: Data<string | undefined> | null;
  status: keyof typeof Status;
  error: string | null | undefined;
}
interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}
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
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { formInputs } = getState() as RootState;
    dispatch(resetInput());
    try {
      const res = await axios.post("api/login", formInputs);
      return res.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const setSignup = createAsyncThunk(
  "auth/setSignup",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { formInputs } = getState() as RootState;
    dispatch(resetInput());
    try {
      const res = await axios.post("api/signup", formInputs);
      return res.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/user");
      return res.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const setLogout = createAsyncThunk("auth/setLogout", async () => {
  const res = await axios.get("api/logout");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLogin.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(setLogin.rejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(setSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSignup.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(setSignup.rejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUser.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(getUser.rejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(setLogout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(setLogout.fulfilled, (state, action: AnyAction) => {
        state.status = "failed";
        state.auth = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetError } = authSlice.actions;
export const authenState = (state: RootState) => state.auth;
