const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises').then(() => console.log('Connected to MongoDB....')).catch(err => console.log('Can\'t connected', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: { type: Number, default: 0.00 } ,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {

    return await Course
    .find({ isPublished: true })
    .or([
        { price: { $gte: 15 }},
    { name: /.*by.*/i }
    ])
    .sort('-price')

    .select({name: 1, author : 1, price: 1})
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run()