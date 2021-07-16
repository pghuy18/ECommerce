var express = require('express')
var router = express.Router();
const passport = require('passport')

const session = require('express-session')

const User = require('../models/user')
const config = require('../config')
const facebookStrategy = require('passport-facebook').Strategy

// router.set("view engine", "ejs")
router.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'ilovescotchscotchyscotchscotch'
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new facebookStrategy({

        // pull in our router id and secret from our auth.js file
        clientID: config.facebook_key,
        clientSecret: config.facebook_secret,
        callbackURL: config.callback_url,
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

    }, // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'uid': profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    console.log("user found")
                    console.log(user)
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();
                    // set all of the facebook information in our user model
                    newUser.uid = profile.id; // set the users facebook id                   
                    newUser.token = token; // we will save the token that facebook provides to the user                    
                    newUser.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    //newUser.gender = profile.gender
                    newUser.pic = profile.photos[0].value
                        // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });

        })

    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// trả profile user
router.get('/profile', isLoggedIn, function(req, res) {

    //res.status(200).send('đăng nhập bằng facebook thành công');
    res.status(200).send(req.user) // tra ve user
    console.log('login facebook')

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/callback',
    passport.authenticate('facebook', {
        successRedirect: './profile',
        failureRedirect: './'
    }));

router.get('/', (req, res) => {
    // res.render("index")
    res.send("this is home, you are login fail or logged!")

})

module.exports = router