import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {TaskList} from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';
import './App.css'

function App() {

    
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} /> 
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/newTask" element={<TaskForm />} />
        <Route path="/editTask/:id" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskItem />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
