// Controller to inject data from model.js into the inventory table

// Helper function to get image source (handles URLs and local assets)
function getImageSrc(imagePath) {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    return `assets/${imagePath}`;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Gdata exists
    if (typeof Gdata === 'undefined') {
        console.error('Gdata is not defined. Make sure model.js is loaded before controller.js');
        return;
    }

    // Update stats and load table on page load
    updateStats();
    loadTable();
});

// Function to update dashboard stats
function updateStats() {
    // Check if Gdata exists, if not use empty array
    const books = (typeof Gdata !== 'undefined' && Gdata) ? Gdata : [];
    const bookCount = books.length;

    // Update total books
    const totalBooksElement = document.getElementById('totalBooks');
    if (totalBooksElement) {
        totalBooksElement.textContent = bookCount;
    }

    // Calculate total revenue (sum of all book prices)
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        const totalRevenue = bookCount > 0 
            ? books.reduce((sum, book) => sum + (book.price || 0), 0)
            : 0;
        totalRevenueElement.textContent = `$${totalRevenue.toFixed(2)}`;
    }

    // Update total orders (can be calculated or set to a default)
    const totalOrdersElement = document.getElementById('totalOrders');
    if (totalOrdersElement) {
        // For now, we'll use a simple calculation based on books
        totalOrdersElement.textContent = bookCount * 10; // Example: 10 orders per book
    }

    // Calculate average rating
    const avgRatingElement = document.getElementById('avgRating');
    if (avgRatingElement) {
        if (bookCount > 0) {
            const avgRating = books.reduce((sum, book) => sum + (book.rating || 0), 0) / bookCount;
            avgRatingElement.textContent = avgRating.toFixed(1);
        } else {
            avgRatingElement.textContent = '0.0';
        }
    }
}

