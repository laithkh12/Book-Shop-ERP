// Default books data
// This file contains the initial books that will be used if server is not available
// or when initializing the server for the first time

const defaultBooks = [
    {
        id: 1,
        title: "Hobbit",
        author: "J.R.R. Tolkien",
        price: 10.99,
        pages: 300,
        image: "Hobbit.webp",
        rating: 4.7,
    },
    {
        id: 2,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 15.99,
        pages: 500,
        image: "The_Lord_of _the_Rings.jpg",
        rating: 4.9,
    },
    {
        id: 3,
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        price: 12.99,
        pages: 200,
        image: "The_Hitchhikers_Guide_to_the_Galaxy.jpg",
        rating: 4.2,
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 14.99,
        pages: 250,
        image: "The_Great_Gatsby.webp",
        rating: 4.5,
    },
    {
        id: 5,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 13.99,
        pages: 220,
        image: "To_Kill_a_Mockingbird.jpg",
        rating: 4.8,
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        price: 11.99,
        pages: 280,
        image: "1984.jpg",
        rating: 4.6,
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 10.99,
        pages: 224,
        image: "The_Catcher_in_the_Rye.jpg",
        rating: 3.9,
    }
];

// Export for Node.js (server)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = defaultBooks;
}

// Make available globally for browser (client)
if (typeof window !== 'undefined') {
    window.defaultBooks = defaultBooks;
}
