// Book Service - Makes API calls to server
// Base URL for the API server
const API_BASE_URL = 'http://localhost:3000/api/books';

// Default books loaded from data/defaultBooks.js (loaded via script tag in HTML)
// Use window.defaultBooks directly (already defined in defaultBooks.js)
// If not available, use empty array as fallback
const getDefaultBooks = () => {
    return (typeof window !== 'undefined' && window.defaultBooks) ? window.defaultBooks : [];
};

// Data stored in array variable
let Gdata = [];

// Book Service Object with CRUD operations using map/filter
const bookService = {
    // READ - Get all books from server
    async getAllBooks() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const books = await response.json();
            Gdata = books;
            return Gdata;
        } catch (error) {
            console.error('Error fetching books from server:', error);
            console.log('Using default books as fallback');
            // Fallback to default books if server is not available
            Gdata = [...getDefaultBooks()];
            return Gdata;
        }
    },

    // READ - Get single book by ID
    async getBookById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const book = await response.json();
            // Update local array using map
            Gdata = Gdata.map(b => b.id === id ? book : b);
            return book;
        } catch (error) {
            console.error('Error fetching book:', error);
            // Fallback: try to find in local array using filter
            const foundBooks = Gdata.filter(b => b.id === id);
            return foundBooks.length > 0 ? foundBooks[0] : null;
        }
    },

    // CREATE - Add new book to server
    async createBook(bookData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newBook = await response.json();
            // Add to local array
            Gdata = [...Gdata, newBook];
            return newBook;
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    },

    // UPDATE - Update existing book on server
    async updateBook(id, bookData) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedBook = await response.json();
            // Update local array using map
            Gdata = Gdata.map(book =>
                book.id === id
                    ? { ...book, ...updatedBook }
                    : book
            );
            return updatedBook;
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    },

    // DELETE - Delete book from server
    async deleteBook(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Remove from local array using filter
            Gdata = Gdata.filter(book => book.id !== id);
            return true;
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    }
};

// Initialize: Load books from server on page load
bookService.getAllBooks().then(() => {
    console.log('Books loaded from server:', Gdata);
});
