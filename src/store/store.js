import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Features/todoSlice";
import userReducer from '../Features/UserSlice'
import dashboardReducer from '../Features/admin/adminThunk'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        userDetail: userReducer,
        dashboard: dashboardReducer
    }
})