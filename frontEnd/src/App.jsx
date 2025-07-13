import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {TaskList} from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';
import Footer from './components/Footer.jsx';
import './App.css'

function App() {

    
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/api/tasks" replace />} /> 
        <Route path="/api/tasks" element={<TaskList />} />
        <Route path="/api/newTask" element={<TaskForm />} />
        <Route path="/api/editTask/:id" element={<TaskForm />} />
        <Route path="/api/tasks/:id" element={<TaskItem />} />
      </Routes>
      <Footer/>
    </BrowserRouter>  

    
    </>
  )
}

export default App
