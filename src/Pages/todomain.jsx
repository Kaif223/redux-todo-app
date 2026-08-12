import React, { useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTodos, delTodos, editTodos } from '../Features/todoSlice';
import { ClipLoader } from 'react-spinners'
import SearchBar from '../Components/SearchBar';
import FilterDropdown from '../Components/FilterDropdown';
import Pagination from '../Components/Pagination';

const Todomain = () => {
    const [darkmode, setDarkmode] = useState(false);
    // const [todosItems, setTodosItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchItem, setSearchItem] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterItem, setFilterItem] = useState("all");
    const { todos, loading, total, totalPages } = useSelector(state => state.todo)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const params = {
            page: currentPage,
            limit: itemsPerPage,
        }
        if (debouncedSearch.trim()) {
            params.search = debouncedSearch.trim();
        }
        if (filterItem && filterItem !== "all") {
            params.status = filterItem;
        }
        dispatch(getTodos(params))
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
                    <SearchBar
                        value={searchItem}
                        onChange={setSearchItem}
                    />
                    <FilterDropdown
                        value={filterItem}
                        onChange={setFilterItem}
                        options={[
                            {
                                label: "All",
                                value: "all"
                            },
                            {
                                label: "Check Items",
                                value: "completed"
                            },
                            {
                                label: "Uncheck Items",
                                value: "pending"
                            }

                        ]}

                    />
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
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        paginationValue={paginationValue}
                        currentPage={currentPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        total={total}
                    />
                </div>
            </div>
        </section>
    )
}

export default Todomain;
