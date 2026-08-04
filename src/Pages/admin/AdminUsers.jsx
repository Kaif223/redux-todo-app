import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FiEdit2, FiTrash2, FiInbox } from 'react-icons/fi'
import SearchBar from '../../Components/SearchBar'
import Pagination from '../../Components/Pagination'
import TableDropdown from '../../Components/TableDropdown'

// ---- static demo data ----
const staticUsers = [
    { id: 1, name: "Zul Kaif", email: "zulkaif@ilmiya.com", role: "Admin", todos: 42, joined: "12 Jan 2026", status: "Active" },
    { id: 2, name: "Ayesha Khan", email: "ayesha.khan@gmail.com", role: "User", todos: 18, joined: "03 Feb 2026", status: "Active" },
    { id: 3, name: "Rohit Sharma", email: "rohit.sharma@gmail.com", role: "User", todos: 7, joined: "21 Feb 2026", status: "Inactive" },
    { id: 4, name: "Sara Ali", email: "sara.ali@outlook.com", role: "Editor", todos: 26, joined: "08 Mar 2026", status: "Active" },
    { id: 5, name: "Imran Qureshi", email: "imran.q@yahoo.com", role: "User", todos: 11, joined: "17 Mar 2026", status: "Blocked" },
    { id: 6, name: "Neha Verma", email: "neha.verma@gmail.com", role: "User", todos: 33, joined: "02 Apr 2026", status: "Active" },
    { id: 7, name: "Faisal Ahmed", email: "faisal.ahmed@gmail.com", role: "Editor", todos: 15, joined: "19 Apr 2026", status: "Active" },
    { id: 8, name: "Priya Nair", email: "priya.nair@gmail.com", role: "User", todos: 4, joined: "05 May 2026", status: "Inactive" },
    { id: 9, name: "Bilal Sheikh", email: "bilal.sheikh@gmail.com", role: "User", todos: 29, joined: "23 May 2026", status: "Active" },
    { id: 10, name: "Ananya Gupta", email: "ananya.g@gmail.com", role: "Admin", todos: 51, joined: "11 Jun 2026", status: "Active" },
    { id: 11, name: "Hamza Tariq", email: "hamza.tariq@gmail.com", role: "User", todos: 9, joined: "27 Jun 2026", status: "Active" },
    { id: 12, name: "Meera Joshi", email: "meera.joshi@gmail.com", role: "User", todos: 22, joined: "14 Jul 2026", status: "Inactive" },
];

// First letters of the name, used for the round avatar.
const initials = (name) =>
    name.split(" ").map(part => part[0]).join("").slice(0, 2);

const AdminUsers = () => {
    const [users, setUsers] = useState(staticUsers);
    const [searchItem, setSearchItem] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Edit modal state
    const [showEdit, setShowEdit] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");

    // Filtering / slicing happens on the local users state.
    const filteredUsers = users.filter((user) => {
        const text = `${user.name} ${user.email} ${user.role}`.toLowerCase();
        return text.includes(searchItem.toLowerCase());
    });

    const total = filteredUsers.length;
    const pagedUsers = filteredUsers.slice(
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

    const openEditModal = (user) => {
        setEditUser(user);
        setEditName(user.name);
        setShowEdit(true);
    };

    const closeEditModal = () => {
        setShowEdit(false);
        setEditUser(null);
        setEditName("");
    };

    // Saves the new name straight into local state — no API call.
    const handleSave = (e) => {
        e.preventDefault();

        setUsers(users.map(user =>
            user.id === editUser.id
                ? { ...user, name: editName.trim() }
                : user
        ));

        closeEditModal();
    };

    const handleDelete = (user) => {
        setUsers(users.filter(item => item.id !== user.id));
    };

    const rowActions = (user) => [
        {
            label: "Edit user",
            icon: <FiEdit2 />,
            onClick: () => openEditModal(user)
        },
        {
            label: "Delete user",
            icon: <FiTrash2 className="delete-icon" />,
            danger: true,
            onClick: () => handleDelete(user)
        },
    ];

    return (
        <>
            <div className="page-head">
                <div>
                    <h1>All Users</h1>
                </div>
            </div>

            <div className="panel flush">
                <div className="table-toolbar">
                    <SearchBar
                        value={searchItem}
                        onChange={(value) => { setSearchItem(value); setCurrentPage(1); }}
                        placeholder="Search users by name, email or role..."
                    />
                </div>

                <div className="custom-table-div table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th className="aktinson-family">User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Todos</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pagedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="empty-row">
                                        <FiInbox />
                                        <p>No users found.</p>
                                    </td>
                                </tr>
                            ) : (
                                pagedUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="title-wrapper-div">
                                                <span className={`avatar-initials tone-${(index % 4) + 1}`}>
                                                    {initials(user.name)}
                                                </span>
                                                <div className="text-div">
                                                    <strong>{user.name}</strong>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-chip ${user.role === "Admin" ? "admin" : ""}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{user.todos}</td>
                                        <td>{user.joined}</td>
                                        <td>
                                            <TableDropdown items={rowActions(user)} />
                                        </td>
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

            {/* Edit user name popup */}
            <Modal
                show={showEdit}
                onHide={closeEditModal}
                centered
                dialogClassName="custom-modal"
            >
                <form onSubmit={handleSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <label htmlFor="editUserName">User name</label>
                        <input
                            id="editUserName"
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Enter user name"
                            autoFocus
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            type="button"
                            className="modal-btn"
                            onClick={closeEditModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="modal-btn primary"
                            disabled={!editName.trim()}
                        >
                            Save
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AdminUsers
