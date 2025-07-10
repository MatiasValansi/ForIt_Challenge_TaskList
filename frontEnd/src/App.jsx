import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {TaskList} from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';
import './App.css'

function App() {

    
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/crear" element={<TaskForm />} />
        <Route path="/editar/:id" element={<TaskForm />} />
        <Route path="/tarea/:id" element={<TaskItem />} />
      </Routes>
    </BrowserRouter>  

    {/* <div className='App'>
    
    <TaskList></TaskList>
    
    </div> */}
    
      
      
    </>
  )
}

export default App
