import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import {layoutSlice} from './layoutSlice'
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [layoutSlice.name]: layoutSlice.reducer
    },
    devTools: true
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);