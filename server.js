/* 
   Module 4 Lab: REST API with Mongoose
   @author: César Alberto Trejo Juárez
   @email: cesaratj27@gmail.com
 
    GET /accounts
    POST /accounts
    PUT /accounts/:id
    DELETE /accounts/:id

	Use save(), remove(), find() and findById() Mongoose methods to save, remove and find documents. Define the account schema as having two fields:

	  name: String,
	  balance: Number

	For the Express server, use morgan for request logging, errorhandler for error handling and body-parser for parsing of payloads.

	When you are done, be sure to test the endpoints!

	You can test your endpoints with the following curl requests:

	//posts account data

	curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "savings"}' "http://localhost:3000/accounts"

	//gets account data

	curl "http://localhost:3000/accounts"

	//updates account data at specific id, NOTE: replace 'id' in "http://localhost:3000/accounts/id" with the id generated by the previous POST command

	curl -H "Content-Type: application/json" -X PUT -d '{"balance": "1500"}' "http://localhost:3000/accounts/id"

	//deletes account data at specific id, NOTE: replace 'id' in "http://localhost:3000/accounts/id" with the id generated by the previous POST command

	curl -X DELETE "http://localhost:3000/accounts/id"

*/

const express = require('express');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Account = require('./app/controllers/account.js');

const url = 'mongodb://localhost:27017/edx-course-db';
const port = 3000;

let app = express();
mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/accounts', (req, res, next) => {
	Account.find({}, null, {sort: {_id: -1} }, (err, accounts) => {
		if (err) return next(err);
		res.send(accounts);
	})
});

app.get('/accounts/:id', (req, res, next) => {
	Account.findById(req.params.id, (err, account) => {
		if (err) return next(err);
		res.send(account.toJSON());
	})
});

app.post('/accounts', (req, res, next) => {
	let newAccount = new Account(req.body);
	newAccount.save((err, results) => {
		if (err) return next(err);
		res.send(results);
	});
});

app.put('/accounts/:id', (req,res,next) => {
	Account.findById(req.params.id, (err, account) => {
		if (err) return next(err);
		if (req.body.name) account.name = req.body.name;
		if (req.body.balance) account.balance = req.body.balance;
		account.save((err, results) => {
			res.send(results);
		});
	});
});

app.delete('/accounts/:id', (req, res, next) => {
	Account.findById(req.params.id, (err, account) => {
		if (err) return next(err);
		account.remove((err, results) => {
			if (err) return next(err);
			res.send(results);
		})
	})
});

app.use(errorHandler());
app.listen(port);



