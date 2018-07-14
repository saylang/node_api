const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

//connect database
mongoose.connect('mongodb://admin:dmin123@ds257590.mlab.com:57590/gql-wiki', { useNewUrlParser: true });
mongoose.connection.once('open',()=>{
	console.log('connected to database');
});

const productRoutes = require('./routes/product');

const accessLogStream = fs.createWriteStream(
	path.join('./', 'logs', 'access.log'),{ flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;
