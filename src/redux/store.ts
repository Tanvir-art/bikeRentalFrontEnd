import { configureStore } from "@reduxjs/toolkit";
import { bikeApi } from "./api/api";
import userReducer from "./features/loginSlice";

const loadUserData = () => {
  const user = localStorage.getItem("user");
  // Check if user is a valid JSON string and not "undefined"
  return user && user !== "undefined" ? JSON.parse(user) : undefined;
};

const initialState = {
  user: loadUserData(),
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    [bikeApi.reducerPath]: bikeApi.reducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bikeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
