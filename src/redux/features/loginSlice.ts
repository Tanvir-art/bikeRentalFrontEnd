import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  token: string;
}

const initialState: UsersState = {
  name: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  role: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UsersState>) => {
      return { ...state, ...action.payload };
    },
    logoutUser: () => initialState,
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
