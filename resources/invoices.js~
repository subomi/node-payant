'use strict';

var root = '/invoices';

module.exports = {

  //  Add Invoice
  //  This is still tricky
  add: {
      method: 'post',
      endpoint: root,
      params: ['first_name*', 'last_name*', 'email*', 'phone*']
    },

  //  Get Invoice
  get: {
      method: 'get',
      endpoint: [root, '/{ref}'].join(''),
      args: ['ref']
    },

  //  Send Invoice
  send: {
      method: 'get',
      endpoint: [root, '/send', '/{ref}'].join(''),
      args: ['ref']
    },

  //  Invoice History
  history: {
      method: 'post',
      endpoint: [root, '/history'].join(''),
      params: ['period*', 'start', 'end']
    },

  //  Delete Invoice
  delete: {
      method: 'delete',
      endpoint: [root, '/{ref}'].join(''),
      args: ['ref']
  },
};
