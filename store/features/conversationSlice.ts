import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import type { Data } from "../../pages/api/conversation/[userId]";

enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

interface ConversationState {
  conversation: Data;
  status: keyof typeof Status;
  error: string | null | undefined;
}
const initialState: ConversationState = {
  conversation: [],
  status: "idle",
  error: null,
};

export const getConversation = createAsyncThunk(
  "/getConversation",
  async (id?: string) => {
    const res = await axios.get(`/api/conversation/${id}`);
    return res.data;
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getConversation.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.conversation = action.payload;
      });
  },
});

export default conversationSlice.reducer;
export const conversationState = (state: RootState) => state.conversationState;
