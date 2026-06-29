import { Routes, Route } from "react-router-dom";
import Todomain from './Pages/todomain.jsx';
import './App.scss'
import TodoListItems from "./Pages/TodoListItems.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todomain />} />
        <Route path="/add-todo" element={<TodoListItems />} />
      </Routes>
    </div>
  );
}

export default App;