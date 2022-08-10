const mongoose = require('mongoose')

const pricingSchema = new mongoose.Schema({
    // user_id: {
    //     type: String,
    //     required: true,
    // },
    carpark_id: {
        type: String,
        required: true
    },
    pricing: {
        type: String,
        required: true
    },

})

//Created this Product model with the above schema
//in MongoDB, collection is created with the variable name in plural
//eg. ProductRating = productratings
const CarparkPricing = mongoose.model('carpark_pricing', pricingSchema)

module.exports = CarparkPricing