import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "./BookList"
import AddBook from "./AddBook"
import EditBook from './EditBook';
import ViewBook from './ViewBook';
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };
  
  const handleDelete = async (booksToDelete) => {
    if (!Array.isArray(booksToDelete)) {
        booksToDelete = [booksToDelete];
    }
    try {
        const deleteRequests = booksToDelete.map((book) => axios.delete(`http://localhost:3001/api/books/${book.id}`));
        await Promise.all(deleteRequests);
        const updatedBooks = books.filter((book) => !booksToDelete.some((b) => b.id === book.id));
        setBooks(updatedBooks);
    } catch (error) {
        console.error('Error deleting book(s):', error);
    }
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
