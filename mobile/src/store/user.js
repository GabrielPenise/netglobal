import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const userLogin = createAction("LOGIN")
export const userLogout = createAction("LOGOUT")

// const storedUser = JSON.parse()

// const storedUser = AsyncStorage.getItem('users')

const initialState = {
    id: "",
    email: "",
    fullname: "",
    rol:""
}

const userReducer = createReducer(initialState,{
    [userLogin]: (state, action) => action.payload,
})

export default userReducer