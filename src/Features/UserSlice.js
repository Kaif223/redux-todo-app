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
    async ({ page, limit, search }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/userDetail",
                {
                    params: {
                        page,
                        limit,
                        ...(search && { search }),
                    },
                    withCredentials: true
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const delUser = createAsyncThunk(
    "users/delUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/userDetail/${id}`,
                {
                    withCredentials: true
                }
            );

            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)
export const editUserName = createAsyncThunk(
    "users/editUserName",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/userDetail/${id}`,
                userData,
                {
                    withCredentials: true
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

export const uploadImage = createAsyncThunk(
    "users/uploadImage",
    async (image, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await axios.post(
                "http://localhost:8000/api/upload/image",
                formData,
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

export const updateMyProfile = createAsyncThunk(
    "users/updateMyProfile",
    async ({ userData = {}, profileImage }, { rejectWithValue }) => {
        try {

            const response = await axios.patch(
                "http://localhost:8000/api/me",
                {
                    ...userData,
                    profileImage
                },
                {
                    withCredentials: true
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

export const refreshToken = createAsyncThunk(
    "users/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/refresh",
                {},
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

export const changePassword = createAsyncThunk(
    "users/changePassword",
    async ({ currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                "http://localhost:8000/api/me/password",
                {
                    currentPassword,
                    newPassword
                },
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

export const forgotPassword = createAsyncThunk(
    "users/forgotPassword",
    async (userMail, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/forgot-password",
                {
                    userMail
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const resetPassword = createAsyncThunk(
    "users/resetPassword",
    async ({ token, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/reset-password",
                {
                    token,
                    newPassword,
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
        currentUser: null,
        userData: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
        loading: false,
        error: null,
        total: 0,
        isAuth: false,
        authChecked: false,
        profileSaving: false,
        imageUploading: false,
        passwordChanging: false,
        forgotPasswordLoading: false,
        resetPasswordLoading: false,
    },
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.currentUser = null;
            state.userData = [];
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
                state.currentUser = action.payload.user
                state.isAuth = true
                state.authChecked = true
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
                state.userData = []
                state.currentUser = null
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
                state.userData = action.payload.users ?? [];
                state.total = action.payload.total ?? 0;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.userData = [];
                state.total = 0;
                state.error = action.payload;
            })
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
                state.currentUser = action.payload.user ?? null;
                state.authChecked = true;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.currentUser = null;
                state.authChecked = true;
            })
            .addCase(delUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(delUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = state.userData.filter(item => item._id !== action.payload)
            })
            .addCase(delUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(editUserName.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(editUserName.fulfilled, (state, action) => {
                state.loading = false
                const index = state.userData.findIndex(item => item._id === action.payload._id)
                if (index !== -1) {
                    state.userData[index] = action.payload
                }
                if (state.currentUser?._id === action.payload._id) {
                    state.currentUser = action.payload
                }
            })
            .addCase(editUserName.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateMyProfile.pending, (state) => {
                state.profileSaving = true
                state.error = null
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.profileSaving = false
                state.currentUser = action.payload
                const index = state.userData.findIndex(item => item._id === action.payload._id)
                if (index !== -1) {
                    state.userData[index] = action.payload
                }
            })
            .addCase(updateMyProfile.rejected, (state, action) => {
                state.profileSaving = false
                state.error = action.payload
            })
            .addCase(uploadImage.pending, (state) => {
                state.imageUploading = true;
                state.error = null;
            })
            .addCase(uploadImage.fulfilled, (state) => {
                state.imageUploading = false;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.imageUploading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.passwordChanging = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.passwordChanging = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.passwordChanging = false;
                state.error = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordLoading = true;
                state.error = null;
            })

            .addCase(forgotPassword.fulfilled, (state) => {
                state.forgotPasswordLoading = false;
            })

            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordLoading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.error = null;
            })

            .addCase(resetPassword.fulfilled, (state) => {
                state.resetPasswordLoading = false;
            })

            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer