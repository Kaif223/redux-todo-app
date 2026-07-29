import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Pulls the most useful message out of an axios failure. The backend replies
// with { message } in most places but { error } on a bad password, and if the
// server is unreachable there is no response body at all — so try each in turn.
const getErrorMessage = (error) =>
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again.";



export const signupUser = createAsyncThunk(
    "users/signupUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/signup', values);
            return response.data

            // console.log('Success:', response.data);
            // if(!response.ok){
            //      throw new Error("somwthings went wrong ")
            // }

        } catch (error) {
            console.error('Error sending data:', error.message);
            return rejectWithValue(getErrorMessage(error))
        }
    })

export const signinUser = createAsyncThunk(
    "users/signinUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/signin', values, {
                withCredentials: true
            });
            return response.data

            // console.log('Success:', response.data);
            // if(!response.ok){
            //      throw new Error("somwthings went wrong ")
            // }

        } catch (error) {
            console.error('Error sending data:', error.message);
            return rejectWithValue(getErrorMessage(error))
        }
    })

export const signOutUser = createAsyncThunk(
    "users/signOutUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout', values, {
                withCredentials: true
            });
            return response.data

            // if(!response.ok){
            //      throw new Error("somwthings went wrong ")
            // }

        } catch (error) {
            console.error('Error sending data:', error.message);
            return rejectWithValue(getErrorMessage(error))
        }
    })

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/userDetail",
                {
                    withCredentials: true
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);
const userSlice = createSlice({
    name: 'userDetail',
    initialState: {
        userData: null,
        loading: false,
        error: null,
        isAuth: false,

    },
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.userData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signinUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.isAuth = true
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signOutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signOutUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = null
                state.isAuth = false
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(getUsers.rejected, (state) => {
                state.loading = false;
                state.userData = null;
                state.isAuth = false;
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer