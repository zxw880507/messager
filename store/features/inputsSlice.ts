import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputsState<T> {
  [key: string]: string | undefined;
}

type Payload<T> = {
  field: keyof T;
  value: T[keyof T];
};

enum Action {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

type Mode = keyof typeof Action;

const initialState: InputsState<string> = {
  email: "",
  password: "",
  repassword: "",
};

const inputsSlice = createSlice({
  name: "formInputs",
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<Payload<InputsState<string>>>) {
      state[action.payload.field] = action.payload.value!;
    },
    resetInput(state) {
      Object.keys(state).forEach((key) => {
        state[key] = "";
      });
    },
  },
});

export const { changeInput, resetInput } = inputsSlice.actions;
export default inputsSlice.reducer;
