const carparkModel = require("../models/carparks");
const pricingModel = require("../models/pricing");

const controller = {
    listCarparks: async (req, res) => {
        let carparks = await carparkModel.find({});
        let carparkMap = [];
        carparks.forEach((carpark) => {
            let c = carpark.toObject();
            carparkMap.push({
                ...c,
                _id: carpark._id.toString(),
            });
        });
        carparkMap = JSON.stringify(carparkMap);

        const searchValue = req.body.search;

        if (searchValue) {
            carparks = carparks.filter((carpark) => {
                return carpark.Development.toLowerCase().includes(
                    req.body.search.toLowerCase()
                );
            });
        }
        console.log("listCarparks");
        res.render("pages/home", { carparkMap });
    },

    showCarpark: async (req, res) => {
        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });

        const pricing = await pricingModel.findOne({
            carpark_id: req.params.carpark_id,
        });

        console.log("showCarpark");
        res.render("pages/show", { carpark, pricing });
    },

    showEditCarparkForm: async (req, res) => {
        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });
        console.log("showEditCarparkForm");
        res.render("pages/edit_pricing", { carpark });
    },

    showCreateCarparkForm: async (req, res) => {
        const carpark = await carparkModel.findOne({
            CarParkID: req.params.carpark_id,
        });
        console.log("showCreateCarparkForm");
        res.render("pages/create_pricing", { carpark });
    },

    updatePricing: async (req, res) => {
        // Check if pricing exist
        const priceExist = await pricingModel.findOne({
            carpark_id: req.params.carpark_id,
        });
        console.log("priceExist?", priceExist);

        // Pricing does not exist - create
        if (!priceExist) {
            try {
                console.log("creating price");
                await pricingModel.create({
                    // username: validatedResults.fullname,
                    carpark_id: req.params.carpark_id,
                    pricing: req.body.pricing,
                    name: res.locals.authUser,
                });
            } catch (err) {
                console.log(err);
                res.send("failed to create pricing");
            }
        }

        // Price exist - update
        if (priceExist) {
            try {
                console.log("updating price");
                await pricingModel.findOneAndUpdate(
                    { carpark_id: req.params.carpark_id },
                    { pricing: req.body.pricing, name: res.locals.authUser }
                );
            } catch (err) {
                console.log(err);
                res.send("failed to update pricing");
            }
        }
        console.log("create/update completed!");
        res.redirect(`/${req.params.carpark_id}`);
    },

    deleteCarparkPricing: async (req, res) => {
        try {
            console.log("deleting price");
            await pricingModel.deleteOne({ carpark_id: req.params.carpark_id });
        } catch (err) {
            console.log(err);
            res.send("failed to delete price");
        }
        res.redirect(`/${req.params.carpark_id}`);
    },
};

module.exports = controller;
