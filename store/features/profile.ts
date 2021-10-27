import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profile: 
}

interface ProfileState<T> {
  [key: string]: T;
}

type Payload<T, K extends keyof T = keyof T> = {
  field: K;
  value: T[K];
};

const initialState: ProfileState<string | null | undefined> = {
  nickname: null,
  first_name: null,
  last_name: null,
  date_of_birth: null,
  location: null,
  bio: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});
