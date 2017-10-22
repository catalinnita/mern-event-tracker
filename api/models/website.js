var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Website', new Schema({ 
	url: 				String, 
	admins: 			Array, 
	viewers: 			Array,
	projects: 			Array 
}));