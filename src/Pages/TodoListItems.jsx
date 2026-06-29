import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, updateTodo } from '../Features/todoSlice'

const TodoListItems = () => {

    const [darkmode, setDarkmode] = useState(false);
    const [itemField, setitemField] = useState('');
    const [mailField, setMailField] = useState('');
    const [numField, setNumField] = useState('');
    const [dateField, setDateField] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const todosItems = useSelector(state => state.todo.todos)
   
   
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todosItems))
    }, [todosItems])

    // let todosItems = JSON.parse(localStorage.getItem("todos")) || [];

    // let myId = localStorage.getItem("selectedId")
    const myId = useSelector(state => state.todo.selectedId)

    useEffect(() => {
        if (myId !== null) {
            setitemField(todosItems.find(item => item.id == myId).userName)
            setMailField(todosItems.find(item => item.id == myId).usermail)
            setNumField(todosItems.find(item => item.id == myId).userNumber)
            setDateField(todosItems.find(item => item.id == myId).userDate)
        };

    }, [])

    const handleSubmit = () => {
        let userDetail = {
            id: myId !== null ? Number(myId) : Date.now(),
            userName: itemField,
            usermail: mailField,
            userNumber: numField,
            userDate: dateField,
            status: myId === null ? 'pending' : todosItems.find(item => item.id == myId).status
        }
        if (userDetail.userName === "" || userDetail.usermail === "" || userDetail.userNumber === "") {
            alert("please enter a value")
            return;
        }
        if (myId !== null) {
            // const updateList = todosItems.map(item =>
            //     item.id == myId ? userDetail : item
            // )
            // localStorage.setItem("todos", JSON.stringify(updateList))
            dispatch(updateTodo(userDetail))
        } else {
            // const updateList = [...todosItems, userDetail]
            // localStorage.setItem("todos", JSON.stringify(updateList))
            dispatch(addTodo(userDetail))
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

                <input type="text" id="myInput" placeholder="Enter item"
                    value={itemField}
                    onChange={e => setitemField(e.target.value)}
                />
                <input type="email" id="inputEmail" placeholder="Enter email"
                    value={mailField}
                    onChange={e => setMailField(e.target.value)}
                />
                <input type="number" id="inputNumber" placeholder="Enter Number"
                    value={numField}
                    onChange={e => setNumField(e.target.value)}
                />
                <input type="date" id="inputDate" placeholder="Enter date"
                    value={dateField}
                    onChange={e => setDateField(e.target.value)}
                />

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
