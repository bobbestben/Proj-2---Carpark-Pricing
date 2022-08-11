// const carparkData = require("../models/carpark_data")
const carparkModel = require("../models/carparks");
const pricingModel = require("../models/pricing");

const controller = {
    listCarparks: async (req, res) => {
        console.log('listCarparks')
        let carparks = await carparkModel.find({});
        let carparkMap = [ ]
        carparks.forEach( carpark => {
            let c = carpark.toObject()
            carparkMap.push({
                ...c,
                _id: carpark._id.toString()
            })
        })
        carparkMap = JSON.stringify(carparkMap)
        console.log('carparkMap',carparkMap[0])

        // console.log("carparks", carparks);
        // console.log('search-value',req.body.search)
        const searchValue = req.body.search

        if (searchValue) {
            carparks = carparks.filter(carpark => {
                return carpark.Development.toLowerCase().includes(req.body.search.toLowerCase())
            })
            // return country.toLowerCase().includes(searchValue.toLowerCase());
            console.log('filteredList',carparks)
        }

        // // res.render('products/index', {products});
        res.render("pages/home", { carparks, carparkMap });
        // res.send('list carpark')
    },

    getCarpark: async (req, res) => {

        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });
        console.log("show carpark", carpark);

        const pricing = await pricingModel.findOne({
            carpark_id: req.params.carpark_id,
        });
        console.log("show pricing", pricing);

        res.render("pages/show", { carpark, pricing });
        console.log('getcarpark')
        // res.send('getting carpark')
    },

    showEditCarparkForm: async (req, res) => {
        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });
        console.log("show carpark2", carpark);
        res.render("pages/edit_pricing", { carpark });
    },

    showCreateCarparkForm: async (req, res) => {
        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });
        console.log("show carpark2", carpark);
        res.render("pages/create_pricing", { carpark });
    },

    updatePricing: async (req, res) => {
        console.log(req.body);
        console.log(req.body.carpark_id);
        console.log(req.body.pricing);
        console.log('req.params.carpark_id = ', req.params.carpark_id)
        // create the pricing and store in db

        // Check if pricing exist
        const priceExist = await pricingModel.findOne({
            carpark_id: req.params.carpark_id,
        });
        console.log('priceExist?',priceExist)

        // If doesnt exist - create
        if (!priceExist) {
            try {
                console.log('creating price')
                console.log('req.params',req.params)
                await pricingModel.create({
                    // username: validatedResults.fullname,
                    carpark_id: req.params.carpark_id,
                    pricing: req.body.pricing,
                });
            } catch (err) {
                console.log(err);
                res.send("failed to create pricing");
            }
        }

        // If exist exist - update
        if (priceExist) {
            try {
                console.log('updating price')
                await pricingModel.findOneAndUpdate(
                    { carpark_id: req.params.carpark_id },
                { pricing: req.body.pricing }
                );
            } catch (err) {
                console.log(err)
                res.send("failed to update pricing")
            }
        }
        console.log('create/update completed!')
        res.redirect(`/${req.params.carpark_id}`);
    },

    deleteCarpark: async (req, res) => {
        try {
            console.log('deleting price')
            await pricingModel.deleteOne(
                { carpark_id: req.params.carpark_id },
            );
        } catch (err) {
            console.log(err)
            res.send("failed to delete price")
        }
        res.redirect(`/${req.params.carpark_id}`);
    },
};

module.exports = controller;
