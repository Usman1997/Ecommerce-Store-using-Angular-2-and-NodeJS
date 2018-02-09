var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
var session = require('express-session');
var MonogoStore = require('connect-mongo')(session);

// mongoose.connect(config.database);
mongoose.connect('localhost:27017/MeanShoppingApp');

mongoose.connection.on('connected',()=>{
console.log('Connected to '+config.database);
});
mongoose.connection.on('error',(err)=>{
console.log('Not Connected');
});
const app = express();

app.use(session({
store : new MonogoStore({mongooseConection:mongoose.connection}),
cookie :{maxAge:180*60*1000}
}));
app.use(function(req,res,next){

res.locals.session = req.session;
next();
});
const users = require('./routes/users');
const port = 3000;
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users',users);
app.get('/',(req,res,send)=>{
 res.send('Invalid Enpoints');
});

app.listen(port,()=>{
  console.log('Server started at port '+port);
});