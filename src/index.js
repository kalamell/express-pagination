const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const route = require('./routes/index');
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/express-pagination', {
    useNewUrlParser: true
}).then(() => console.log(`db is connected`))
  .catch(err => console.log(err));

//settting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use(route);

// static files

app.listen(app.get('port'), () => {
    let port = app.get('port');
    console.log(`server on port ${port}`);
})