const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB....')).catch(err => console.log('Can\'t connected', err));

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) { 
                return v && v.length > 0;
             },
             message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { type: Number, 
            required: function () {
                return this.isPublished;
            } }
});

const Book = mongoose.model('Book', bookSchema);


//create
async function createBook() {
    const book = new Book({
        name: 'Fifth Book Name',
        category: 'web',
        author: 'Arthur',
        // tags: ['ocean', 'Atlantis'],
        tags: [],
        price: 19.99,
        isPublished: true
    });

    try {
        const result = await book.save();
        console.log(result);
    } catch(ex) {
        console.log(ex.message)
    }
}

createBook();

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

// getBooks();


async function updateBook(id) {

    const result = await Book.update({_id:id}, {
        $set: {
            author: 'Stacy Gwen',
            isPublished: false
        }
    });
    console.log(result);
}

// updateBook('5da40da2b75277126681b465');

async function deleteBook(id){

    // const result = await Book.deleteOne({ _id: id });
    const result = await Book.findByIdAndDelete(id);
    console.log(result);
}

// deleteBook('5da42922bf8d4b27945cfda6');
