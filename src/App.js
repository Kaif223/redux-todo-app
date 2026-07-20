import { Routes, Route } from "react-router-dom";
import Todomain from './Pages/todomain.jsx';
import './App.scss'
import TodoListItems from "./Pages/TodoListItems.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todomain />} />
        <Route path="/add-todo" element={<TodoListItems />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;