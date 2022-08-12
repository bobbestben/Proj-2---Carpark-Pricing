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
    name: {
        type: String,
        required: true,
    },

})

// Module Exports - access Carparks in controllers/product_controller.js
const CarparkPricing = mongoose.model('carpark_pricing', pricingSchema)

module.exports = CarparkPricing