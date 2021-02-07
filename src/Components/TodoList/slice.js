import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'todoList/fetchTodos',
    async (rejectWithValue) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const json = await response.json();
            return json;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const slice = createSlice({
    name: 'todoList',
    initialState: {
        todoList: [{
            id: Date.now().toLocaleString(),
            title: 'title1',
            description: 'description1'
        }],
        loading: false
    },
    reducers: {
        addTodo(state, action) {
            state.todoList.push(action.payload)
        },
        removeLastTodo(state) {
            state.todoList.pop()
        }
    },
    extraReducers: {
        [fetchTodos.fulfilled]: (state, action) => {
            state.loading = false;
            state.todoList.length = 0;
            state.todoList.push(...action.payload)
        },
        [fetchTodos.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.loading = false;
            alert(action.error.message)
        }
    }
});



export default slice.reducer;
export const { addTodo, removeLastTodo } = slice.actions;