import { useState } from "react";

function AddBook({ books, onAdd }) {
    const [book, setBook] = useState({ id: "", title: "", author: "", yearPublished: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        book.id = parseInt(book.id);
        book.yearPublished = parseInt(book.yearPublished);
        const existingBook = books.find((existingBook) => existingBook.id === book.id);
        if (existingBook) {
            setErrorMessage("A book with this ID already exists.");
        } else {
            onAdd(book);
            setBook({ id: "", title: "", author: "", yearPublished: "" });
            setErrorMessage("");
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