import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import AdminSidebar from './AdminSidebar'

const titles = {
    "/admin/analytics": "Dashboard",
    "/admin/users": "All Users",
    "/admin/todos": "All Todo List",
};

// Shell for the admin area: sidebar on the left, topbar + page content on the right.
const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <div className="admin-shell">
            <AdminSidebar
                open={sidebarOpen}
                onNavigate={() => setSidebarOpen(false)}
            />

            <div
                className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            <div className="admin-main">
                <header className="admin-topbar">
                    <button
                        type="button"
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FiMenu />
                    </button>

                    <h2 className="topbar-title">{titles[pathname] || "Dashboard"}</h2>
                </header>

                <div className="admin-page">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
