import { Link } from "react-router-dom";
import {useState} from "react";

function BookList({books, onDelete}){
    const [showConfirmation, setShowConfirmation] = useState(false);
    const[selectedBook,  setSelectedBook] = useState(null);
    const [selectedForDelete, setSelectedForDelete] = useState([]);
    const [selectedForExport, setSelectedForExport] = useState([]);
    const openConfirmation = (book) => {
        setSelectedBook(book);
        setShowConfirmation(true);
    };
    const closeConfirmation = () => {
        setSelectedBook(null);
        setShowConfirmation(false);
    };
    const confirmDelete = () => {
        onDelete(selectedBook);
        closeConfirmation();
    };
    
    const toggleDelete = (bookId) => {
        setSelectedForDelete((prevSelected) => {
            if (prevSelected.includes(bookId)) {
              return prevSelected.filter((id) => id !== bookId);
            } else {
              return [...prevSelected, bookId];
            }
          });
    };

    const toggleExport = (bookId) => {
        if (selectedForExport.includes(bookId)) {
          setSelectedForExport(selectedForExport.filter((id) => id !== bookId));
        } else {
          setSelectedForExport([...selectedForExport, bookId]);
        }
    };

    const handleBulkDelete = () => {
        const booksToDelete = books.filter((book) => selectedForDelete.includes(book.id));
        onDelete(booksToDelete);
        setSelectedForDelete([]);
    };

    return (
        <div class="books-page">
            <h1>Books</h1>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Actions</th>
                    <th>Select to export</th>
                    <th>Select to delete</th>
                </tr>
                {books.map(book =>
                    <tr>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                            <Link to={`/edit/${book.id}`}><button>Edit</button></Link>
                            <button onClick={() => openConfirmation(book)}>Delete</button> 
                            <Link to={`/view/${book.id}`}><button>View</button></Link>
                        </td>
                        <td>
                            <input type="checkbox" checked={selectedForExport.includes(book.id)} onChange={() => toggleExport(book.id)}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={selectedForDelete.includes(book.id)} onChange={() => toggleDelete(book.id)}/>
                        </td>
                    </tr>
                    )
                }
            </table>
            <ExportButton data={books} selectedForExport={selectedForExport} disabled={selectedForExport.length === 0}/>
            <button onClick={handleBulkDelete} disabled={selectedForDelete.length === 0}>Delete selected</button>
            <Link to="/add">
                <button>Add book</button>
            </Link>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete "{selectedBook.title}"?</p>
                        <div>
                            <button onClick={confirmDelete}>Yes</button>
                            <button onClick={closeConfirmation}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ExportButton({ data, selectedForExport, disabled }) {
    const handleExport = () => {
        const selectedBooks = data.filter((book) => selectedForExport.includes(book.id));
        const json = JSON.stringify(selectedBooks);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'books.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
  
    return (
      <button onClick={handleExport} disabled={disabled}>Export</button>
    );
  }
  
export default BookList;