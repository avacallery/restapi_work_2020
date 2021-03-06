const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: { //sub-document or array of sub-documents
  //   type: authorSchema, 
  //   required: true
  // } 
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'Ava Callery'
    }
  });
}

createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' })
])

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
const course = await Course.findById(courseId);
const author = course.authors.id(authorId);
author.remove();
course.save();
}

removeAuthor('5e306c41b1069c7733467ef4', '5e306db37e4835775d43c0cf')

//addAuthor('5e306c41b1069c7733467ef4', new Author({ name: 'Amy' }))
//createCourse('Node Course', new Author({ name: 'Mosh' }));
//updateAuthor('5e3067221590d0763f2b838c');
