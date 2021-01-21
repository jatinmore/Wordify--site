const express = require("express"),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

const session = require('express-session');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogpost'
})
connection.connect(function(error) {
    if (!!error) {
        console.log("error:1 connection fail");
    } else {
        console.log("connected to database");

    }
})


global.db = connection;
app.set('view engine', 'ejs');
// all environments
app.set('port', process.env.PORT || 6969);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static(__dirname + '/views'));


//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// development only
// development only

app.get('/', routes.index); //call for main index page
app.post('/', routes.index); //call for main index page
app.get('/signin', user.login);
app.post('/signin', user.login);

app.get('/register', user.reg);
app.post('/regq', user.reg);



app.get('/about', (req, res) => {
    res.render('about.ejs');
})
app.get('/write', user.write);
app.post('/write', user.write);

app.get('/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile', user.profile);
//Middleware





app.listen(6969);