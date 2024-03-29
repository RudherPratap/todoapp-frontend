import React, { useState } from "react";
import axios from 'axios';
function Input(){
  const [task, setTask] = useState()
  const addTodo = ()=>{
    axios.post('https://todoapp-backend-4wr0.onrender.com/api/todos', {task: task})
    .then(result =>
      location.reload())
    .catch(err => console.log(err))
  }
  return(
    <div className="form">
      <input type="text" placeholder="Enter tasks" onChange={(e)=> setTask(e.target.value)}/>
      <button type="button" onClick={addTodo}>Add</button>
    </div>
  )
}

export default Input;