import React, { useState, useEffect } from 'react'
import { FiInbox } from 'react-icons/fi'
import SearchBar from '../../Components/SearchBar'
import Pagination from '../../Components/Pagination'
import FilterDropdown from '../../Components/FilterDropdown'
import { getTodos } from '../../Features/todoSlice'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners'



const AdminTodos = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchItem, setSearchItem] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterItem, setFilterItem] = useState("all");
    const { todos, loading, total } = useSelector(state => state.todo)

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


    const paginationValue = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(total / itemsPerPage)) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <div className="page-head">
                <div>
                    <h1>All Todo List</h1>
                </div>
            </div>

            <div className="panel flush">
                <div className="table-toolbar">
                    <SearchBar
                        value={searchItem}
                        onChange={setSearchItem}
                        placeholder="Search todos by title, owner or email..."
                    />

                    <div className="toolbar-right">
                        <FilterDropdown
                            value={filterItem}
                            onChange={setFilterItem}
                            options={[
                                { label: "All Status", value: "all" },
                                { label: "Completed", value: "completed" },
                                { label: "Pending", value: "pending" },
                            ]}
                        />
                    </div>
                </div>

                <div className="custom-table-div table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th className="aktinson-family">Todo</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan={4} className="empty-row">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "50px"
                                            }}
                                        >
                                            <ClipLoader
                                                size={50} />
                                        </div>
                                    </td>
                                </tr>
                                :
                                todos.length === 0 ?
                                    <tr>
                                        <td colSpan={4} className="empty-row">
                                            <FiInbox />
                                            <p>No todos found.</p>
                                        </td>
                                    </tr>
                                    :
                                    todos.map((todo) => (
                                        <tr key={todo.id}>
                                            <td>
                                                <div className="title-wrapper-div has-max-width">
                                                    <div className="text-div">
                                                        <strong>{todo.userName}</strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{todo.userMail}</td>
                                            <td>{todo.userNumber}</td>
                                            <td>{todo.userDate}</td>
                                        </tr>
                                    ))

                            }
                        </tbody>
                    </table>
                </div>

                <Pagination
                    itemsPerPage={itemsPerPage}
                    paginationValue={paginationValue}
                    currentPage={currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    total={total}
                />
            </div>
        </>
    )
}

export default AdminTodos
