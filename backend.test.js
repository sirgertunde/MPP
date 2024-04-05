const request = require('supertest');
const app = require('./index');
const axios = require('axios')

describe('Test CRUD endpoints', () => {
  let testBookId;

  test("POST /api/books should create a new book", async () => {
    const newBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      yearPublished: 2022
    };
    const response = await request(app).post("/api/books").send(newBook);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Book added successfully");
    expect(response.body.book).toEqual(newBook);
  });

  test('GET /api/books/:id should return the book with that id', async () => {
    const newBook = {
      id: 132,
      title: "Test Book",
      author: "Test Author",
      yearPublished: 2022
    };
    const createResponse = await request(app).post("/api/books").send(newBook);
    const createdBookId = createResponse.body.book.id;
    const response = await request(app).get(`/api/books/${createdBookId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test Book');
  });

  test('GET /api/books should return a list of all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("PATCH /api/books/:id should update the book", async () => {
    const updatedBookData = {
      author: "Updated Author"
    };
    const bookIdToUpdate = 1;
  
    const response = await request(app).patch(`/api/books/${bookIdToUpdate}`).send(updatedBookData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book updated successfully");
    expect(response.body.book.author).toBe(updatedBookData.author);
  });

test("DELETE /api/books/:id should delete the book", async () => {
  const newBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    yearPublished: 2022
  };
  const createResponse = await request(app).post("/api/books").send(newBook);
  const createdBookId = createResponse.body.book.id;
  const deleteResponse = await request(app).delete(`/api/books/${createdBookId}`);
    expect(deleteResponse.status).toBe(204);
});

  test('GET /api/books/:id should return 404 after deletion', async () => {
    const response = await request(app).get(`/api/books/${testBookId}`);
    expect(response.statusCode).toBe(404);
  });
});