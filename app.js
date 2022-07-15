var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router = require('./router');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
    console.log('Server start');
});


