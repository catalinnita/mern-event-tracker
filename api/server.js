// modules
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var ua_parse   = require('user-agent-parser');
var jwt        = require('jsonwebtoken');
var cu_parse   = require('./cu_parse');

// db
var config     = require('./config');
var User       = require('./models/user');
var Event      = require('./models/event');
var Project    = require('./models/project');
var Website    = require('./models/website');
var Profile    = require('./models/profile');
var Chart      = require('./models/chart');

// init
var app        = express();

// connect to db
mongoose.connect(config.database, { useMongoClient: true });

// set app details
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
   	res.header("Access-Control-Allow-Origin", "*");
   	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   	next();
});



// APP API ROUTES ------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// api home
apiRoutes.get('/', function(req, res) {

    res.send('Hello! The sData API is at http://localhost:3000/api');
});

// route to authenticate a user - used for login as well
apiRoutes.post('/authenticate', function(req, res) {

  console.log(req.body);

  // search for user
  User.findOne({

    name: req.body.api_key
  
  }, function(err, user) {

    if (err) throw err;

    // no user 
    if (!user) {

      res.json({ success: false, message: 'Authentication failed. User not found.' });
      
    // there is a user 
    } else if (user) {

      // password doesn't match
      if (user.password != req.body.password) {
          
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        
      // password matches  
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours -> set this to a config
        });

        // return the information including token as JSON
        res.json({
          success : true,
          message : 'Enjoy your token!',
          token   : token
        });
      }

    }

  });
});

// create new client account
apiRoutes.post('/register', function (req, res) {
    var r = req.body;

    // create user
    var user = new User({

      'email'           : r['email'],
      'password'        : r['password'],
      'admin'           : true

    });

    // save event
    user.save(function(err) {

      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });

    });  
});

// get events for a specific website
apiRoutes.get('/getEvents', function (req, res) {
});


// WEBSITES API ROUTES -------------

// add event route, used by websites
apiRoutes.post('/addEvent', function (req, res) {

    var r = req.body;
    var ua = ua_parse( r['User Agent'] );

    var custom = cu_parse( r['Custom'] );

    // create event
    var ev = new Event({

      'ID'              : 1,
      
      'Type'            : r['Type'],
      'Name'            : r['Name'],
      'Screen Height'   : r['Screen Height'],
      'Screen Width'    : r['Screen Width'],

      'Visits'          : 1,
      'Country'         : 'none',
      'City'            : 'none', 
      
      'Browser Name'    : ua['browser']['name'],
      'Browser Version' : ua['browser']['major'],

      'OS Name'         : ua['os']['name'],
      'OS Version'      : ua['os']['version'],

      'Device Model'    : ua['device']['model'],
      'Device Vendor'   : ua['device']['vendor'],
      'Device Type'     : ua['device']['type'],

      'Current URL'     : r['Current URL'],
      'Initial Referrer': r['Initial Referrer'],
      'Referrer'        : r['Referrer'],

      'Time'            : r['Time'],

      'Custom'          : custom

    });

    // save event
    ev.save(function(err) {

      if (err) throw err;
      console.log('Event saved successfully');
      res.json({ success: true });

    });

    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end('thanks');
});

// create user profile
apiRoutes.post('/createProfile', function (req, res) {
  
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// get user profile
apiRoutes.get('/getProfile', function (req, res) {
  
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// delete user profile  
apiRoutes.delete('/deleteProfile', function (req, res) {
   
});

// OTHER STUFF -------------------

// tokens
//apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  //var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //console.log("ss", req);
  //if( req.body.originalUrl == '/api/register/' ) {
  //  next();
  //}

  // decode token
  //if (token) {

    // verifies secret and checks exp
   // jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    //  if (err) {
    //    return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //  } else {
        // if everything is good, save to request for use in other routes
   //     req.decoded = decoded;    
   //     next();
   //   }
  //  });

 // } else {

    // if there is no token
    // return an error
  //  return res.status(403).send({ 
   //     success: false, 
   //     message: 'No token provided.' 
  //  });
    
//  }
//});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


var server = app.listen(3000, function () {

  var host = 'http://localhost';
  var port = 3000;

  console.log(host);
  console.log(port);

  console.log("Example app listening at %s:%s", host, port)

});