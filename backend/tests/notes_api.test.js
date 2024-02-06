const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./app');

const api = supertest(app)
const Note = require('../index.js')

let token
const initialNotes = [
    { content: "Note 1", important: true },
    { content: "Note 2", important: false },
    // Add more initial notes as needed
]

beforeEach(async () => {
    await Note.deleteMany({})

    // User-related setup code is removed

    await Note.insertMany(initialNotes)
})

test('correct amount of notes is returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

test('identifying field is named id', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].id).toBeDefined()
})

test('a valid note can be added ', async () => {
    const initialResponse = await api.get('/api/notes')

    const newNote = {
        content: "New Note",
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        // Include any necessary authentication headers if required

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialResponse.body.length + 1)
})

test('if note is added with no importance, default will be assumed', async () => {
    const newNote = {
        content: "Note without importance",
    }

    const response = await api
        .post('/api/notes')
        .send(newNote)
        // Include any necessary authentication headers if required

    expect(response.body.important).toBeDefined()
})

test('if note is added with no content, it will not be added', async () => {
    const newNote = {
        important: true,
    }

    const response = await api
        .post('/api/notes')
        .send(newNote)
        // Include any necessary authentication headers if required

    expect(response.status).toBe(400)
})

test('a note may be removed by issuing http delete request', async () => {
    const newNote = {
        content: "Note to be deleted",
        important: false,
    }

    const result = await api
        .post('/api/notes')
        .send(newNote)
        // Include any necessary authentication headers if required

    const response = await api.get(`/api/notes/${result.body.id}`)
    const deleteNote = await api
        .delete(`/api/notes/${result.body.id}`)
        // Include any necessary authentication headers if required
    expect(deleteNote.status).toBe(204)
})

test('a note may be edited by issuing http put request', async () => {
    const newNote = {
        content: "Editable Note",
        important: true,
    }

    const result = await api
        .post('/api/notes')
        .send(newNote)
        // Include any necessary authentication headers if required

    newNote.important = false

    await api
        .put(`/api/notes/${result.body.id}`)
        .send(newNote)
        // Include any necessary authentication headers if required
    const newResult = await api.get(`/api/notes/${result.body.id}`)
    expect(newResult.body.important).toBe(newNote.important)
})

afterAll(() => {
    mongoose.connection.close()
})
