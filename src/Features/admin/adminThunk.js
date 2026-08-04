import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const getErrorMessage = (error) =>
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again.";



export const getDashboardStats = createAsyncThunk(
    "dashboard/getStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/adminDashboard",
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        totalUsers: 0,
        totalTodos: 0,
        // completedTodos: 0,
        // pendingTodos: 0,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsers = action.payload.totalUsers;
                state.totalTodos = action.payload.totalTodos;
                // state.completedTodos = action.payload.completedTodos;
                // state.pendingTodos = action.payload.pendingTodos;
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default dashboardSlice.reducer
