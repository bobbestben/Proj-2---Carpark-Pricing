module.exports = {
    //Additional parameter "next"
    isAuthenticated: (req, res, next) => {
        if (!req.session.user) {
            // res.send('you are not authenticated')
            console.log('you are not authenticated')
            //redirect to login page if not authenticated
            res.redirect('/users/login')
            return
        }
        
        //If everything is ok, we invoke next()
        next()
    },

    setAuthUserVar: (req, res, next) => {
        //res.locals.variableName is a global variable
        //can call if else statements in your ejs pages
        res.locals.authUser = null

        res.locals.someKey = "some value"
        
        if (req.session.user) {
            res.locals.authUser = req.session.user
        }

        next()
    }

    
}