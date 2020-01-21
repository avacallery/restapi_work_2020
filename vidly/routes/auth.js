const bcrypt = require('bcrypt'); 
const Joi = require('Joi'); 
const _ = require('lodash'); 
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    //this bcrypt object has a method that will compare plain txt password (req.body.password) with the hash password (user.password).
    //the hash password includes the salt. when we call the compare method, bcrypt will get the salt and rehash the plain txt password. if they are equal, it will return true. 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true); 

});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router;