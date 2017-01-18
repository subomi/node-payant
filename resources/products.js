'use strict';

var root = '/products';

module.exports = {

  //  Create Product
  create: {
      method: 'post',
      endpoint: root,
      params: [
      			['customer*', 'plan*', 'authorization']
    		  ]
    },

  //  Disable Product
  disable: {
      method: 'post',
      endpoint: root,
      params: [
      			['code*', 'token*']
    		  ]
    },

  //  Enable Product
  enable: {
      method: 'post',
      endpoint: root,
      params: [
      			['code*', 'token*']
    		  ]
    },

  // Get Product
  get: {
      method: 'get',
      endpoint: [root, '/{ref_or_subscription_code}'].join(''),
      args: ['ref_or_subscription_code']
  },
  
  // List Product
  list: {
      method: 'get',
      endpoint: root
    }

};
