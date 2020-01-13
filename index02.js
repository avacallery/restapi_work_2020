const mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://USERNAME:PASSWORD@cluster0-9qzld.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

    //create a schema
    //define the shape of documents within a collection on the database
    //it's a map of the way your object (document) is going to look 
    //what are the properties we have in this document?
    //a collection in mongodb is like a table in a relational database (where there is tables and rows) and in mongodb we have collections and documents. 
    //courseSchema is the instance of Schema (in mongoose.Schema)

    const courseSchema = new mongoose.Schema( {
        name: String, 
        author: String, 
        tags: [ String ], 
        date: { type: Date, default: Date.now }, 
        price: Number,
        isPublished: Boolean 
    }); 

    const Course = mongoose.model('Course', courseSchema); 
    //model is a practical version of our schema
    //object is an instance of a class 
    //COMPILE SCHEMA INTO MODEL:
    //Course is our class name, course is our child object
    //First we have a schema, then we compile that into a model, which then we create a class (Course) we create an instance of that class (course) to give a map to what documents should look like in the database

    async function createCourse() {
        const course = new Course( 
            
            
            {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
        
        
        );
        const result = await course.save();
        console.log(result); 
    };

    //QUERYING - finding specific properties in the JSON objects
    //How we build queries/ filter database objects 

        //.find({ author: /^Mosh/ }) //regular expression - finds courses that starts with Mosh
        //.find({ author: /Hamedani$/i }) //regular expression - find courses that end with Hamedani
        //.find({ author: /.*Mosh.*/i }) //regular expression - you can have 0 or more characters before or after Mosh. and i means case insensitive 



        //EXERCISE: Get all the published frontend and backend course sort them by their price in a descending order, pick only their name and author, and display them. 
        
    async function getCourses() {

        const courses = await Course //find everything in Course and assign to courses 
        //.find({ isPublished: true, tags: 'backend', tags: 'frontend'})
        .find()
        .sort({ price: -1 }) //names in ascending order
        .select({ name: 1, author: 1, price: -1}) 
        //return courses;
        console.log(courses); 
    }

    // async function run() {
    //     const courses = await getCourses(); 
    //     console.log(courses);  
    // }
    
    // run(); 
    getCourses(); 
    //createCourse(); 
