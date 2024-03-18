import React, { useEffect, useState } from "react";
import Input from "./todoinput";
import axios from "axios";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Head(){
  const[todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(()=>{
    axios.get('http://localhost:3000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  },[])

  const todoCheck =(id)=>{
    axios.put('http://localhost:3000/edit/'+id)
    .then(result =>{
      location.reload()
    })
    .catch(err => console.log(err))
  }

  const todoDelete = (id) =>{
    axios.delete('http://localhost:3000/delete/'+id)
    .then(result =>{
      location.reload()
    })
    .catch(err => console.log(err))
  }

  const startEditing = (id, task) => {
    setEditingId(id);
    setEditText(task);
  }

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  }

  const updateTodo = (id) => {
    axios.put(`http://localhost:3000/update/${id}`, { text: editText }) 
      .then(result => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === id) {
            return { ...todo, task: editText }; 
          }
          return todo;
        });
        setTodos(updatedTodos)
        setEditingId(null);
        setEditText("");
        location.reload();
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="head">
      <h2 style={{color:"#fff"}}>Todo List</h2>
      <Input/>
      <br/>
      {
        todos.length === 0 ? 
        <div>
          <h2 style={{color:"#fff"}}>No Tasks</h2>
        </div>:
        todos.map(todo => (
          <div className="tasks">
            <div className="check" onClick={()=>todoCheck(todo._id)}>
              {todo.completed ? 
              <BsFillCheckSquareFill className="icons"></BsFillCheckSquareFill>:
              <BsFillCheckSquareFill  className="icons"/>}
              {editingId === todo._id ? 
                  <input type="text" value={editText} onChange={handleEditChange} /> :
                  <p className={todo.completed ? "line" : ""}>{todo.task}</p>}
            </div>
            <div>
                {editingId === todo._id ?
                  <button className="save" onClick={() => updateTodo(todo._id)}>Save</button> :
                  <button onClick={() => startEditing(todo._id, todo.task)}><FaEdit className="icons" /></button>}
                <button onClick={() => todoDelete(todo._id)}><MdDeleteForever className="icons" /></button>
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default Head;