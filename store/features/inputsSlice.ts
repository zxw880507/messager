import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputsState<T> {
  [key: string]: string | undefined;
}

type Payload<T, K extends keyof T = keyof T> = {
  field: K;
  value: T[K];
};

const initialState: InputsState<string> = {
  email: "",
  password: "",
};

const inputsSlice = createSlice({
  name: "formInputs",
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<Payload<InputsState<string>>>) {
      state[action.payload.field] = action.payload.value;
    },
    resetInput(state) {
      Object.keys(state).forEach((key) => {
        state[key] = "";
      });
    },
    setInputByMode(state, action: PayloadAction<string>) {
      switch (action.payload) {
        case "LOGIN":
          state = { email: "", password: "" };
          return state;
        case "SIGNUP":
          state = { email: "", password: "", repassword: "" };
          return state;
        default:
          break;
      }
    },
  },
});

export const { changeInput, resetInput, setInputByMode } = inputsSlice.actions;
export default inputsSlice.reducer;
