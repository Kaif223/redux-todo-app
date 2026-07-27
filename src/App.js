import { Routes, Route } from "react-router-dom";
import Todomain from './Pages/todomain.jsx';
import './App.scss'
import TodoListItems from "./Pages/TodoListItems.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Layout from "./Components/Layout.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "./Features/UserSlice.js";


function App() {
      const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* Public auth routes (no navbar) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected routes — require login, wrapped with the navbar layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Todomain />} />
            <Route path="/add-todo" element={<TodoListItems />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
