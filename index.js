//Disclaimer: this app will be continuously updated as i go through my learning of webdevelopment and design.

const express = require("express");
const path = require('path');
// //path returns the path app.use it is looking for the public folder
const app = express();
const { engine } = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');


// creates a port for our server
const PORT = process.env.PORT || 5000;
//set static path


// set middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// //setting middlewared for body parser (this will unencode the form)
app.use(bodyParser.urlencoded({extended:false}));

// makes an request API 
function call_api(finishedAPI, ticker='aapl'){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=sk_45616f269c86499bbb7fca47719943f7', {json:true},(err,res,body)=>{
        if(err){return console.log(err);}
        if(res.statusCode === 200){finishedAPI(body)};
    });
};


//Set handlebar routes
app.get('/', function (req, res){
    call_api(function(doneAPI) {
      res.render('home', { 
      stock: doneAPI
      });
    });
});

// create post route
app.post('/', function (req, res){
    call_api(function(doneAPI) {
      posted_stuff = req.body.stock_ticker; // grabbing the name attribute
      res.render('home', { 
      stock: doneAPI,
      });
    },req.body.stock_ticker);
});

app.get('/info', function (req, res){
    res.render('info');
});
// app.get('/', (req, res) => {
//     res.render('home');
// });
// this is a dynamic route^^ this is handlebars taking over the homepage
// set static path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log('listening on ' + PORT));


