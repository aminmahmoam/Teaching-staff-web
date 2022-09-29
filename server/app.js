if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var bcrypt = require('bcrypt');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var methodOverride = require('method-override');
var history = require('connect-history-api-fallback');
var staffsController = require('./controllers/staffs');
var coursesController = require('./controllers/courses');
var departmentsController = require('./controllers/departments');
var studentsController = require('./controllers/students');

var initPassport = require('./passport-config');
initPassport(passport, 
    email =>  users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

//var methodOverride = require('method-override');


// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// temporary
const users = [];

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
    res.render(index.ejs);
});

// Import login and register page layouts
app.get('/login', checkLogout, function(req, res){
    res.render('login.ejs');
});

app.get('/register', checkLogout, function(req, res){
    res.render('register.ejs');
});

app.get('/', checkLogin, function(req, res){
    res.render('index.ejs', {name: req.user.name})
})

app.post('/login', checkLogout, passport.authenticate('local', {
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash : true
}))

app.post('/register', checkLogout, async function(req, res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id : Date.now.toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
});

function checkLogin(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkLogout(req, res, next) {
    if (req.isAuthenticated()){
        res.redirect('/');
    }
    next();
}

// app.delete('/logout', function(req, res){
//     req.logOut()
//     res.redirect('/login')
// })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/login");
    });
  });

app.use(staffsController);
app.use(coursesController);
app.use(departmentsController);
app.use(studentsController);


// override with the X-HTTP-Method-Override header in the request
//app.use(methodOverride('X-HTTP-Method-Override'));


// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
