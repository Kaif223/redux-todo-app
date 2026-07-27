import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Guards the todo pages: only logged-in users get through,
// everyone else is sent to the sign in page.
const ProtectedRoute = () => {
    const isAuth = useSelector(state => state.userDetail.isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/signin" replace />
}

export default ProtectedRoute
