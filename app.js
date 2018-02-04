var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
console.log('Connected to '+config.database);
});
mongoose.connection.on('error',(err)=>{
console.log('Not Connected');
});
const app = express();

const users = require('./routes/users');
const port = 3000;
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use('/users',users);
app.get('/',(req,res,send)=>{
 res.send('Invalid Enpoints');
});

app.listen(port,()=>{
  console.log('Server started at port '+port);
});