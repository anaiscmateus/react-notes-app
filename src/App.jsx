import React, { useState, useEffect } from 'react';
import apiService from './services/apiService';
import "./App.css"
function App() {
  const [content, setContent] = useState('');
  const [important, setImportant] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await apiService.getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const noteData = { content, important };
      await apiService.addNote(noteData);
      fetchNotes();
      window.alert('Note added successfully!');
    } catch (error) {
      console.error('Error adding note:', error);
      window.alert('Error adding note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await apiService.deleteNote(noteId);
      fetchNotes();
      window.alert('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      window.alert('Error deleting note. Please try again.');
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      await apiService.updateNote(noteId, updatedData);
      fetchNotes();
      window.alert('Note updated successfully!');
    } catch (error) {
      console.error('Error updating note:', error);
      window.alert('Error updating note. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create your Notes</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
          Important
        </label>
        <button className='buttonx' type="submit">Add Note</button>
      </form>

      <div>
        <h2>Note List</h2>
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <strong>{note.content}</strong>
              <span>{note.important ? ' (Important)' : '(Not Important)'}</span>
              <button className='delete' onClick={() => handleDeleteNote(note._id)}>Delete</button>
              <button className='update'
                onClick={() =>
                  handleUpdateNote(note._id, {
                    content: prompt('Enter updated content:', note.content),
                    important: confirm('Is it important?'),
                  })
                }
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

