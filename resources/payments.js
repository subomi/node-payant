'use strict';

var root = '/payments';

module.exports = {

  //  Add Payment
  create: {
      method: 'post',
      endpoint: root,
      params: ['reference_code*', 'date*', 'amount*', 'channel*']
    },

  //  Get Payment
  get: {
      method: 'get',
      endpoint: [root, '/{ref}'].join(''),
      args: ['ref']
  },

  //  Payment History
  history: {
      method: 'post',
      endpoint: [root, '/history'].join(''),
      params: ['period*', 'start', 'end']
    },
};
