const Joi = require('joi'); 
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema ({
    title: {
        type: String, 
        required: true, 
        minlength: 5,  
        maxlength: 500
    },
    genre: {
        type: genreSchema, 
        required: true, 
    }, 
    numberInStock: {
        type: Number, 
        required: true, 
        minlength: 5, 
        maxlength: 1000
    }, 
    dailyRentalRate: {
        type: Number, 
        required: true, 
        minlength: 1,
        maxlength: 30
    }
})); 

function validateMovie(movie) {
    const schema = {
        name: Joi.string.min(5).max(500).required(), 
        genreId: Joi.objectId().requried(), 
        numberInStock: Joi.number().min(5).required(), 
        dailyRentalRate: Joi.number().min(1).required()
    };

    return Joi.validate(movie, schema);
  }

module.exports.Movie = Movie;
module.exports.validate = validateMovie; 