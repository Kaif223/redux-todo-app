import { Routes, Route, Navigate } from "react-router-dom";
import Todomain from './Pages/todomain.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import './Admin.scss'
import TodoListItems from "./Pages/TodoListItems.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Layout from "./Components/Layout.jsx";
import AdminLayout from "./Components/AdminLayout.jsx";
import AdminAnalytics from "./Pages/admin/AdminAnalytics.jsx";
import AdminUsers from "./Pages/admin/AdminUsers.jsx";
import AdminTodos from "./Pages/admin/AdminTodos.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers, refreshToken } from "./Features/UserSlice.js";
import RoleRoute from './Components/RoleRoute.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(refreshToken());
      // dispatch(getUsers());
    }
    checkAuth();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* Public auth routes (no navbar) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* <Route element={<ProtectedRoute />}> */}
        <Route
          element={
            <RoleRoute allowedRole="user">
              <Layout />
            </RoleRoute>
          }
        >
          <Route path="/" element={<Todomain />} />
          <Route path="/add-todo" element={<TodoListItems />} />
          <Route path="/add-todo/:id" element={<TodoListItems />} />
        </Route>
        {/* </Route> */}

        <Route path="/admin"
          element={
            <RoleRoute allowedRole="admin">
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="todos" element={<AdminTodos />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
