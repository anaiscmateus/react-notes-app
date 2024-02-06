const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
  // Dummy data for testing
  const dummyNote = {
    content: 'Test Note',
    important: true,
  };

  let addedNoteId;

  // Test the POST route
  it('should add a new note', async () => {
    const response = await request(app)
      .post('/add-note')
      .send(dummyNote)
      .expect(201);

    addedNoteId = response.body._id; // Assuming your Note model has _id

    expect(response.body.content).toBe(dummyNote.content);
    expect(response.body.important).toBe(dummyNote.important);
  });

  // Test the GET route
  it('should get all notes', async () => {
    const response = await request(app)
      .get('/get-notes')
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test the PUT route
  it('should update an existing note', async () => {
    const updatedNote = {
      content: 'Updated Note',
      important: false,
    };

    const response = await request(app)
      .put(`/update-note/${addedNoteId}`)
      .send(updatedNote)
      .expect(200);

    expect(response.body.content).toBe(updatedNote.content);
    expect(response.body.important).toBe(updatedNote.important);
  });

  // Test the DELETE route
  it('should delete an existing note', async () => {
    const response = await request(app)
      .delete(`/delete-note/${addedNoteId}`)
      .expect(200);

    expect(response.body._id).toBe(addedNoteId);
  });
});