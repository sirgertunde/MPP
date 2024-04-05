import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function EditBook({books, onUpdate}) {
    const { id } = useParams();
    const [book, setBook] = useState({ id: id, title: '', author: '', yearPublished: '' });
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/books/${id}`);
          const selectedBook = response.data;
          setBook(selectedBook);
        } catch (error) {
          console.error('Error fetching book:', error);
          setErrorMessage("Error fetching book. Please try again.");

        }
      };
      fetchBook();
    }, [id]);
  
    const handleInputChange = e => {
      const { name, value } = e.target;
      setBook(prevBook => ({
        ...prevBook,
        [name]: value
      }));
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:3001/api/books/${id}`, book);
        onUpdate(book);
      } catch (error) {
        console.error('Error updating book:', error);
        setErrorMessage("Error updating book. Please try again.");

      }
    };
    return (
      <div>
        <h1>Edit Book</h1>
        <form onSubmit={handleSubmit}>
          <label>Title
            <input type="text" name="title" value={book.title} onChange={handleInputChange} />
          </label> 
          <label>Author
            <input type="text" name="author" value={book.author} onChange={handleInputChange} />
          </label>
          <label>Publication Year
            <input type="text" name="yearPublished" value={book.yearPublished} onChange={handleInputChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
  
  export default EditBook;
  