/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              database : 'waytecinventory'
            });
 
//connection.connect();
connection.connect(function(err){
    (err)? console.log(err+'+++++++++++++++///// Error connecting /////+++++++++++++++'): console.log('********connection established to MySQL********');
    });
     
global.db = connection;

// all environments
const PORT = process.env.PORT || 3000; //set server port
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

 
//make way for some custom css, js and images
app.use('/vendors', express.static(__dirname + '/public/vendors'));
app.use('/images', express.static(__dirname + '/public/images'));

app.use(session({
              secret: 'cherrydaisy',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))


//rest api to get all results
app.get('/items', function (req, res) {
  connection.query('select * from items', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
 
});
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
//Middleware

// start server
app.listen(PORT, () =>{
    console.log(`*****The Node Js App is running on port: ${PORT}`);
});