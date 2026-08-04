import React, { useState } from 'react'
import { FiInbox } from 'react-icons/fi'
import SearchBar from '../../Components/SearchBar'
import Pagination from '../../Components/Pagination'
import FilterDropdown from '../../Components/FilterDropdown'

// ---- static demo data ----
const allTodos = [
    { id: 1, title: "Finish redux toolkit setup", owner: "Zul Kaif", email: "zulkaif@ilmiya.com", phone: "+91 98765 43210", date: "18 Aug 2026", status: "Completed" },
    { id: 2, title: "Design admin sidebar", owner: "Ayesha Khan", email: "ayesha.khan@gmail.com", phone: "+91 99887 66554", date: "20 Aug 2026", status: "Pending" },
    { id: 3, title: "Fix pagination component", owner: "Rohit Sharma", email: "rohit.sharma@gmail.com", phone: "+91 90123 45678", date: "22 Aug 2026", status: "Completed" },
    { id: 4, title: "Write signup validation", owner: "Sara Ali", email: "sara.ali@outlook.com", phone: "+91 93456 78901", date: "24 Aug 2026", status: "Pending" },
    { id: 5, title: "Connect mongo database", owner: "Imran Qureshi", email: "imran.q@yahoo.com", phone: "+91 97654 32109", date: "26 Aug 2026", status: "Overdue" },
    { id: 6, title: "Add search debounce logic", owner: "Neha Verma", email: "neha.verma@gmail.com", phone: "+91 91234 56789", date: "28 Aug 2026", status: "Completed" },
    { id: 7, title: "Build analytics cards", owner: "Faisal Ahmed", email: "faisal.ahmed@gmail.com", phone: "+91 96543 21098", date: "30 Aug 2026", status: "Pending" },
    { id: 8, title: "Refresh token flow test", owner: "Priya Nair", email: "priya.nair@gmail.com", phone: "+91 95432 10987", date: "01 Sep 2026", status: "Completed" },
    { id: 9, title: "Setup protected routes", owner: "Bilal Sheikh", email: "bilal.sheikh@gmail.com", phone: "+91 94321 09876", date: "03 Sep 2026", status: "Pending" },
    { id: 10, title: "Table design scss cleanup", owner: "Ananya Gupta", email: "ananya.g@gmail.com", phone: "+91 93210 98765", date: "05 Sep 2026", status: "Completed" },
    { id: 11, title: "Toast message styling", owner: "Hamza Tariq", email: "hamza.tariq@gmail.com", phone: "+91 92109 87654", date: "07 Sep 2026", status: "Overdue" },
    { id: 12, title: "Deploy build to server", owner: "Meera Joshi", email: "meera.joshi@gmail.com", phone: "+91 91098 76543", date: "09 Sep 2026", status: "Pending" },
    { id: 13, title: "Dark mode toggle polish", owner: "Zul Kaif", email: "zulkaif@ilmiya.com", phone: "+91 98765 43210", date: "11 Sep 2026", status: "Completed" },
    { id: 14, title: "Axios interceptor retry", owner: "Sara Ali", email: "sara.ali@outlook.com", phone: "+91 93456 78901", date: "13 Sep 2026", status: "Pending" },
];

const AdminTodos = () => {
    const [searchItem, setSearchItem] = useState("");
    const [filterItem, setFilterItem] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Filtering / slicing happens on the static array above.
    const filteredTodos = allTodos.filter((todo) => {
        const text = `${todo.title} ${todo.owner} ${todo.email}`.toLowerCase();
        const matchSearch = text.includes(searchItem.toLowerCase());
        const matchFilter = filterItem === "all" || todo.status.toLowerCase() === filterItem;
        return matchSearch && matchFilter;
    });

    const total = filteredTodos.length;
    const pagedTodos = filteredTodos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                        onChange={(value) => { setSearchItem(value); setCurrentPage(1); }}
                        placeholder="Search todos by title, owner or email..."
                    />

                    <div className="toolbar-right">
                        <FilterDropdown
                            value={filterItem}
                            onChange={(value) => { setFilterItem(value); setCurrentPage(1); }}
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
                            {pagedTodos.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="empty-row">
                                        <FiInbox />
                                        <p>No todos found.</p>
                                    </td>
                                </tr>
                            ) : (
                                pagedTodos.map((todo) => (
                                    <tr key={todo.id}>
                                        <td>
                                            <div className="title-wrapper-div has-max-width">
                                                <div className="text-div">
                                                    <strong>{todo.title}</strong>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{todo.email}</td>
                                        <td>{todo.phone}</td>
                                        <td>{todo.date}</td>
                                    </tr>
                                ))
                            )}
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
