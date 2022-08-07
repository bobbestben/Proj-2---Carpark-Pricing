// const userValidators = require("../validators/users");
// const bcrypt = require("bcrypt");
// const userModel = require("../../models/users/users");

const controller = {

    showUser: (req, res) => {
        res.render('users/profile')
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
        // validation here ...
        const validatedResults = req.body;

        let user = null;

        // get user wwith email from DB
        try {
            user = await userModel.findOne({ email: validatedResults.email });
        } catch (err) {
            res.send("failed to get user");
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

        //log the user in by creating a session
        //all request that come in will generate a cookie
        //prevent hacker from getting the cookie and "access" your session
        req.session.regenerate(function (err) {
            if (err) {
                res.send("unable to regenerate session");
                return;
            }

            //This is a callback function to regnerate above
            //store user information in session, typically a user id
            //sessions automatically encrypt this sessionID for us
            //can be req.session.<anyVariableName>
            req.session.user = user.email;
            //this output is a gibberish string eg. s%3A6v-CYnVjTDJG8Spi_pDOaKRjs7YO06Au.tyfse8KKgkLV006thx%2BQTc9ILweVl3jpoyruIkXZ36I
            //frontend saves this as cookie value
            //subsequent req. to backend -> included cookie value in request
            //then use session_secret to decrypt the string to become user's email
            //after decrypt, check if exist in DB, then successful authentication

            //save the session before redirection to ensure page
            //load does not happen before session is saved
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

    showDashboard: (req, res) => {
        //verify that the session user exist, then render the page
        //this is only checking if user key exist
        //checking if decrpyt correctly or if session expired automatically done by sessions library
        //below authentication is repeatedly done, can be set as middleware, refer to server.js route
        // if (!req.session.user) {
        //     res.send('you are not authenticated')
        //     return
        // }

        res.send("welcome to your protected dashboard");
    },

    showProfile: async (req, res) => {
        console.log(req.session);
        //verify that the session user exists
        // if (!req.session.user) {
        //     res.send('you are not authenticated')
        //     return
        // }

        //get user data from db using session user
        let user = null;

        try {
            user = await userModel.findOne({ email: req.session.user });
        } catch (err) {
            console.log(err);
            res.redirect("/users/login");
            return;
        }

        // res.send('my profile')
        //normally want to use UU id - why again?
        res.render("users/profile", { user });
    },

    logout: async (req, res) => {
        //in header ejs, our logout we created a form with POST action
        //here we can use GET, but POST/DELETE better
        //because we are modifying data here

        //recommended way to logout as per express-sessions doucmentation
        //invalidate the current session
        req.session.user = null

        //save the changes
        req.session.save(function (err) {
            if (err) {
                res.redirect('/login')
                return
            }

            //regenerate the session, which is good practice to help
            //guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect('/login')
                    return
                }
                res.redirect('/')
            })

        })
    }
};

module.exports = controller;
