import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  // Add a note
  function addNote(newNote) {
    axios.post("http://localhost:5000/notes", newNote)
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data]);
      })
      .catch(error => {
        console.error("Error adding note:", error);
      });
  }

  // Delete a note
  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(error => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
