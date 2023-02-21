// const express = require('express');
// const path = require('path');
// const { engine } = require('express-handlebars');
// //path returns the path app.use it is looking for the public folder
// const app = express();
// const request = require('request');
// const bodyParser = require('body-parser');

// const PORT = process.env.PORT || 5500;
// //set static path
// //set midelware
// app.engine('handelbars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');
// //setting middlewared for body parser vv (this will unencode the form)
// app.use(bodyParser.urlencoded({extended:false}));

// // make a request API
// function call_api(finishedAPI) {
//         request('https://cloud.iexapis.com/stable/stock/rdfvf/quote?token=pk_f0839d9e370a4b7b96eac514bd42f529', {json:true}, (err,res,body) => {
//         if(err){return console.log(err);}
//         if(res.statusCode === 200) {finishedAPI(body)};
//     })
// }

// app.get('/', function(req, res) {
//     call_api(function(doneAPI))
//     res.render('home', {
//         stock: doneAPI,
//     });
// });

// app.post('/', function(req, res) {
//     call_api(function(doneAPI) {
//         posted_stuff = req.body.stocker_ticker;
//     res.render('home', {
//         stock: doneAPI,
//     });
// });
// });

// app.get('/info', function(req, res) {
//     res.render('info')
// });
// // this is a dynamic route^^ this is handlebars taking over the homepage
// app.listen(PORT, () => console.log('listening on ' + PORT));

// app.use(express.static(path.join(__dirname, 'public/views')));


const express = require("express");
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');


// creates a port for our server
const PORT = process.env.PORT || 5000;

// set middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//set middleware for body parser
app.use(bodyParser.urlencoded({extended:false}));

// make a request API 
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

// set static path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log('listening on ' + PORT));


