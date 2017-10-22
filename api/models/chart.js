var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Chart', new Schema({ 
	name: 				String, 
	type: 				String, 
	projects: 			Array,
	website: 			mongoose.Schema.Types.ObjectId
}));