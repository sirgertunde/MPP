const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

let books = [
    {id: 1, title: "Atomic Habits", author: "James Clear", yearPublished: 2018},
    {id: 2, title: "Throne of Glass", author: "Sarah J Maas", yearPublished: 2012},
    {id: 3, title: "Crown of Midnight", author: "Sarah J Maas", yearPublished: 2013},
    {id: 4, title: "Heir of Fire", author: "Sarah J Maas", yearPublished: 2014},
    {id: 5, title: "Queen of Shadows", author: "Sarah J Maas", yearPublished: 2015},
    {id: 6, title: "Empire of Storms", author: "Sarah J Maas", yearPublished: 2016},
    {id: 7, title: "Tower of Dawn", author: "Sarah J Maas", yearPublished: 2017},
    {id: 8, title: "Kingdom of Ash", author: "Sarah J Maas", yearPublished: 2018},
    {id: 9, title: "LOTR The Fellowship of the Ring", author: "J R R Tolkien", yearPublished: 1954},
    {id: 10, title: "LOTR The Two Towers", author: "J R R Tolkien", yearPublished: 1954},
    {id: 11, title: "LOTR The Return of the King", author: "J R R Tolkien", yearPublished: 1955}
];

app.post("/api/books", (req, res) =>{
  const {id, title, author, yearPublished} = req.body;
  const newBook = {id, title, author, yearPublished};
  books.push(newBook);
  res.status(201).json({ message: "Book added successfully", book: newBook });
})

app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if (!book) {
      return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(book);
});

app.get("/api/books", (req, res) => {
  const booksWithIntegerFields = books.map(book => ({
    ...book,
    id: parseInt(book.id),
    yearPublished: parseInt(book.yearPublished)
  }));
  res.status(200).json(booksWithIntegerFields);
});

app.patch("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(book => book.id === parseInt(id));
  if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
  }
  books[bookIndex] = { ...books[bookIndex], ...req.body };
  res.status(200).json({ message: "Book updated successfully", book: books[bookIndex] });
});

app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    console.error(`Book with ID ${id} not found.`);
    return res.status(404).json({ error: "Book not found" });
  }
  const updatedBooks = books.filter(book => book.id !== id);
  books = updatedBooks;
  return res.status(204).end();
});

app.listen(port, () => {
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});

module.exports = app;
