'use strict';

var root = '/products';

module.exports = {

  /*
  Create subscription
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['customer*', 'plan*', 'authorization']
    },

  /*
  Disable subscription
  */
  disable: {
      method: 'post',
      endpoint: root,
      params: ['code*', 'token*']
    },

  /*
  Enable subscription
  */
  enable: {
      method: 'post',
      endpoint: root,
      params: ['code*', 'token*']
    },

  /*
  Get subscription
  */
  get: {
      method: 'get',
      endpoint: [root, '/{ref_or_subscription_code}'].join(''),
      args: ['ref_or_subscription_code']
  },

  /*
  List subscription
  */
  list: {
      method: 'get',
      endpoint: root
    }

};
