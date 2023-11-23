import { createSlice } from "@reduxjs/toolkit";

export interface LayoutState  {
    loginModal: boolean
    signupModal: boolean
    changePasswordModal:boolean
}

const initialState:LayoutState = {
    loginModal: false,
    signupModal: false,
    changePasswordModal: false,
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLoginModal(state, action){
            state.loginModal = action.payload
        },
        setSignupModal(state, action){
            state.signupModal = action.payload
        },
        setChangePasswordModal(state, action){
            state.changePasswordModal = action.payload
        }
    }
})

export const {setLoginModal, setSignupModal,setChangePasswordModal} = layoutSlice.actions

export default layoutSlice.reducer

