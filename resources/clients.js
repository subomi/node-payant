'use strict';

var root = '/clients';

module.exports = {

  //  Add client
  add: {
      method: 'post',
      endpoint: root,
      params: [
      			['first_name*', 'last_name*', 'email*', 'phone*']
  			  ]
  },

  //  Get customer
  get: {
      method: 'get',
      endpoint: [root, '/{ref}'].join(''),
      args: ['ref']
  },
  
  //  Edit customer
  edit: {
  	  method: 'put',
  	  endpoint: [root, '/{ref}'].join(''),
  	  args: ['ref'],
  	  params: [
  	  			['first_name*', 'last_name*', 'email*', 'phone*']
  			  ]
  },
  
  //  List customers
  'delete': {
      method: 'delete',
      endpoint: [root, '/{ref}'].join(''),
      args: ['ref']
    },
};
