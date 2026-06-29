import React, { useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, toggleStatus, setSelectedId } from '../Features/todoSlice';
import { ClipLoader } from 'react-spinners'


const Todomain = () => {
    const [darkmode, setDarkmode] = useState(false);
    // const [todosItems, setTodosItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchItem, setSearchItem] = useState("");
    const [filterItem, setFilterItem] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const todosItems = useSelector(state => state.todo.todos)
    const dispatch = useDispatch();


    const filteredTodos = todosItems.filter((item) => {
        const matchSearch =
            item.userName
                .toLowerCase()
                .includes(searchItem.toLowerCase());

        const matchStatus =
            filterItem === "all"
                ? true
                : item.status === filterItem;

        return matchSearch && matchStatus;
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todosItems))
        setIsLoading(false);
    }, [todosItems])

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem("todos")) || [];
    //     setTodosItems(data);
    // }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchItem, filterItem]);

    useEffect(() => {
        const totalPages = Math.ceil(
            filteredTodos.length / itemsPerPage
        );

        if (currentPage > totalPages - 1) {
            setCurrentPage(0);
        }
    }, [filteredTodos, itemsPerPage]);



    const handleDelete = (id) => {
        // const updateTodos = todosItems.filter(item => item.id !== id);
        // setTodosItems(updateTodos);
        dispatch(deleteTodo(id));
        // localStorage.setItem("todos", JSON.stringify(updateTodos));
    };
    const handleEdit = (id) => {
        dispatch(setSelectedId(id));
        navigate("/add-todo")
    };

    const handleToggle = (id) => {
        // const updated = todosItems.map(item =>
        //     item.id === id ? {
        //         ...item,
        //         status:
        //             item.status === "pending"
        //                 ? "completed"
        //                 : "pending"
        //     }
        //         : item
        // );

        // setTodosItems(updated);
        dispatch(toggleStatus(id));
        // localStorage.setItem("todos", JSON.stringify(updated));
    };


    const paginationValue = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0);
    }

    const paginatedTodos = filteredTodos.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        const totalPages = Math.ceil(
            filteredTodos.length / itemsPerPage
        );
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <section className={`main-section ${darkmode ? "dark-mode" : ""}`} >
            <button
                id="themeToggle"
                className="theme-toggle"
                onClick={() => setDarkmode(!darkmode)}
            >☀️</button>
            <div className="inner-list-items">
                <div className="top-button">
                    <input
                        type="text"
                        name=""
                        id="searchBox"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        placeholder="search by title"
                        style={{ "margin": 0 }}
                    />
                    <select
                        id="filterDropdown"
                        value={filterItem}
                        onChange={(e) => setFilterItem(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Check Items</option>
                        <option value="pending">Uncheck Items</option>
                    </select>
                    {/* <Link to="add-todo" id="addBtn" className="cutom-btn blue">
                        Add Items
                    </Link> */}
                    <button to="add-todo" id="addBtn" className="cutom-btn blue"
                        onClick={() => {
                            dispatch(setSelectedId(null))
                            navigate('/add-todo')
                        }}
                    >
                        Add Items
                    </button>
                </div>
                <div className="pagination-section">
                    {isLoading ?
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "50px"
                            }}
                        >
                            <ClipLoader
                                color={darkmode ? "#ffffff" : "#36d7b7"}
                                size={50} />
                        </div>
                        :
                        filteredTodos.length === 0
                            ? <p className='mt-5' style={{ textAlign: "center" }}> No Data Found! </p>
                            :
                            <div className="list-items" id="mainListDiv">
                                <ul id="listItems">
                                    {paginatedTodos.map((item, index) => (
                                        <li key={index} onClick={() => handleToggle(item.id)}>
                                            <p>{item.userName}</p>
                                            <p>{item.usermail}</p>
                                            <p>{item.userNumber}</p>
                                            <p>{item.userDate}</p>
                                            <button
                                                type='submit'
                                                className='edit-btn'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEdit(item.id)
                                                }}
                                            >✏️</button>
                                            <button
                                                type='submit'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(item.id)
                                                }}
                                                className='delete-btn secondary'
                                            >🗑️</button>
                                            {item.status === "completed" && (
                                                <IoCheckmarkSharp size={20} color="green" className='checkIcon' />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                    }
                    <div className="pagination-wrapper">
                        <p>
                            Todos per page:
                        </p>
                        <select
                            id="paginationDropdown"
                            onClick={paginationValue}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <button type='submit' id="preBtn" onClick={prevPage}>
                            &#10094;
                        </button>
                        <button type='submit' id="nextBtn" onClick={nextPage}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Todomain;
