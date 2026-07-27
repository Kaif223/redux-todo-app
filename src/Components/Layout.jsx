import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Shell for the authenticated area: navbar on top, page content below.
const Layout = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
