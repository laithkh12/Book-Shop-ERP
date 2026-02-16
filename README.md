# Book Shop ERP - Professional Bookstore Management System

A modern, single-page web application for managing bookstore inventory with real-time statistics and CRUD operations.

## 📋 Features

- **📚 Book Inventory Management**
  - View all books in a responsive table
  - Add new books with image support (URL or local assets)
  - Edit existing book details
  - Delete books with confirmation
  - Click on book title to view details

- **📊 Real-time Dashboard Statistics**
  - Total Books count
  - Total Revenue calculation
  - Total Orders tracking
  - Average Rating display
  - All stats update automatically when books are added, edited, or deleted

- **🎨 Modern UI/UX**
  - Clean, professional design
  - Smooth animations and transitions
  - Responsive layout that adapts to different screen sizes
  - Side panel for viewing/editing books
  - Hidden scrollbars for a cleaner look

- **💾 Data Persistence**
  - All data stored in MongoDB database
  - Changes persist across page reloads and sessions
  - Automatic data synchronization with server

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features (Flexbox, Grid, Gradients)
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript
- **Fetch API** - HTTP requests to backend

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
book-shop-erp/
│
├── index.html          # Single-page application
├── server.js           # Express server with MongoDB connection
├── package.json        # Node.js dependencies
├── .env                # Environment variables (MongoDB connection)
├── css/
│   └── style.css       # All styles (inventory, stats, panels)
├── js/
│   ├── model.js        # Book service with API calls
│   └── controller.js   # Business logic (CRUD operations, stats)
├── data/
│   └── defaultBooks.js # Default books data
├── models/
│   └── Book.js         # MongoDB Book model
├── scripts/
│   └── importBooks.js  # Script to import books from JSON
├── assets/             # Book cover images
│   ├── 1984.jpg
│   ├── Hobbit.webp
│   ├── The_Catcher_in_the_Rye.jpg
│   ├── The_Great_Gatsby.webp
│   ├── The_Hitchhikers_Guide_to_the_Galaxy.jpg
│   ├── The_Lord_of _the_Rings.jpg
│   ├── To_Kill_a_Mockingbird.jpg
│   └── shopping-header.jpeg
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas account** - [Sign up](https://www.mongodb.com/cloud/atlas) (free tier available)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd book-shop-erp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookshop?retryWrites=true&w=majority
   PORT=3000
   ```
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials
   - Make sure your IP address is whitelisted in MongoDB Atlas (Network Access)

4. **Start the server:**
```bash
npm start
```

5. **Open the application:**
   - Open your browser and navigate to `http://localhost:3000`
   - The server will automatically initialize the database with default books if it's empty

### Development Mode

For development with auto-reload:
```bash
npm run dev
```
(Requires `nodemon` - install with `npm install -g nodemon` or it's included in devDependencies)

## 📖 Usage

### Viewing Books
- All books are displayed in a table format
- Click on any book title to view its details in the side panel
- Click the "View" button for the same functionality

### Adding a Book
1. Click the "Add New Book" button
2. Fill in the form:
   - **Title** (required)
   - **Author** (required)
   - **Price** (required)
   - **Pages** (optional)
   - **Image** (required) - Enter either:
     - Full URL: `https://example.com/book-cover.jpg`
     - Local filename: `book-cover.jpg` (must be in assets folder)
   - **Rating** (required, 0-5)
3. Click "Add Book"
4. The book will appear in the table and stats will update automatically

### Editing a Book
1. Click the "Edit" button on any book row
2. Modify the details in the side panel form
3. Click "Update Book"
4. Changes are saved and reflected immediately

### Deleting a Book
1. Click the "Delete" button on any book row
2. Confirm the deletion
3. The book is removed and stats update automatically

## 🎯 Key Features Explained

### Image Support
The application supports two types of images:
- **URLs**: Full web addresses (e.g., `https://example.com/image.jpg`)
- **Local Files**: Filenames from the assets folder (e.g., `Hobbit.webp`)

### Real-time Statistics
All dashboard widgets update automatically:
- **Total Books**: Counts all books in inventory
- **Total Revenue**: Sum of all book prices
- **Total Orders**: Calculated as books × 10
- **Average Rating**: Average of all book ratings

### Data Persistence
- All data is stored in MongoDB database
- Backend API handles all CRUD operations
- Data persists across browser sessions and devices
- Automatic database initialization with default books
- Uses `map` and `filter` for array operations (UPDATE/DELETE)

## 🎨 Customization

### Adding Default Books
Edit `data/defaultBooks.js` to add or modify default books. The server will automatically insert them into MongoDB on first run if the database is empty.

### Importing Books from JSON
You can import books from a JSON file using the import script:
```bash
npm run import
```
Make sure your `data/books.json` file is properly formatted.

### Styling
All styles are in `css/style.css`. Key sections:
- Stats widgets: `.stats-section`, `.stat-card`
- Inventory table: `.inventory-table`, `.table-container`
- Side panel: `.side-panel`, `.panel-content`

### Colors
The application uses gradient backgrounds. Modify the gradient values in `css/style.css` to change the color scheme.

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Table and side panel side-by-side
- **Tablet/Mobile**: Side panel becomes a slide-in drawer
- **All sizes**: Stats widgets stack vertically on smaller screens

## 🔧 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

Created as part of Full Stack Course - Lesson 10

## 🔌 API Endpoints

The server provides the following REST API endpoints:

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book by ID (uses `map` for array operations)
- `DELETE /api/books/:id` - Delete a book by ID (uses `filter` for array operations)

## 🗄️ Database

- **Database**: MongoDB Atlas (cloud)
- **Collection**: `books`
- **Model**: Defined in `models/Book.js`
- **Initialization**: Default books are automatically inserted on first server start

## 🙏 Acknowledgments

- Modern CSS techniques for responsive design
- Express.js for backend API
- MongoDB for data persistence
- Vanilla JavaScript for framework-free frontend development
- Map/Filter functions for efficient array operations

---

**Note**: This application requires a running server and MongoDB connection. Make sure the server is running before accessing the frontend.
