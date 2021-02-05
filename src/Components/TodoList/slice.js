import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'todoList',
    initialState: {
        todoList: [{
            id: Date.now().toLocaleString(),
            title: 'title1',
            description: 'description1'
        }]
    },
    reducers: {
        addTodo(state, action) {
            state.todoList.push(action.payload)
        },
        removeLastTodo(state) {
            state.todoList.pop()
        }
    }
});

export default slice.reducer;
export const { addTodo, removeLastTodo } = slice.actions;