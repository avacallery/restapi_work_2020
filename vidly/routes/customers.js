const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 
const mongoose = require('mongoose'); 


const Customer = mongoose.model('Customer', new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50 
    },
    isGold: {
        type: Boolean, 
        default: false
    },
    phone: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50 
    }
})); 

//HTTP methods get/put/post/delete 
//get list of customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name'); 
    res.send(customers); 
});

//create a new customer
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone, 
        isGold: req.body.isGold
        });
        customer = await customer.save(); 

        res.send(customer); 
});

async function updateCustomer(id) {
    const customer = await Customer.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isGold: false, 
            phone: "1223388"
        }
    }, { new: true });
    console.log(customer);

}

    async function removeCustomer(id) {
        const result = await Customer.deleteOne({ _id: id });
        console.log(result);
    }


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema); 
};

module.exports = router; 