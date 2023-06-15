import NoteContext from "./noteContext";
import { useState } from "react";
const URL = process.env.REACT_APP_SERVER_DB;
const NoteState = (props) => {
  const host = "http://localhost:5000"
  // const host = URL;

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes/Tasks
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/fetchalltask`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YTNiZmUyY2M3NzFhOTQ5OWIyNTFmIn0sImlhdCI6MTY4MzYzNjA2M30.8B1ZEeyiO1grBaVdHMNukkwYgMOD8PDsORp_nBBDMXw"
      }
    });
    const json = await response.json() 
    console.log(json);
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/tasks/addTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;