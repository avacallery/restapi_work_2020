
//EXERCISE 1: Get all the published backend courses, sort them by their name, and pick only their name and author, and display them. 


const mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://ava_rest_api:avatest20@cluster0-9qzld.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

    const courseSchema = new mongoose.Schema( {
        name: String, 
        author: String, 
        tags: [ String ], 
        date: { type: Date, default: Date.now }, 
        price: Number,
        isPublished: Boolean 
    }); 

    const Course = mongoose.model('Course', courseSchema); 
    async function createCourse() {
        const course = new Course( 
            
            
            {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
        
        
        );
        const result = await course.save();
        console.log(result); 
    };

    async function getCourses() {

        const courses = await Course //find everything in Course and assign to courses 
        .find({ name: /.*by*./ })
        .find({ price: { $gte: 15 }} )
        .sort({ name: 1 }) //names in ascending order
        .select({ name: 1, author: 1}) 
        return courses;
        //console.log(courses); 
    }

    async function run() {
        const courses = await getCourses(); 
        console.log(courses);  
    }
    
    //run(); 
    //getCourses(); 
    //createCourse(); 
