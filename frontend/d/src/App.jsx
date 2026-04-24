import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

 const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';


  useEffect(() => { fetchTodos(); }, []);

  async function fetchTodos() {
    const res = await axios.get(`${apiBase}/api/todos`);
    setTodos(res.data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post(`${apiBase}/api/todos`, { title });
    setTitle('');
    fetchTodos();
  }

  async function toggleTodo(id, completed) {
    await axios.put(`${apiBase}/api/todos/${id}`, { completed: !completed });
    fetchTodos();
  }

  async function deleteTodo(id) {
    await axios.delete(`${apiBase}/api/todos/${id}`);
    fetchTodos();
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Todo App</h2>
      <form onSubmit={addTodo}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(t => (
          <li key={t._id}>
            <input type="checkbox" checked={t.completed} onChange={()=>toggleTodo(t._id, t.completed)} />
            {t.title}
            <button onClick={()=>deleteTodo(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
