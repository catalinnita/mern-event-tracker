var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Project', new Schema({ 
	name: 				String, 
	admins: 			Array, 
	viewers: 			Array,
	website: 			mongoose.Schema.Types.ObjectId 
}));