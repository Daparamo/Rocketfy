const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();

const productsRoutes = require('./routes/products');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://tempdpt:Knx075Xn219tSCrj@rocketfy.bx653vz.mongodb.net/?retryWrites=true&w=majority&appName=rocketfy')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));
// */
// Settings
app.set('port', process.env.port || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/products', productsRoutes);



// Starting The Server
app.listen(app.get('port'), () => {
    console.log("server on port ", app.get('port'));
});