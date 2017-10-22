cu_parse = function( atts ) {

	var ret = [];
	var attsa = atts.split("&");

	for ( i = 0 ; i < attsa.length ; i++ ) { 
    	var attsp = attsa[i].split("=");
    	var attsi = {};
    		attsi['Name'] = attsp[0];
    		attsi['Value'] = attsp[1];
    	
    	ret.push( attsi ); 
    }

    return ret;

}

module.exports = cu_parse;