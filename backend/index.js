const mongoose = require('mongoose'); //don't forget to npm install to downlowad all the dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//create and .env file and replace the variables also dont forget to npm dotenv 
const PORT = process.env.PORT || 8081// add this to the .env file and plug the number for your backend port

const url = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

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

