import style from './style.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeLastTodo } from "./slice";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


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


const validationShema = Yup.object({
    title: Yup.string().required('Required').max(20, 'Max 20 characters'),
    description: Yup.string().required('Required').max(20, 'Max 20 characters'),
})
const TodoListForm = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: validationShema,
        onSubmit(values) {
            dispatch(addTodo({
                id: Date.now().toLocaleString(),
                title: values.title,
                description: values.description
            }))
        }
    })
    const deleteButtonClickHandler = () => {
        dispatch(removeLastTodo());
    }
    return <form onSubmit={formik.handleSubmit} className={style.formWrapper}>
        <TextField
            fullWidth
            id='title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
            fullWidth
            id='description'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
        />
        <Button
            type={'submit'}
            fullWidth
            variant="contained"
            color="primary">ADD
        </Button>
        <Button
            onClick={deleteButtonClickHandler}
            type={'button'}
            fullWidth
            variant="contained"
            color="secondary">Delete last
        </Button>
    </form>
};