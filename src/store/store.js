import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Features/todoSlice";
import userReducer from '../Features/UserSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        userDetail: userReducer
    }
})