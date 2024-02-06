const mongoose = require('mongoose'); //don't forget to npm install to downlowad all the dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//create and .env file and replace the variables also dont forget to npm dotenv 
const PORT = process.env.PORT;// add this to the .env file and plug the number for your backend port

const url = process.env.MONGODB_URI;// add this to the .env

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  //this is the NoteSchema for mongoose 
const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model('notes', NoteSchema);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is working");
});

// Add Note
app.post("/add-note", async (req, res) => {
  try {
    const { content, important } = req.body;

    const note = new Note({ content, important });
    let result = await note.save();
    result = result.toObject();
    if (result) {
      res.status(201).json(result);
      console.log(result);
    } else {
      console.log("Failed to add note");
    }
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Note
app.put("/update-note/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, important } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, { content, important }, { new: true });
    if (updatedNote) {
      res.status(200).json(updatedNote);
      console.log(updatedNote);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Note
app.delete("/delete-note/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);
    if (deletedNote) {
      res.status(200).json(deletedNote);
      console.log(deletedNote);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
/// notes can show in the DOM 
app.get("/get-notes", async (req, res) => {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
