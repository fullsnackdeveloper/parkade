const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

const db = require('./config/keys').mongoURI;
const Ticket = require( './api/models/ticketModel' );

mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
require( './api/routes/ticketRoutes' )(app);

app.listen(port);
