import React from 'react'
import { FiUsers, FiList, FiCheckCircle, FiClock } from 'react-icons/fi'
import { getDashboardStats } from '../../Features/admin/adminThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// ---- static demo data ----

const monthly = [
    { month: "Jan", users: 18, todos: 42 },
    { month: "Feb", users: 26, todos: 55 },
    { month: "Mar", users: 21, todos: 38 },
    { month: "Apr", users: 34, todos: 61 },
    { month: "May", users: 29, todos: 47 },
    { month: "Jun", users: 41, todos: 72 },
    { month: "Jul", users: 36, todos: 58 },
    { month: "Aug", users: 45, todos: 80 },
];

const maxValue = 80;
const yTicks = [80, 60, 40, 20, 0];

const AdminAnalytics = () => {

    const dispatch = useDispatch();

    const { totalUsers, totalTodos } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);
    const stats = [
        { label: "Total Users", value: totalUsers, icon: <FiUsers />, tone: "" },
        { label: "Total Todos", value: totalTodos, icon: <FiList />, tone: "" },
        // { label: "Completed", value: "2,415", icon: <FiCheckCircle />, tone: "green" },
        // { label: "Pending", value: "1,257", icon: <FiClock />, tone: "yellow" },
    ];
    return (
        <>
            <div className="page-head">
                <div>
                    <h1>Analytics Dashboard</h1>
                </div>
            </div>

            {/* stat cards */}
            <div className="stat-grid">
                {stats.map((item) => (
                    <div className="stat-card" key={item.label}>
                        <div className="stat-top">
                            <span className={`stat-icon ${item.tone}`}>{item.icon}</span>
                        </div>

                        <p className="stat-label">{item.label}</p>
                        <p className="stat-value">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* bar graph */}
            <div className="panel">
                <div className="panel-head">
                    <div>
                        <h3>Users &amp; Todos Growth</h3>
                    </div>

                    <div className="chart-legend">
                        <span><i className="soft" /> New Users</span>
                        <span><i /> Todos Created</span>
                    </div>
                </div>

                <div className="bar-chart">
                    <div className="chart-y-axis">
                        {yTicks.map((tick) => (
                            <span key={tick}>{tick}</span>
                        ))}
                    </div>

                    <div className="chart-plot">
                        <div className="chart-lines">
                            {yTicks.map((tick) => (
                                <span key={tick} />
                            ))}
                        </div>

                        <div className="chart-bars">
                            {monthly.map((row) => (
                                <div className="bar-group" key={row.month}>
                                    <div className="bars">
                                        <div
                                            className="bar soft"
                                            style={{ height: `${(row.users / maxValue) * 100}%` }}
                                        >
                                            <span className="bar-tip">{row.users} users</span>
                                        </div>
                                        <div
                                            className="bar"
                                            style={{ height: `${(row.todos / maxValue) * 100}%` }}
                                        >
                                            <span className="bar-tip">{row.todos} todos</span>
                                        </div>
                                    </div>
                                    <p>{row.month}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAnalytics
