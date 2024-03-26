import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewBook({books}){
    const { id } = useParams();
    const [book, setBook] = useState({});
    useEffect(() => {
      const selectedBook = books.find(book => book.id === parseInt(id));
      if (selectedBook) {
        setBook(selectedBook);
      }
    }, [books, id]);
    return (
        <div>
            <h1>Book Details</h1>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Publication year: {book.yearPublished}</p>
        </div>    
    );
}
export default ViewBook;