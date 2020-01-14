const mongoose = require('mongoose'); 
const genres = require('./routes/genres'); 
const customers = require('./routes/customers')
const express = require('express'); 
const app = express(); 


mongoose.connect('mongodb+srv://avacallery:avatest20@crudcluster-ksmuy.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

    app.use(express.json()); 
    app.use('/api/genres', genres); 
    app.use('/api/customers', customers); 

    const port = process.env.PORT || 3000; 
    app.listen(port, () => console.log (`Listening on port ${port}...`));