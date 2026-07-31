import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const getErrorMessage = (error) =>
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again.";

export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/todos?page=${page}&limit=${limit}`,

            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const postTodos = createAsyncThunk(
    "todos/postTodos",
    async (todoData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/todos",
                todoData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const delTodos = createAsyncThunk(
    "todos/delTodos",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/todos/${id}`,
            );

            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)
export const editTodos = createAsyncThunk(
    "todos/editTodos",
    async ({id, todoData}, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                "http://localhost:8000/api/todos/${id}",
            );

            return response.data.todo;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)


const initialState = {
    todos: [],
    total: 0,
    loading: false,
    error: null,
    // selectedId: null,
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    // reducers: {
    //     setSelectedId: (state, action) => {
    //         state.selectedId = action.payload
    //     },
    //     setTodos: (state, action) => {
    //         state.todos = action.payload
    //     },
    //     addTodo: (state, action) => {
    //         state.todos.push(action.payload);
    //     },

    //     deleteTodo: (state, action) => {
    //         state.todos = state.todos.filter(item => item.id !== action.payload);
    //     },

    //     updateTodo: (state, action) => {
    //         const index = state.todos.findIndex(item => item.id === action.payload.id)
    //         state.todos[index] = action.payload
    //     },
    //     toggleStatus: (state, action) => {
    //         const todo = state.todos.find(item => item.id === action.payload)
    //         todo.status = todo.status === "pending" ? "completed" : "pending"
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload.todos;
                state.total = action.payload.total;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(postTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(postTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos.push(action.payload.todo)
            })
            .addCase(postTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(delTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(delTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.filter(item => item._id !== action.payload)
            })
            .addCase(delTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(editTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(editTodos.fulfilled, (state, action) => {
                state.loading = false
                const index = state.todos.findIndex(item => item._id === action.payload._id)
                state.todos[index] = action.payload
            })
            .addCase(editTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setTodos, addTodo, deleteTodo, updateTodo, toggleStatus, setSelectedId } = todoSlice.actions;
export default todoSlice.reducer