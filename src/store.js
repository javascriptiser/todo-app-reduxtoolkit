import {combineReducers} from "redux";
import todoReducer from './Components/TodoList/slice'
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoReducer
});


export const store = configureStore({
    reducer: rootReducer
});
