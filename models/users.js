const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // hashed password
    hash: {
        type: String,
        required: true
    },

})

//Created this Product model with the above schema
const User = mongoose.model('User', userSchema)

// Module Exports - access Carparks in controllers/users_controller.js
module.exports = User