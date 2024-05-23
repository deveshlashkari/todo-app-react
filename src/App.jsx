import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editInput, setEditInput] = useState("");

  const addTodo = () => {
    if (userInput.trim()) {
      setTodos([
        ...todos,
        { text: userInput, completed: false, isEditing: false },
      ]);
      setUserInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleEdit = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isEditing: !todo.isEditing };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditInput(todos[index].text);
  };

  const saveEdit = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, text: editInput, isEditing: false };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 ">Todo App</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border rounded-l px-4 py-2 w-full"
              placeholder="Buy Groceries..."
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white rounded-r px-4 py-2"
            >
              Add
            </button>
          </div>
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-2 border-b ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="border rounded px-2 py-1 w-full mr-2"
                    />
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 text-white rounded px-2 py-1 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => toggleEdit(index)}
                      className="bg-gray-500 text-white rounded px-2 py-1"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span onClick={() => toggleComplete(index)}>
                      {todo.text}
                    </span>
                    <div className="flex">
                      <button
                        onClick={() => toggleEdit(index)}
                        className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(index)}
                        className="bg-red-500 text-white rounded px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
