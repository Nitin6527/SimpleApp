const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./APIRoutes');
// const errorHandler = require('errorhandler');
// var mongodb= require('mongodb');
const app = express();



app.set('view engine', 'ejs');
app.use(express.static("public"));
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

 mongoose.connect('mongodb://localhost:27017/SimpleApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Dosdollar', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


app.use('/api', api); 
let port = process.env.PORT || 3000;

app.listen(port,  ()=> {
    console.log("Running simpleApp on port " + port);
});

module.exports = app;