import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    createdAt: new Date().toLocaleDateString('es-AR') 
  });

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
        .then(res => res.json())
        .then(data => {        
          if (data.ok) {
            const task = data.payload.taskFoundById;           
            setFormData({
              title: task.title,
              description: task.description,
              completed: task.completed,
              createdAt: task.createdAt
            });
          } else {
            alert("Error al obtener la tarea");
          }
        })
        .catch(err => {
          console.error(err);
          alert("Error de conexión al cargar la tarea");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Completa los campos obligatorios");
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${import.meta.env.VITE_API_URL}/tasks/${id}`
      : `${import.meta.env.VITE_API_URL}/tasks`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: formData })
      });

      const data = await res.json();

                  
      if (res.ok) {
        alert(id ? "Tarea actualizada " : "Tarea creada ");
        navigate('/tasks');
      } else {
        alert(data.mensaje || "Error en la operación");
      }

    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    } 

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Editar tarea" : "Nueva tarea"}</h2>
      
      <div>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          Completada
        </label>
      </div>

      <div>
        <input
          type="text"
          name="createdAt"
          placeholder="Fecha de creación"
          value={formData.createdAt}
          onChange={handleChange}
        />
      </div>

      <button >
        <Link to={`/tasks`}> Volver al Menu</Link>
      </button>
      <button type="submit">
        {id ? "Actualizar tarea" : "Guardar tarea"}
      </button>
    </form>
  );
};

export default TaskForm; 

