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
    createdAt: new Date().toISOString().split('T')[0] 
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
    
    <div className="min-vh-100 bg-black text-light py-4 px-3">
    <div className="container bg-dark p-4 rounded shadow">
      <h2 className="mb-4">{id ? "✍🏻 Editar tarea" : "📝 Nueva tarea"}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título *</label>
          <input
            type="text"
            name="title"
            placeholder="Ingrese el título"
            value={formData.title}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción *</label>
          <textarea
            name="description"
            placeholder="Ingrese la descripción"
            value={formData.description}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Checkbox completada */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            id="completedCheck"
          />
          <label className="form-check-label" htmlFor="completedCheck">
            ¿Está completada?
          </label>
        </div>

        {/* Fecha de creación */}
        <div className="mb-3">
          <label className="form-label">Fecha de creación</label>
          <input
            type="text"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            readOnly
          />
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-between mt-4">
          <Link to="/tasks" className="btn btn-outline-light">
            ← Volver al menú
          </Link>
          <button type="submit" className="btn btn-primary fw-bold">
            {id ? "💾 Actualizar tarea" : "🟢 Guardar tarea"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default TaskForm; 

