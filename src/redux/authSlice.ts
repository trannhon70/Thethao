import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from ".";
import { IUser } from "@/interface";

// Type for our state
export interface AuthState {
  authState: boolean;
  user: IUser
}

// Initial state
export const initialState: AuthState = {
  authState: false,
  user: {
    _id: "",
    email: "",
    avatar: "",
    group: [],
    follow:[],
  }
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    login(state, action){
      state.authState = true
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    },

    logout(state, action){
      state.authState = false
      state.user = initialState.user
      localStorage.removeItem('token')
    },

    getUser(state,action){
      state.authState = action.payload.authState
      state.user = action.payload.user
    }
  },
});

export const { setAuthState, login, logout, getUser } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;
