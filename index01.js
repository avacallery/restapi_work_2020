
//EXERCISE 1: Get all the published backend courses, sort them by their name, and pick only their name and author, and display them. 


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ava_rest_api:PASSWORD@cluster0-9qzld.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'], //pre-defined array
        lowercase: true,
        //uppercase: true, 
        trim: true, //if you have spaces or padding
    },
    author: String,
    tags: {
        type: Array,
        validate: { //custom validator which assigns a validator function 
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    //Do some async work
                    const result = v && v.length > 0;
                    callback(result)
                }, 1000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
};

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course //find everything in Course and assign to courses 
        .find({ _id: '5e1dfa0791f06626c17b68e3' })
        .sort({ name: 1 }) //names in ascending order
        .select({ name: 1, tags: 1, price: 1 })
    //return courses;
    console.log(courses[0].price);
}

    async function updateCourse(id) {
        const course = await Course.findByIdAndUpdate(id, {
            $set: {
                author: 'Jason',
                isPublished: false
            }
        }, { new: true });
        console.log(course);

    }

        async function removeCourse(id) {
            const result = await Course.deleteOne({ _id: id });
            console.log(result);
        }


//removeCourse('5e1df5e8a7f59825e163e066');
//updateCourse('5e1df5e8a7f59825e163e066'); 
//run(); 
getCourses();
//createCourse()
