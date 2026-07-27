import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FiLogOut, FiCheckSquare } from 'react-icons/fi'
import { signOutUser } from '../Features/UserSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await dispatch(signOutUser()).unwrap()
            navigate('/signin', { replace: true })
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="navbar">
            <NavLink to="/" className="navbar-brand">
                <FiCheckSquare className="navbar-brand-icon" />
                <span>My Todos</span>
            </NavLink>

            <nav className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                >
                    My Todos
                </NavLink>
                <NavLink
                    to="/add-todo"
                    className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                >
                    Add Todo
                </NavLink>
            </nav>

            <button type="button" className="logout-btn" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
            </button>
        </header>
    )
}

export default Navbar
