var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./database/database_connection');
var port = 3000;
var statusCode = 200;

app.use(express.static('public'));

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/users', (req, res) => {
	statusCode = 201;
	console.log('req.body >>>>>>>>>>>>>', req.body);
	var queryArgs = [req.body.name, req.body.email, req.body.password];
	console.log('queryArgs >>>>>>>>>>>', queryArgs);
	connection.query('SELECT * FROM users WHERE email=?', queryArgs[1], (error, results, fields) => {
		if(error) {
			statusCode = 500;
			console.error(error);
			res.status(statusCode)
			res.send(error);
		} else if(results.length) {
			statusCode = 400;
			console.log('USER EXISTS!')
			console.log('fields:', fields);
			console.log('results:', results);
			res.status(statusCode)
			res.send('That email is taken.');
		} else {
			connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', queryArgs, (error, results, fields) => {
				if(error) {
					statusCode = 500;
					console.error(error);
					res.status(statusCode)
					res.send(error);
				}
				console.log('results:', results);
				console.log('fields', fields);
				res.status(statusCode)
				res.send('User created');
			});
		}
	});
});

app.post('/addresses', (req, res) => {
	statusCode = 201;
	var queryArgs = [req.body.address_line_1, req.body.address_line_2, req.body.city, req.body.state, req.body.zip, req.body.phone_number, req.body.email];
	connection.query('INSERT INTO addresses (line_1, line_2, city, state, zip_code, phone_number, user_id) VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM users WHERE email=?));', queryArgs, (error, results, fields) => {
		if(error) {
			statusCode = 500;
			console.error(error);
			res.status(statusCode)
			res.send(error);
		}
		console.log('results:', results);
		console.log('fields', fields);
		res.status(statusCode)
		res.send('address added');
	});
});

app.post('/payment_methods', (req, res) => {
	statusCode = 201;
	var queryArgs = [req.body, req.body.expiration_date, req.body.cvv, req.body.billing_zip_code, req.body.email];
	console.log('PAYMENT METHOD>>>>>>>', queryArgs);
	connection.query('INSERT INTO payment_methods (credit_card_number, expiration_date, cvv, billing_zip_code, user_id) VALUES (?, ?, ?, ?, (SELECT id FROM users WHERE email=?));', queryArgs, (error, results, fields) => {
		if(error) {
			statusCode = 500;
			console.error(error);
			res.status(statusCode)
			res.send(error);
		}
		console.log('results:', results);
		console.log('fields', fields);
		res.status(statusCode)
		res.send('payment method added');
	});
});

app.listen(port, () => console.log('listening on port ', port, '------------'));