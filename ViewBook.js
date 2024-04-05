import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewBook({books}){
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      const fetchBook = async () => {
          try {
              const response = await axios.get(`http://localhost:3001/api/books/${id}`);
              setBook(response.data);
          } catch (error) {
              setErrorMessage(error.message);
          }
      };

      fetchBook();
  }, [id]);
    return (
        <div>
            <h1>Book Details</h1>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Publication year: {book.yearPublished}</p>
            {errorMessage && <p>{errorMessage}</p>}
        </div>    
    );
}
export default ViewBook;