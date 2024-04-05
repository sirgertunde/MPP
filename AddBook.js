import { useState } from "react";
import axios from "axios";

function AddBook({books, onAdd}) {
    const [book, setBook] = useState({ id: "", title: "", author: "", yearPublished: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (books.some(existingBook => existingBook.id === parseInt(book.id))) {
            setErrorMessage("Book with this ID already exists.");
            return;
        }
        try {
            const id = parseInt(book.id);
            const yearPublished = parseInt(book.yearPublished);
            const newBook = {
                id,
                title: book.title,
                author: book.author,
                yearPublished
            };
            const response = await axios.post('http://localhost:3001/api/books', newBook);
            const addedBook = response.data.book;
            onAdd(addedBook);
            setBook({ id: "", title: "", author: "", yearPublished: "" });
            setErrorMessage("");
            return addedBook;
        } catch (error) {
            console.error('Error adding book:', error);
            setErrorMessage("Error adding book. Please try again.");
        }
    };
    
    const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
    };
    return (
        <div>
        <h1>Add book</h1>
        <form onSubmit={handleSubmit}>
            <label> ID
                <input type="text" name="id" placeholder="Enter id" value={book.id} onChange={handleChange}></input>
            </label>
            <label> Title
                <input type="text" name="title" placeholder="Enter title" value={book.title} onChange={handleChange}></input>
            </label>
            <label> Author
                <input type="text" name="author" placeholder="Enter author" value={book.author} onChange={handleChange}></input>
            </label>
            <label>Publication Year
                <input type="text" name="yearPublished" placeholder="Enter publication year" value={book.yearPublished} onChange={handleChange}></input>
            </label>
            <button type="submit">Add</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
export default AddBook;