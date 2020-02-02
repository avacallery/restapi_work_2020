const {User} = require('../models/user'); //import user model
const jwt = require('jsonwebtoken'); //import json web token for authentication
const Joi = require('joi'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const _ = require('lodash'); 

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //if we DON'T have a user, send vague 400 message - we don't want to tell the client if the email or password is not found.
    let user = await User.findOne({ email: req.body.email }) 
    if (!user) return res.status(400).send('Invalid email or password.');

    //we use the bcrypt object to compare the plain text password (req.body.password) with the hashed password (user.password)
   const validPassword = await bcrypt.compare(req.body.password, user.password); 
   if (!validPassword) return res.status(400).send('Invalid email or password.');

   //generate an authentication (json web) token
    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey'); 

    res.send(token); //valid login will send valid token
    });

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(req, schema); 
}

module.exports = router; 