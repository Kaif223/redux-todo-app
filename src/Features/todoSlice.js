import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    selectedId: null,
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
         setSelectedId: (state, action) => {
            state.selectedId = action.payload
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },

        updateTodo: (state, action) => {
            const index = state.todos.findIndex(item => item.id === action.payload.id)
            state.todos[index] = action.payload
        },
        toggleStatus: (state, action) => {
            const todo = state.todos.find(item => item.id === action.payload)
            todo.status = todo.status === "pending" ? "completed" : "pending"
        },
    }
})

export const { setTodos, addTodo, deleteTodo, updateTodo, toggleStatus, setSelectedId } = todoSlice.actions;
export default todoSlice.reducer