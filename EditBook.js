import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function EditBook({books, onUpdate}) {
    const { id } = useParams();
    const [book, setBook] = useState({ id: id, title: '', author: '', yearPublished: '' });
    useEffect(() => {
      const selectedBook = books.find(book => book.id === parseInt(id));
      book.yearPublished = parseInt(book.yearPublished);
      setBook(selectedBook);
    }, [books, id]);
    const handleInputChange = e => {
      const { name, value } = e.target;
      setBook(prevBook => ({
        ...prevBook,
        [name]: value
      }));
    };
    const handleSubmit = e => {
      e.preventDefault();
      onUpdate(book);
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
      </div>
    );
  }
  
  export default EditBook;
  