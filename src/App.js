import React, {useState} from "react"
import './App.css';
import {Button} from "@mui/material"
import Task from "./Task"


function App() {
  const taskData = {Title: "Title", Description: "Description", Date: "9/29/2021"}
  const [tasks, setTasks] = useState([])
  const addTask = () => {
    setTasks([...tasks, taskData])
  }
  return (
    <div className="App" style={{padding: "20px", maxWidth: "750px", margin: "0px auto"}}>
      <h1 style={{textAlign: "center"}}>Task Manager</h1>
      <Button color="primary" variant="contained" onClick={addTask}>Add task</Button>
      {tasks.map((task) => (
        <Task Title={task.Title} Description={task.Description} Date={task.Date} />
      ))}
    </div>
  );
}

export default App;