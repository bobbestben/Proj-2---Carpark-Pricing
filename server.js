// Initialization Instructions
// npm init -y
// npm i express
// npm install nodemon (globally installed)
// npm i body-parser
// npm i method-override
// npm i ejs
// npm i mongoose
// npm i joi - for validation
// npm i bcrypt - for hasing passwords
// npm i express-session - for creating a session
// npm install dotenv --save

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

//Connection to DB
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.imxw3.mongodb.net/?retryWrites=true&w=majority`;

//Apply middlewares
const productController = require('./controllers/product_controller')
const userController = require('./controllers/users_controller')
const dataController = require('./controllers/data_controller')
const autMiddleware = require('./middlewares/auth_middleware');

//Using Middlewares, set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false } //20 seconds maxAge: 20000
}))
app.use(autMiddleware.setAuthUserVar)

// Product Routes - list, show, create, edit, delete
app.get("/", productController.listCarparks)
app.get('/:carpark_id', productController.showCarpark)
app.post('/:carpark_id', autMiddleware.isAuthenticated, productController.updatePricing)
app.get('/:carpark_id/new', productController.showCreateCarparkForm)
app.get('/:carpark_id/edit', productController.showEditCarparkForm)
app.get('/:carpark_id/delete', autMiddleware.isAuthenticated, productController.deleteCarparkPricing)

// Users Routes - show, login, logout, create
app.get('/users/register', userController.showRegistrationForm)
app.post('/users/register', userController.register)
app.get('/users/login', userController.showLoginForm)
app.post('/users/login', userController.login)
app.post('/users/logout', userController.logout)
app.get('/users/:user_id', userController.showProfile)

// Seed Route - Visit ONCE to populate database
app.get('/seed/carparkdata', dataController.alternateSeedData)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: "carpark_pricing" });
    } catch (err) {
        console.log("Failed to connect to DB");
        process.exit(1); //so that we wont run the application
    }

    console.log(`Example app listening on port ${port}`);
});
