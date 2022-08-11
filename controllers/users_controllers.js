const userValidators = require("../validators/users");
const bcrypt = require("bcrypt");
const userModel = require("../models/users");

const controller = {
    showUser: (req, res) => {
        res.render("users/profile");
    },

    showRegistrationForm: (req, res) => {
        res.render("pages/register");
    },

    register: async (req, res) => {
        //validators
        const validationResults = userValidators.registerValidator.validate(
            req.body
        );

        if (validationResults.error) {
            res.send("validation error occured");
            console.log(validationResults);
            return;
        }

        const validatedResults = validationResults.value;
        console.log(validatedResults);

        //ensure that password and confirm_passwword matches
        if (validatedResults.password !== validatedResults.confirm_password) {
            res.send("passwords do not match");
            return;
        }

        // hash the password
        const hash = await bcrypt.hash(validatedResults.password, 10);

        // create the user and store in db
        try {
            await userModel.create({
                name: validatedResults.fullname,
                email: validatedResults.email,
                hash: hash,
            });
        } catch (err) {
            console.log(err);
            res.send("failed to create user");
        }

        // res.send("user registered");
        res.redirect("/users/login");
    },

    showLoginForm: (req, res) => {
        res.render("pages/login");
    },

    login: async (req, res) => {
        // todo: validation of req.body
        const validatedResults = req.body;

        let user = null;

        // check if username is in DB
        try {
            user = await userModel.findOne({ name: validatedResults.name });
        } catch (err) {
            // not sure why not catching if no user found
            res.send("failed to get user");
            return;
        }

        console.log("user line 78", user);
        if (user == null) {
            res.send("username not found");
            return;
        }

        // use bcrypt to compare the given password with the one store as hash in DB
        const pwMatches = await bcrypt.compare(
            validatedResults.password,
            user.hash
        );

        //if above dont have await, will always be login successful
        if (!pwMatches) {
            res.send("incorrect password");
            return;
        }

        // log the user in by creating a session
        req.session.regenerate(function (err) {
            if (err) {
                res.send("unable to regenerate session");
                return;
            }

            //store user information in session, typically a user id
            req.session.user = user.name;

            //save the session before redirection to ensure page load does not happen before session is saved
            req.session.save(function (err) {
                if (err) {
                    res.send("unable to save session");
                    return;
                }

                res.redirect("/users/profile");
            });

            

        });

        // res.send('login is successful')
    },

    showProfile: async (req, res) => {
        console.log(req.session);

        //get user data from db using session user
        let user = null;

        try {
            user = await userModel.findOne({ name: req.session.user });
        } catch (err) {
            console.log(err);
            res.redirect("/users/login");
            return;
        }

        res.render("users/profile", { user });
    },

    logout: async (req, res) => {
        //in header ejs, our logout we created a form with POST action
        //here we can use GET, but POST/DELETE better
        //because we are modifying data here

        //recommended way to logout as per express-sessions doucmentation
        //invalidate the current session
        req.session.user = null;

        //save the changes
        req.session.save(function (err) {
            if (err) {
                res.redirect("/login");
                return;
            }

            //regenerate the session, which is good practice to help
            //guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect("/login");
                    return;
                }
                res.redirect("/");
            });
        });
    },
};

module.exports = controller;
