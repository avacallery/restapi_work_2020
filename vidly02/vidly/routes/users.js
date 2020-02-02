const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const _ = require('lodash'); 

router.post('/', async (req, res) => {
    const { error } = validate(req.body); //validate request with Joi validate method
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email }) //looking up by one of the properties
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); 
    await user.save(); 

    res.send(_.pick(user, ['_id', 'name', 'email'])); //when we call this pick method, we'll get a new object with name and email
});

module.exports = router; 