import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'

// Gates a branch of the router on a single role. Roles are kept strictly
// separate: an admin is not admitted to the user routes, or the other way round.
const RoleRoute = ({ allowedRole, children }) => {

    const { isAuth, currentUser, authChecked } = useSelector(
        (state) => state.userDetail
    );

    // App dispatches refreshToken() in an effect, so it has not resolved yet on the
    // first render. Deciding now would bounce a signed-in user to /signin on every
    // hard reload, before the cookie has even been checked.
    if (!authChecked) {
        return (
            <div className="route-loader">
                <ClipLoader color="#2181fa" size={50} />
            </div>
        )
    }

    if (!isAuth) {
        return <Navigate to="/signin" replace />
    }
    if (currentUser?.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />
    }
    return children;

}

export default RoleRoute
