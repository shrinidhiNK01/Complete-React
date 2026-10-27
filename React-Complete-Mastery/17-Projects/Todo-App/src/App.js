import React, { useState, useEffect } from 'react';
import './styles/index.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const local = localStorage.getItem('mastery_todos');
    return local ? JSON.parse(local) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('mastery_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1>React Mastery Todo List</h1>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
