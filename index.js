'use strict';

var request = require('request'),
	root = 'https://api.payant.ng';

var resources = {
	clients: require('./resources/clients'),
    invoices: require('./resources/invoices'),
    payments: require('./resources/payments'),
    products: require('./resources/products'),
    misc: require('./resources/misc'),
}

function Payant(key) {
  if (!(this instanceof Payant)) {
    return new Payant(key);
  }

  this.key = key;
  this.importResources();
}

Payant.prototype = {
	extend:  function(resource) {
	  	// This looks more sane.
	  	var self = this;
    
	    return function() {
	    	
			function convert_to_array(object) {
				var args = new Array(object.length);
			    for(var i = 0; i < object.length; ++i) {
			    	args[i] = object[i];
			    }			
			    return args;
			}	  
			
			function endpoint_merge(item, main, merge) {
				var item = "{" + item + "}";
				var main_split = main.split("/");
				var index = main_split.indexOf(item);
				
				main_split[index] = merge;
			
				return main_split.join("/");
			}  	
			
			function params_test(data, array) {
			
				return array.every(function(item, index, array) {
					if(item.indexOf("*") === -1) {
						// Not required
					}
					// Required
					item = item.replace("*", "");

					if(!(item in data)) {
						return false;
					} else {
						return true;
					}
				});
			}
	    	
	    	var parameters, options, callback, method, data, request_options,
	    	    endpoint = [root, resource.endpoint].join('');
	    
			// Convert argument to array
			var parameters = convert_to_array(arguments);
			
			options = parameters[0];
			data = options.data;  // Data provided
			
			// Method checking 
      		method = resource.method in {"get":'', "post":'', "put":'', "delete":''}
      			   ? resource.method
      			   : (function () { throw new Error("Method not Allowed! - Resource declaration error") })()
			
			// Check for callback & Pull it out from the array
			callback = parameters.length > 0 && typeof parameters.slice(parameters.length-1)[0] === "function" 
						   ? parameters.splice(parameters.length-1)[0] 
						   : undefined;
			
			// Checking for reference & inserting it 	
			if(resource.args) {
				resource.args.filter((item) => {
					if(options[item] && options[item] !== undefined) {
						endpoint = endpoint_merge(item, endpoint, options[item]) 
					}
				})
			}
			
			// Checking for post data
			if(resource.params) {
				var resource_list = resource.params,
					index = 0,
					bool = params_test(data, resource_list[index]);
				
				while(!bool) {
					if(!resource_list[index++]) {
						throw new Error ("Required Parameters Ommitted");
					}
					bool = params_test(data, resource_list[index++]);
				}
			}
			
			// Making request
			request_options = {
				url: endpoint,
				json: true,
				method: method.toUpperCase(),
				headers: {
					'Authorization': ['Bearer ', self.key].join('')
				}
			}
			
			if(method === "post" || method === "put") {
				request_options.body = data;
			}
			else if(method === "get") {
				request_options.qs = data;
			}
			
			return new Promise(function(fulfill, reject) {
				request(request_options, function(error, response, body) {
			    	if (error){
            			reject(error);
          				return;
          			}
          			else if(body.status === "error"){
            			reject(body);
            			return;
            		}
            		else {
            			fulfill(body);
            		}
            	});
            }).then(function(value) {
               	if(callback) {
               		// This is an hack for nodejs 7.2.0
            		return Promise.fulfill(callback(null, value));
            	}
            	return Promise.fulfill(value);
            }, function(reason) {
               	if(callback) {
            		return Promise.reject(callback(reason, null));
            	}
            	return Promise.reject(reason);
            });
		}
	},

	importResources: function() {
		var anon;
		// Looping over all resources
		for (var j in resources) {
			// Creating a surrogate function
			anon = function(){};	
			// Looping over the properties of each resource
			for(var i in resources[j]) {	
				anon.prototype[i] = this.extend(resources[j][i]);
			}
			Payant.prototype[j] = new anon();
		}
	}
};


module.exports = Payant;
