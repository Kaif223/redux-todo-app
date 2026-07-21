import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';



export const signupUser = createAsyncThunk(
    "users/signupUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/signup', values);

            console.log('Success:', response.data);
            // if(!response.ok){
            //      throw new Error("somwthings went wrong ")
            // }

        } catch (error) {
            console.error('Error sending data:', error.message);
            return rejectWithValue(error.message)
        }
    })

export const signinUser = createAsyncThunk(
    "users/signinUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/signin', values);

            console.log('Success:', response.data);
            // if(!response.ok){
            //      throw new Error("somwthings went wrong ")
            // }

        } catch (error) {
            console.error('Error sending data:', error.message);
            return rejectWithValue(error.message)
        }
    })

const userSlice = createSlice({
    name: 'userDetail',
    initialState: {
        userData: [],
        loading: false,
        error: null

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
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default userSlice.reducer