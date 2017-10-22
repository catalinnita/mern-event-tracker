var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomAtts = new Schema({
	name 				: String,
	value 				: String
});

// set up a mongoose model
module.exports = mongoose.model('Event', new Schema({ 
	
	type 				: String,
	name 				: String,
	screen_height 	    : Number,
	screen_width 		: Number,

	visits 				: Number,
	country 			: String,
	city 				: String,	
	
	browser_name 		: String,
	browser_version 	: Number,

	os_name 			: String,
	os_version 			: String,

	device_model 		: String,
	device_vendor 		: String,
	device_type 		: String,

	current_url 		: String,
	initial_referrer 	: String,
	referrer 			: String,

	time				: Date,
	
	custom				: [CustomAtts],
	website				: mongoose.Schema.Types.ObjectId,
	UID					: mongoose.Schema.Types.ObjectId

}));