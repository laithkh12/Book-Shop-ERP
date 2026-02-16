// Express server for Book Shop ERP with MongoDB
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const defaultBooks = require('./data/defaultBooks.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Parse JSON bodies
app.use(express.static('.')); // Serve static files (HTML, CSS, JS, images)

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Initialize database with default books if empty
async function initializeDatabase() {
    try {
        const bookCount = await Book.countDocuments();
        if (bookCount === 0) {
            console.log('📚 Database is empty, inserting default books...');
            // Convert defaultBooks to array format for insertMany
            await Book.insertMany(defaultBooks);
            console.log(`✅ Inserted ${defaultBooks.length} default books`);
        } else {
            console.log(`📚 Database already has ${bookCount} books`);
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// GET all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ id: 1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// GET single book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: parseInt(req.params.id) });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// POST create new book
app.post('/api/books', async (req, res) => {
    try {
        // Get all books to find max ID
        const allBooks = await Book.find();
        const maxId = allBooks.length > 0 
            ? Math.max(...allBooks.map(b => b.id)) 
            : 0;
        
        const newBook = new Book({
            id: maxId + 1,
            ...req.body
        });
        
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create book' });
    }
});

// PUT update book by ID
app.put('/api/books/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        
        // Get all books, use map to update (as requested)
        const allBooks = await Book.find();
        const updatedBooks = allBooks.map(book =>
            book.id === bookId
                ? { ...book.toObject(), ...req.body }
                : book.toObject()
        );
        
        const updatedBookData = updatedBooks.find(b => b.id === bookId);
        if (updatedBookData) {
            // Update in database
            const updatedBook = await Book.findOneAndUpdate(
                { id: bookId },
                { $set: req.body },
                { new: true }
            );
            res.json(updatedBook);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// DELETE book by ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        
        // Get all books, use filter to remove (as requested)
        const allBooks = await Book.find();
        const filteredBooks = allBooks.filter(book => book.id !== bookId);
        
        if (filteredBooks.length < allBooks.length) {
            await Book.findOneAndDelete({ id: bookId });
            res.json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

// Start server
async function startServer() {
    await connectDB();
    await initializeDatabase();
    
    app.listen(PORT, () => {
        console.log(`🚀 Book Shop ERP Server running on http://localhost:${PORT}`);
        console.log(`📚 API available at http://localhost:${PORT}/api/books`);
        console.log(`💾 Data stored in MongoDB`);
    });
}

startServer().catch(console.error);
