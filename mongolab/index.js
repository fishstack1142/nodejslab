const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB....')).catch(err => console.log('Can\'t connected', err));

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Book = mongoose.model('Book', bookSchema);


//cret
async function createBook() {
    const book = new Book({
        name: 'Second Book Name',
        author: 'Patriot',
        tags: ['usa', 'robot', 'soldier'],
        isPublished: true
    });

    const result = await book.save();
    console.log(result);
}

// createBook();

async function getBooks() {
    const books = await Book.find();
    console.log(books);
}

getBooks();

