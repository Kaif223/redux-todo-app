import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FiBarChart2, FiUsers, FiList, FiShield, FiLogOut } from 'react-icons/fi'
import { signOutUser, logout } from '../Features/UserSlice'
import { toast } from 'react-toastify'

const links = [
    { to: "/admin/analytics", label: "Analytics", icon: <FiBarChart2 /> },
    { to: "/admin/users", label: "All Users", icon: <FiUsers /> },
    { to: "/admin/todos", label: "All Todo List", icon: <FiList /> },
];

const AdminSidebar = ({ open, onNavigate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(signOutUser()).unwrap()
            toast.success("You have been logged out.")
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(logout())
            navigate('/signin', { replace: true })
        }
    };

    return (
        <aside className={`admin-sidebar ${open ? "open" : ""}`}>
            <NavLink to="/admin/analytics" className="sidebar-brand" onClick={onNavigate}>
                <span className="brand-mark">
                    <FiShield />
                </span>
                <span className="brand-text">
                    <strong>Todo Admin</strong>
                </span>
            </NavLink>

            <nav className="sidebar-nav">
                <p className="nav-label">Overview</p>

                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={onNavigate}
                        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button type="button" className="sidebar-link logout" onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar
