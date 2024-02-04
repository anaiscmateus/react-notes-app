import axios from 'axios';
//download npm i axios
const baseUrl = 'http://localhost:8080'; // Update with your backend URL
//this is for your backend



const apiService = {
  

  addNote: async (noteData) => { //creates a note 
    try {
      const response = await axios.post(`${baseUrl}/add-note`, noteData);
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  updateNote: async (noteId, updatedData) => { //helps update the notes
    try {
      const response = await axios.put(`${baseUrl}/update-note/${noteId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (noteId) => { //deletes notes by id
    try {
      const response = await axios.delete(`${baseUrl}/delete-note/${noteId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
  getNotes: async () => { //showing all notes on the dom
    try {
      const response = await axios.get(`${baseUrl}/get-notes`); 
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }
}

export default apiService;