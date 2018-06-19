/* 
	Module 4 Lab: REST API with Mongoose
	@author: César Alberto Trejo Juárez
	@email: cesaratj27@gmail.com
 	Model of our ODM for customers
*/

const mongoose = require('mongoose');

const AccountModel = mongoose.model('Account', {
	name: String,
	balance: Number,
});

module.exports = AccountModel;