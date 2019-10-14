const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB....')).catch(err => console.log('Can\'t connected', err));

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: { type: Number, default: 0.00 } ,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Book = mongoose.model('Book', bookSchema);


//create
async function createBook() {
    const book = new Book({
        name: 'Third Book Name',
        author: 'Stecy',
        tags: ['robot', 'soldier'],
        price: 12.99,
        isPublished: true
    });

    const result = await book.save();
    console.log(result);
}

// createBook();

async function getBooks() {

    const pageNumber = 1;
    const pageSize = 10;

    const books = await Book
    // .find({ author: 'Patriot' })
    // .find({ price: { $gte: 2 } })
    .find()

    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)

    // .or([{ author: 'Kyro' }, { author: 'Stecy' }])

    //regular expression search
    // //i is incensitive
    // .find({ author: /^Ky/i })
    // .find({name : /.*me$/i})

    // .limit(30)
    .sort({ date: 1 })
    .select({  name: -1 })
    //or we can use .count 
    // .count()
    ;
    console.log(books);
}

getBooks();

