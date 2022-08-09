// const carparkData = require("../models/carpark_data")
const carparkModel = require("../models/carparks");

const controller = {
    createCarpark: async (req, res) => {
    //     console.log(req.body);

    //     //Validation
    //     //JOI will help you convert numbers which read as string in backend to integer
    //     //Helps you parse into correct data type
    //     //try without below 2 lines and see the result in terminal - test using price
    //     //without JOI - price = $123 string
    //     //with JOI - price = $123 integer
    //     const validationResults =
    //         productValidators.createProductValidator.validate(req.body);

    //     if (validationResults.error) {
    //         res.send("validation error occured");
    //         console.log(validationResults.error);
    //         return;
    //     }

    //     const validatedResults = validationResults.value;
    //     console.log(validatedResults);

    //     res.send("validated");

    //     //Return here to prevent data from adding to database if troubleshooting
    //     // return

    //     //in Mongoose = create , MongoDB = insert
    //     try {
    //         //.create is a promise, hence await)
    //         //in mongoose DB, there is a __v field also (that you didnt create)
    //         // this one is the version of the data, to track how many times you updated - like an audit trail
    //         await productModel.create(req.body);
    //     } catch (err) {
    //         console.log(err);
    //     }


    //     // todo: redirect to products page
        res.send("asd");
    },

    listCarparks: async (req, res) => {
        // //.exec() is a promise - need await
        // const products = await productModel.find().exec();
        const carparks = await carparkModel.find({})

        console.log(carparks);

        // res.render('products/index', {products});
        res.render('pages/home', { carparks })
    },

    getCarpark: async(req, res) => {
        // const product = await productModel.findById(req.params.product_id)
        // const product = await productModel.findById(req.params.product_id)
        // //Here ratings - making use of the _id reference
        // //To interact with different models/DB
        // //Ratings for individual product is in another DB
        // //now is listing down all the ratings
        // const ratings = await productRatingModel.find({product_id: req.params.product_id})
        const carpark = await carparkModel.find({CarParkID: req.params.carpark_id})
        console.log('show carpark',carpark)
        res.render('pages/show', { carpark })

        //// res.send('get carpark page')

        // //todo: aggregation of ratings

        // res.render('products/show', {product, ratings})
    },
    
    editCarpark: (req, res) => {
        res.send('ok')
    },

    deleteCarpark: (req, res) => {
        res.send('ok2')
    },

    showEditCarparkForm: (req, res) => {
        res.send('ok2')
    },
};

module.exports = controller;
