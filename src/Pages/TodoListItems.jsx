import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editTodos, postTodos, updateTodo } from '../Features/todoSlice'

const TodoListItems = () => {

    const [darkmode, setDarkmode] = useState(false);
    const [itemField, setitemField] = useState('');
    const [mailField, setMailField] = useState('');
    const [numField, setNumField] = useState('');
    const [dateField, setDateField] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const todosItems = useSelector(state => state.todo.todos)

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const todo = todosItems.find(
                item => item._id === id
            )
            if (todo) {
                setitemField(todo.userName)
                setMailField(todo.userMail)
                setNumField(todo.userNumber)
                setDateField(todo.userDate)
            }
        }
    }, [id, todosItems])

    const handleSubmit = async () => {
        let userDetail = {
            userName: itemField,
            userMail: mailField,
            userNumber: numField,
            userDate: dateField,
        }
        if (userDetail.userName === "" || userDetail.userMail === "" || userDetail.userNumber === "") {
            alert("please enter a value")
            return;
        }

        if (id) {
            await dispatch(
                editTodos({
                    id,
                    todoData: userDetail
                })
            )
        }
        else {
            await dispatch(
                postTodos(userDetail)
            )
        }

        navigate("/")
    };


    return (
        <section className={`main-section ${darkmode ? "dark-mode" : ""}`} >
            <button
                id="themeToggle"
                className="theme-toggle"
                onClick={() => setDarkmode(!darkmode)}
            >☀️</button>
            <div className="inner-page">
                <h1 className="title">
                    Todo App
                </h1>

                <div className='input-div w-100'>
                    <input type="text" id="myInput" placeholder="Enter item"
                        value={itemField}
                        onChange={e => setitemField(e.target.value)}
                    />
                </div>
                <div className='input-div w-100'>
                    <input type="email" id="inputEmail" placeholder="Enter email"
                        value={mailField}
                        onChange={e => setMailField(e.target.value)}
                    />
                </div>
                <div className='input-div w-100'>
                    <input type="number" id="inputNumber" placeholder="Enter Number"
                        value={numField}
                        onChange={e => setNumField(e.target.value)}
                    />
                </div>
                <div className='input-div w-100'>
                    <input type="date" id="inputDate" placeholder="Enter date"
                        value={dateField}
                        onChange={e => setDateField(e.target.value)}
                    />
                </div>

                <div className="btns-div">
                    <Link to="/" value="Save" id="backbtn" className="cutom-btn">
                        Back to todolist
                    </Link>
                    <button type="submit"
                        value="Save"
                        id="saveBtn"
                        className="cutom-btn blue"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </section>
    )
}

export default TodoListItems