// Function to load and refresh table
function loadTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }
    
    // Check if Gdata exists
    if (typeof Gdata === 'undefined') {
        console.error('Gdata is not defined');
        return;
    }

    // Clear any existing content
    tableBody.innerHTML = '';

    // Loop through Gdata and create table rows
    Gdata.forEach((book, index) => {
        const row = document.createElement('tr');
        
        // Create image cell
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = getImageSrc(book.image);
        image.alt = book.title;
        image.className = 'book-thumbnail';
        image.onerror = function() {
            this.src = 'assets/shopping-header.jpeg'; // Fallback image
        };
        imageCell.appendChild(image);
        
        // Create title cell
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        titleCell.className = 'book-title-cell';
        titleCell.style.cursor = 'pointer';
        titleCell.onclick = () => viewBook(index);
        titleCell.title = 'Click to view book details';
        
        // Create author cell
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        
        // Create price cell
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${book.price.toFixed(2)}`;
        priceCell.className = 'price-cell';
        
        // Create pages cell
        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages || 'N/A';
        
        // Create rating cell
        const ratingCell = document.createElement('td');
        ratingCell.innerHTML = `<span class="rating-badge">⭐ ${book.rating}</span>`;
        
        // Create actions cell
        const actionsCell = document.createElement('td');
        actionsCell.className = 'actions-cell';
        
        // View button
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View';
        viewBtn.className = 'btn btn-view';
        viewBtn.onclick = () => viewBook(index);
        actionsCell.appendChild(viewBtn);
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn btn-edit';
        editBtn.onclick = () => editBook(index);
        actionsCell.appendChild(editBtn);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.onclick = () => deleteBook(index);
        actionsCell.appendChild(deleteBtn);
        
        // Append all cells to row
        row.appendChild(imageCell);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(priceCell);
        row.appendChild(pagesCell);
        row.appendChild(ratingCell);
        row.appendChild(actionsCell);
        
        // Append row to table body
        tableBody.appendChild(row);
    });
}

// Function to view book details
function viewBook(index) {
    if (typeof Gdata === 'undefined' || !Gdata[index]) {
        console.error('Book not found');
        return;
    }
    
    const book = Gdata[index];
    const panel = document.getElementById('sidePanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    
    panelTitle.textContent = 'Book Details';
    panelContent.innerHTML = `
        <div class="book-details-view">
            <div class="book-image-large">
                <img src="${getImageSrc(book.image)}" alt="${book.title}" onerror="this.src='assets/shopping-header.jpeg'">
            </div>
            <div class="book-info-large">
                <h2 class="book-title-large">${book.title}</h2>
                <p class="book-author-large">by ${book.author}</p>
                <div class="book-meta">
                    <div class="meta-item">
                        <span class="meta-label">Price:</span>
                        <span class="meta-value">$${book.price.toFixed(2)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Pages:</span>
                        <span class="meta-value">${book.pages || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Rating:</span>
                        <span class="meta-value rating-large">⭐ ${book.rating}</span>
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="editBook(${index})">Edit Book</button>
                    <button class="btn btn-secondary" onclick="closePanel()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    openPanel();
}

// Function to edit book
function editBook(index) {
    if (typeof Gdata === 'undefined' || !Gdata[index]) {
        console.error('Book not found');
        return;
    }
    
    const book = Gdata[index];
    const panel = document.getElementById('sidePanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    
    panelTitle.textContent = 'Edit Book';
    panelContent.innerHTML = `
        <form id="editBookForm" class="book-form">
            <div class="form-group">
                <label for="editTitle">Title *</label>
                <input type="text" id="editTitle" name="title" value="${book.title}" required>
            </div>
            
            <div class="form-group">
                <label for="editAuthor">Author *</label>
                <input type="text" id="editAuthor" name="author" value="${book.author}" required>
            </div>
            
            <div class="form-group">
                <label for="editPrice">Price *</label>
                <input type="number" id="editPrice" name="price" step="0.01" min="0" value="${book.price}" required>
            </div>
            
            <div class="form-group">
                <label for="editPages">Pages</label>
                <input type="number" id="editPages" name="pages" min="0" value="${book.pages || ''}">
            </div>
            
            <div class="form-group">
                <label for="editImage">Image (URL or filename) *</label>
                <input type="text" id="editImage" name="image" value="${book.image}" placeholder="https://example.com/image.jpg or filename.jpg" required>
                <small class="form-hint">Enter full URL (http://...) or filename from assets folder</small>
            </div>
            
            <div class="form-group">
                <label for="editRating">Rating *</label>
                <input type="number" id="editRating" name="rating" step="0.1" min="0" max="5" value="${book.rating}" required>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Update Book</button>
                <button type="button" class="btn btn-secondary" onclick="closePanel()">Cancel</button>
            </div>
        </form>
    `;
    
    // Add form submit handler
    const form = document.getElementById('editBookForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEditedBook(index);
    });
    
    openPanel();
}

// Function to save edited book
function saveEditedBook(index) {
    const updatedBook = {
        title: document.getElementById('editTitle').value.trim(),
        author: document.getElementById('editAuthor').value.trim(),
        price: parseFloat(document.getElementById('editPrice').value),
        pages: document.getElementById('editPages').value ? parseInt(document.getElementById('editPages').value) : undefined,
        image: document.getElementById('editImage').value.trim(),
        rating: parseFloat(document.getElementById('editRating').value)
    };
    
    // Validate required fields
    if (!updatedBook.title || !updatedBook.author || !updatedBook.image || isNaN(updatedBook.price) || isNaN(updatedBook.rating)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate rating range
    if (updatedBook.rating < 0 || updatedBook.rating > 5) {
        alert('Rating must be between 0 and 5');
        return;
    }
    
    // Update book in Gdata array
    Gdata[index] = updatedBook;
    
        // Save to localStorage
        if (typeof saveToLocalStorage === 'function') {
            saveToLocalStorage();
        } else {
            localStorage.setItem('bookShopData', JSON.stringify(Gdata));
        }
        
        // Reload table, update stats, and close panel
        loadTable();
        updateStats();
        closePanel();
        alert('Book updated successfully!');
}

// Function to delete book
function deleteBook(index) {
    if (typeof Gdata === 'undefined' || !Gdata[index]) {
        console.error('Book not found');
        return;
    }
    
    const book = Gdata[index];
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
        // Remove book from Gdata array
        Gdata.splice(index, 1);
        // Save to localStorage
        if (typeof saveToLocalStorage === 'function') {
            saveToLocalStorage();
        } else {
            localStorage.setItem('bookShopData', JSON.stringify(Gdata));
        }
        // Reload table, update stats, and close panel if open
        loadTable();
        updateStats();
        closePanel();
    }
}

// Function to show add book form
function showAddBookForm() {
    const panel = document.getElementById('sidePanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    
    panelTitle.textContent = 'Add New Book';
    panelContent.innerHTML = `
        <form id="addBookForm" class="book-form">
            <div class="form-group">
                <label for="addTitle">Title *</label>
                <input type="text" id="addTitle" name="title" required>
            </div>
            
            <div class="form-group">
                <label for="addAuthor">Author *</label>
                <input type="text" id="addAuthor" name="author" required>
            </div>
            
            <div class="form-group">
                <label for="addPrice">Price *</label>
                <input type="number" id="addPrice" name="price" step="0.01" min="0" required>
            </div>
            
            <div class="form-group">
                <label for="addPages">Pages</label>
                <input type="number" id="addPages" name="pages" min="0">
            </div>
            
            <div class="form-group">
                <label for="addImage">Image (URL or filename) *</label>
                <input type="text" id="addImage" name="image" placeholder="https://example.com/image.jpg or filename.jpg" required>
                <small class="form-hint">Enter full URL (http://...) or filename from assets folder</small>
            </div>
            
            <div class="form-group">
                <label for="addRating">Rating *</label>
                <input type="number" id="addRating" name="rating" step="0.1" min="0" max="5" required>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Add Book</button>
                <button type="button" class="btn btn-secondary" onclick="closePanel()">Cancel</button>
            </div>
        </form>
    `;
    
    // Add form submit handler
    const form = document.getElementById('addBookForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveNewBook();
    });
    
    openPanel();
}

// Function to save new book
function saveNewBook() {
    const newBook = {
        title: document.getElementById('addTitle').value.trim(),
        author: document.getElementById('addAuthor').value.trim(),
        price: parseFloat(document.getElementById('addPrice').value),
        pages: document.getElementById('addPages').value ? parseInt(document.getElementById('addPages').value) : undefined,
        image: document.getElementById('addImage').value.trim(),
        rating: parseFloat(document.getElementById('addRating').value)
    };
    
    // Validate required fields
    if (!newBook.title || !newBook.author || !newBook.image || isNaN(newBook.price) || isNaN(newBook.rating)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate rating range
    if (newBook.rating < 0 || newBook.rating > 5) {
        alert('Rating must be between 0 and 5');
        return;
    }
    
    // Add book to Gdata array
    Gdata.push(newBook);
    
        // Save to localStorage
        if (typeof saveToLocalStorage === 'function') {
            saveToLocalStorage();
        } else {
            localStorage.setItem('bookShopData', JSON.stringify(Gdata));
        }
        
        // Reload table, update stats, and close panel
        loadTable();
        updateStats();
        closePanel();
        alert('Book added successfully!');
}

// Function to close side panel
function closePanel() {
    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('panelOverlay');
    const layout = document.querySelector('.inventory-layout');
    panel.classList.remove('active');
    if (layout) {
        layout.classList.remove('panel-active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Function to open panel (with overlay on mobile)
function openPanel() {
    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('panelOverlay');
    const layout = document.querySelector('.inventory-layout');
    panel.classList.add('active');
    if (layout) {
        layout.classList.add('panel-active');
    }
    if (window.innerWidth <= 1200 && overlay) {
        overlay.classList.add('active');
    }
}
