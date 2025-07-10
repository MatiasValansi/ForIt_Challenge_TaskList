const API = import.meta.env.VITE_API_URL || 'http://localhost:3004/api';

export const fetchTasks = async () => {
  const res = await fetch(`${API}/tasks`);
  return await res.json();
};

export const fetchTaskById = async (id) => {
  const res = await fetch(`${API}/tasks/${id}`);
  return await res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  return await res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
};
