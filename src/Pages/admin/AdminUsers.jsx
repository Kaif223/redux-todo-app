import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal'
import { FiEdit2, FiTrash2, FiInbox } from 'react-icons/fi'
import SearchBar from '../../Components/SearchBar'
import Pagination from '../../Components/Pagination'
import TableDropdown from '../../Components/TableDropdown'
import { delUser, getUsers, editUserName } from '../../Features/UserSlice'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';


const initials = (name) =>
    name.split(" ").map(part => part[0]).join("").slice(0, 2);

const AdminUsers = () => {
    // const [users, setUsers] = useState(staticUsers);
    const [searchItem, setSearchItem] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { userData, loading, total, totalPages } = useSelector((state) => state.userDetail);
    // Safety net: a failed request or a logout can leave userData empty/absent,
    // and this table is rendered as soon as loading flips back to false.
    const users = Array.isArray(userData) ? userData : [];
    const dispatch = useDispatch();


    // Edit modal state
    const [showEdit, setShowEdit] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNamelast, setEditNamelast] = useState("");




    useEffect(() => {
        const params = {
            page: currentPage,
            limit: itemsPerPage,
        }
        if(debouncedSearch.trim()){
            params.search = debouncedSearch.trim();
        }
        dispatch(getUsers(params))
    }, [dispatch, currentPage, itemsPerPage, debouncedSearch])


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchItem);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchItem]);


    const paginationValue = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const openEditModal = (user) => {
        setEditUser(user);
        setEditName(user.firstName);
        setEditNamelast(user.lastName);
        setShowEdit(true);
    };

    const closeEditModal = () => {
        setShowEdit(false);
        setEditUser(null);
        setEditName("");
    };

    // Saves the new name straight into local state — no API call.
    const handleSave = async (e) => {
        e.preventDefault();
        let userDetail = {
            firstName: editName,
            lastName: editNamelast,
        }
        if (userDetail.firstName === "" || userDetail.lastName === "") {
            toast.error("please enter a value");
            return;
        }

        await dispatch(
            editUserName({
                id: editUser._id,
                userData: userDetail
            })
        )
        closeEditModal();
    };


    const handleDelete = (id) => {
        dispatch(delUser(id));
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
            onClick: () => handleDelete(user._id)
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
                        onChange={setSearchItem}
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
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan={6} className="empty-row">
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
                                users.length === 0 ?
                                    <tr>
                                        <td colSpan={6} className="empty-row">
                                            <FiInbox />
                                            <p>No users found.</p>
                                        </td>
                                    </tr>
                                    :
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="title-wrapper-div">
                                                    <span className={`avatar-initials tone-${(index % 4) + 1}`}>
                                                        {initials(user.firstName + " " + user.lastName)}
                                                    </span>
                                                    <div className="text-div">
                                                        <strong>{user.firstName} {user.lastName}</strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.userMail}</td>
                                            <td>
                                                <span className={`role-chip ${user.role === "Admin" ? "admin" : ""}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <TableDropdown items={rowActions(user)} />
                                            </td>
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
                        <div className="mb-3">
                            <label htmlFor="editUserName">first name</label>
                            <input
                                id="editUserName"
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter user name"
                                autoFocus
                            />
                        </div>
                        <label htmlFor="editUserNameLast">last name</label>
                        <input
                            id="editUserNameLast"
                            type="text"
                            value={editNamelast}
                            onChange={(e) => setEditNamelast(e.target.value)}
                            placeholder="Enter last name"
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
                            // disabled={!editName.trim()}
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
