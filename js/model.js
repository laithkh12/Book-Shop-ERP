// Default book data
const defaultGdata = [{
        title: "Hobbit",
        author: "J.R.R. Tolkien",
        price: 10.99,
        pages: 300,
        image: "Hobbit.webp",
        rating: 4.7,
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 15.99,
        pages: 500,
        image: "The_Lord_of _the_Rings.jpg",
        rating: 4.9,
    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        price: 12.99,
        pages: 200,
        image: "The_Hitchhikers_Guide_to_the_Galaxy.jpg",
        rating: 4.2,
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 14.99,
        pages: 250,
        image: "The_Great_Gatsby.webp",
        rating: 4.5,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 13.99,
        pages: 220,
        image: "To_Kill_a_Mockingbird.jpg",
        rating: 4.8,
    },
    {
        title: "1984",
        author: "George Orwell",
        price: 11.99,
        pages: 280,
        image: "1984.jpg",
        rating: 4.6,
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 10.99,
        image: "The_Catcher_in_the_Rye.jpg",
        rating: 3.9,
    }
];

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('bookShopData', JSON.stringify(Gdata));
}

// Load data from localStorage or use default data
let Gdata;
if (localStorage.getItem('bookShopData')) {
    try {
        Gdata = JSON.parse(localStorage.getItem('bookShopData'));
    } catch (e) {
        console.error('Error parsing data from localStorage:', e);
        Gdata = defaultGdata;
        saveToLocalStorage();
    }
} else {
    Gdata = defaultGdata;
    saveToLocalStorage();
}
