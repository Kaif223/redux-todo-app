import React, { useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTodos, delTodos, editTodos } from '../Features/todoSlice';
import { ClipLoader } from 'react-spinners'


const Todomain = () => {
    const [darkmode, setDarkmode] = useState(false);
    // const [todosItems, setTodosItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchItem, setSearchItem] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterItem, setFilterItem] = useState("all");
    const {todos, loading , total} = useSelector(state => state.todo)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTodos({
            page: currentPage,
            limit: itemsPerPage,
            search: debouncedSearch,
            status: filterItem,
        }))
    }, [dispatch, currentPage, itemsPerPage, debouncedSearch, filterItem])


  useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchItem);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchItem]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchItem, filterItem]);


    const handleDelete = (id) => {
        dispatch(delTodos(id));
    };
    const handleEdit = (id) => {

        navigate(`/add-todo/${id}`)
    };

    const handleToggle = (item) => {

        const updateData = {
            status: item.status === "pending" ? "completed" : "pending"
        }
        dispatch(
            editTodos({
                id: item._id,
                todoData: updateData
            })
        )
    };


    const paginationValue = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    // const paginatedTodos = filteredTodos;

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {

        const totalPages = Math.ceil(total / itemsPerPage);
        if (currentPage < totalPages) {
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
                            // dispatch(setSelectedId(null))
                            navigate('/add-todo')
                        }}
                    >
                        Add Items
                    </button>
                </div>
                <div className="pagination-section">
                    {loading ?
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
                        todos.length === 0
                            ? <p className='mt-5' style={{ textAlign: "center" }}> No Data Found! </p>
                            :
                            <div className="list-items" id="mainListDiv">
                                <ul id="listItems">
                                    {todos.map((item, index) => (
                                        // <li key={index} onClick={() => handleToggle(item.id)}>
                                        <li key={item._id} onClick={() => handleToggle(item)}>
                                            <p>{item.userName}</p>
                                            <p>{item.userMail}</p>
                                            <p>{item.userNumber}</p>
                                            <p>{item.userDate}</p>
                                            <button
                                                type='submit'
                                                className='edit-btn'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEdit(item._id)
                                                }}
                                            >✏️</button>
                                            <button
                                                type='submit'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(item._id)
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
                            value={itemsPerPage}
                            onChange={paginationValue}
                    >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
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
