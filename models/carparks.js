const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up Schema
const carparkSchema = new Schema({
    CarParkID: {
        type: String,
        required: [true, "Carpark ID required"],
    },
    Area: {
        type: String,
    },
    Development: {
        type: String,
        required: [true, "Carpark Name required"],
    },

    Location: {
        type: String,
        required: [true, "Location of carpark required"],
    },

    AvailableLots: {
        type: Number,
    },
    LotType: {
        Type: String,
    },
    Agency: {
        type: String,
    },
});

// Set up Model - create Model with above Schema
const Carpark = mongoose.model("Carpark", carparkSchema);

// Module Exports - access Carparks in controllers/data_controller.js
module.exports = Carpark;
