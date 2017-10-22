// sdata library for sending data
// pageviews
// events
// transactions

var sdata = {

	// constants
	"api_key" 	 : 'Nick Cerminara',
	"api_secret" : 'password',
	"api_url"    : "http://localhost:3000/api",
	
	// send request

	auth : function () {

		http = new XMLHttpRequest(),

		http.open("POST", sdata.api_url + '/authenticate', true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = function() {

	    	if(http.readyState == 4 && http.status == 200) {
	       		
	       		var data = eval("(" + http.responseText + ")");
	       		console.log(data.token);
	       		sdata.set_cookie('sdt', data.token, 60*60*24, '/');
	       		
    		}

		}

		var params = {};

		params['api_key'] = sdata.api_key;
		params['api_secret'] = sdata.api_secret;

		http.send(sdata.obj_to_param(params));

	},

	send_req : function( params ) {

		http = new XMLHttpRequest(),

		http.open("POST", sdata.api_url + '/addEvent', true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = function() {

	    	if(http.readyState == 4 && http.status == 200) {
	       		//console.log(http.responseText);
    		}

		}

		//console.log(sdata.get_cookie('sdt'));

		params['token'] = sdata.get_cookie('sdt');
		http.send(sdata.obj_to_param(params));

	},

	// utility functions

	merge_attr : function(attr1, attr2) {

    	if( typeof(attr2) != 'undefined' ) {
    		for (var attrname in attr2) { 
    			attr1[attrname] = attr2[attrname]; 
    		}
    	}
    		
    	return attr1;

	},	

	// set cookie

	set_cookie : function( name, val, expires, path ) {

		var expires_date = new Date(sdata.get_time() + expires);
		//console.log(expires_date);

		document.cookie = name + "=" + val + "; expires=" + expires_date + "; path= " + path;

	},

	// get cookie

	get_cookie : function( name ) {

		 var value = "; " + document.cookie;
		 var parts = value.split("; " + name + "=");
		 if (parts.length == 2) 
		 	return parts.pop().split(";").shift();

	},

	obj_to_param : function(obj) {

		var pairs = [];

		for (var prop in obj) {
		  if (obj.hasOwnProperty(prop)) {
		    var k = encodeURIComponent(prop),
		        v = encodeURIComponent(obj[prop]);
		    pairs.push( k + "=" + v);
		  }
		}

		return pairs.join("&");

	},	

	// get data functions

	get_time : function() {

		var timestamp = Date.now();

		return timestamp;

	},

	get_referrer : function( initial ) {

		if( initial ) {
			if(!window.initial_referrer)
				window.initial_referrer = window.referrer;

			if(!window.initial_referrer)
				window.initial_referrer = window.location.href;

			return window.initial_referrer;
		} else {
			if( !window.referrer ) {
				return window.location.href;
			} else {
				return window.referrer;
			}
		}

	},

	get_params : function( atts ) {

		// save all vars for a session so we don't have to build them again

		var params = {};

		// Time
		params['Time'] = sdata.get_time();		

		// Client 
		params['Screen Height'] = window.screen.availHeight;
		params['Screen Width'] = window.screen.availWidth;
		params['User Agent'] = navigator.userAgent; // to be processed on server

		// URL
		params['Current URL'] = window.location.href;
		params['Initial Referrer'] = sdata.get_referrer( true );
		params['Referrer'] = sdata.get_referrer( false );

		// User
		params['ID'] = ''; // after authentication is done
		params['Visits'] = ''; // after authentication is done
		params['Hostname'] = window.location.hostname; // to be processed on server

		//params = sdata.merge_attr( params, atts );
		//console.log(atts);
		params['Custom'] = sdata.obj_to_param(atts);

		return params;

	},

	// tracking functions

	track_event : function( evname, atts ) {

		var params = sdata.get_params( atts );
			params['Type'] = 'event';
			params['Name'] = evname;

		sdata.send_req( params );

	},

	track_pageview : function( page_group, atts ) {

		var params = sdata.get_params( atts );
			params['Type'] = 'pageview';
			params['Page Group'] = page_group;

		sdata.send_req( params );

	},

	track_transaction : function( transaction, amount, atts ) {

		var params = sdata.get_params( atts );
			params['Type'] = 'transaction';
			params['Transaction'] = transaction;
			params['Amount'] = amount;

		sdata.send_req( params );

	},

	init : function() {

		if( !sdata.get_cookie('sdt') ) {
			sdata.auth();
		}

	}

};