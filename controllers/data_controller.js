// Access to model
const Carpark = require("../models/carparks");

let data = require("../database/seed/carpark_data");
data = data.value;

const controller = {
    seedData: (req, res) => {
        const carparksData = data;
        res.redirect("/");

        Carpark.create(carparksData, (err, carpark) => {
            if (err) {
                console.log(err);
            }
            console.log("Carpark Data Added!");
            res.redirect("/");
        });
    },

    alternateSeedData: (req, res) => {
        Carpark.insertMany(data, (err, carparks) => {
            if (err) {
                console.log(err);
            } else {
                res.send(carparks);
            }
        });
    },
};

module.exports = controller;
