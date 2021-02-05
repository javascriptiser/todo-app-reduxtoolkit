import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeLastTodo } from "./slice";


export const TodoList = () => {
    const todoList = useSelector(state => state.todoReducer.todoList);

    return <div>
        <TodoListForm />
        <Todo
            todoList={todoList}
        />
    </div>
}


const Todo = ({ todoList }) => {
    return <div>
        {todoList.map(item => <span key={item.id}>
            <div>ID: {item.id}</div>
            <div>TITLE: {item.title}</div>
            <div>DESCRIPTION: {item.description}</div>
        </span>)}
    </div>
};


const TodoListForm = () => {
    const dispatch = useDispatch();
    const addButtonClickHandler = () => {
        dispatch(addTodo({ id: Date.now().toLocaleString(), title: prompt() }));
    }
    const deleteButtonClickHandler = () => {
        dispatch(removeLastTodo());
    }
    return <div>
        <button onClick={addButtonClickHandler}>ADD</button>
        <button onClick={deleteButtonClickHandler}>Delete last</button>
    </div>
};