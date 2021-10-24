import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { Data } from "../../pages/api/friends/[userId]";

enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}
interface FriendsState {
  friends: Data;
  status: keyof typeof Status;
  error: string | null | undefined;
}

const initialState: FriendsState = {
  friends: [],
  status: "idle",
  error: null,
};

export const getFriends = createAsyncThunk(
  "/getFriends",
  async (id: string) => {
    const res = await axios.get(`/api/friends/${id}`);
    return res.data;
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFriends.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFriends.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default friendsSlice.reducer;
export const friendsState = (state: RootState) => state.friendsState;
