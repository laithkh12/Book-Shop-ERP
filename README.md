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
  - All data stored in browser localStorage
  - Changes persist across page reloads
  - Automatic data saving

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern features (Flexbox, Grid, Gradients)
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript
- **localStorage API** - Data persistence

## 📁 Project Structure

```
book-shop-erp/
│
├── index.html          # Single-page application
├── css/
│   └── style.css       # All styles (inventory, stats, panels)
├── js/
│   ├── model.js        # Data model (Gdata array)
│   └── controller.js   # Business logic (CRUD operations, stats)
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

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-shop-erp
```

2. Open `index.html` in your web browser

   **Option 1: Direct File**
   - Simply double-click `index.html` to open it in your default browser

   **Option 2: Local Server (Recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   Then open `http://localhost:8000` in your browser

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
- All data is stored in browser localStorage
- No backend required
- Data persists across browser sessions
- To reset data, clear browser localStorage

## 🎨 Customization

### Adding Default Books
Edit `js/model.js` to add or modify default books in the `defaultGdata` array.

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

## 🙏 Acknowledgments

- Modern CSS techniques for responsive design
- localStorage API for client-side data persistence
- Vanilla JavaScript for framework-free development

---

**Note**: This is a front-end only application. All data is stored locally in the browser's localStorage. For production use, consider implementing a backend database.
