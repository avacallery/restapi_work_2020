const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 
const mongoose = require('mongoose'); 


const Album = mongoose.model('Album', new mongoose.Schema({ 
    title: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 100 
    },
    artist: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 100
    },
    releaseDate: Date, 
        price: Number,
    }
)); 

//HTTP methods get/put/post/delete 
//get list of albums
router.get('/', async (req, res) => {
    const albums= await Album.find().sort('name'); 
    res.send(albums); 
});

//create a new album
router.post('/', async (req, res) => {
    const { error } = validateAlbum(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let album = new Album({ 
        title: req.body.title,
        artist: req.body.artist, 
        releaseDate: req.body.date,
        price: req.body.price
        });

        album = await album.save(); 

        res.send(album); 
});

//update an album

async function updateAlbum(id) {
    const album = await Album.findByIdAndUpdate(id, {
        $set: {
            title: 'Abbey Road',
            artist: 'The Beatles', 
            releaseDate: Date, 
            price: 10000000
        }
    }, { new: true });
    console.log(album);

}

//delete an album
    async function removeAlbum(id) {
        const result = await Album.deleteOne({ _id: id });
        console.log(result);
    }

//validate an album
function validateAlbum(album) {
    const schema = {
        title: Joi.string().min(1).max(100).required(),
        artist: Joi.string().min(5).max(100).required(),
    };
    return Joi.validate(album, schema); 
};

module.exports = router; 