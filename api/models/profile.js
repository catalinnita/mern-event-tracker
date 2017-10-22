var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Profile', new Schema({ 
	email: 				String, 
	custom: 			Array, 
}));