import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputsState<T> {
  email: T;
  password: T;
  repassword?: T;
}

type Payload<T> = {
  field: keyof T;
  value: T[keyof T];
};
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
    resetInput(state, actions: PayloadAction<>);,
  },
});

export const { changeInput } = inputsSlice.actions;
export default inputsSlice.reducer;
