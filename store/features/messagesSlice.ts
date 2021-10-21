import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import type { Messages } from "../../pages/api/message/[conversationId]";

enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

interface messageState {
  messages: Messages;
  status: keyof typeof Status;
  error: string | null | undefined;
}

const initialState: messageState = {
  messages: [],
  status: "idle",
  error: null,
};

export const getMessages = createAsyncThunk(
  "/getMessages",
  async (_, { getState, dispatch }) => {
    const { chat } = getState() as RootState;
    const res = await axios.get(`/api/message/${chat.conversationId}`);
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "/sendMessage",
  async (socketId: string | null, { getState, dispatch }) => {
    const { chat, text, authState } = getState() as RootState;
    const res = await axios.post(`/api/message/${chat.conversationId}`, {
      text,
      senderId: authState.auth!.id,
      socket_id: socketId,
    });
    return res.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    receiveMessage(state, action: PayloadAction<any>) {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
      });
  },
});

export default messagesSlice.reducer;
export const messagesState = (state: RootState) => state.messagesState;
export const { receiveMessage } = messagesSlice.actions;
