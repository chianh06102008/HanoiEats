import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../type/user";

type UserState = {
  user: IUserProfile | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<IUserProfile>) => {
      state.user = actions.payload;
    },
    removeUser: (state) => {
      state.user = null;

    },
  },
});

export const setUser = userSlice.actions.setUser;
export const removeUser = userSlice.actions.removeUser;
export const userReducer = userSlice.reducer;
