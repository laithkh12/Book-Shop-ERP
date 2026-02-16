// Script to import books from JSON file to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const fs = require('fs').promises;
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

async function importBooks() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Read JSON file
        const jsonPath = path.join(__dirname, '../data/books.json');
        const jsonData = await fs.readFile(jsonPath, 'utf8');
        const books = JSON.parse(jsonData);

        // Clear existing books (optional - remove if you want to keep existing)
        // await Book.deleteMany({});
        // console.log('🗑️  Cleared existing books');

        // Insert books
        await Book.insertMany(books);
        console.log(`✅ Successfully imported ${books.length} books to MongoDB`);

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error importing books:', error);
        process.exit(1);
    }
}

importBooks();
