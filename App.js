import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "./BookList"
import AddBook from "./AddBook"
import EditBook from './EditBook';
import ViewBook from './ViewBook';

function App() {
  const [books, setBooks] = useState(() => {
  const savedBooks = localStorage.getItem('books');
  return savedBooks ? JSON.parse(savedBooks) : [
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
  });
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };
  const handleDelete = (bookToDelete) => {
    const updatedBooks = Array.isArray(bookToDelete) ?
        books.filter((book) => !bookToDelete.some((b) => b.id === book.id)) :
        books.filter((book) => book.id !== bookToDelete.id);
    setBooks(updatedBooks);
  };
  const handleUpdate = updatedBook => {
    const updatedBooks = books.map(book => 
      book.id === updatedBook.id ? {...updatedBook} : book
    );
    setBooks(updatedBooks);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<BookList books={books} onDelete={handleDelete}/>}></Route>
          <Route exact path="/add" element={<AddBook books={books} onAdd={handleAddBook}/>}></Route>
          <Route exact path="/edit/:id" element ={<EditBook books={books} onUpdate={handleUpdate}/>}></Route>
          <Route exact path="/view/:id" element ={<ViewBook books={books}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
