import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface chatState {
  isConversation: boolean;
  conversationId: string | undefined;
}

const initialState: chatState = {
  isConversation: false,
  conversationId: undefined,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    onChat(state, action: PayloadAction<string | undefined>) {
      state.isConversation = true;
      state.conversationId = action.payload;
    },
    cancelChat(state) {
      state.isConversation = false;
      state.conversationId = undefined;
    },
  },
});

export default chatSlice.reducer;
export const chatState = (state: RootState) => state.chat;
export const { onChat, cancelChat } = chatSlice.actions;
