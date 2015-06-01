/**
* Log.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    category: {
      type: 'string'
    },
    user: {
      type: 'json'
    },
    ip: {
      type: 'ip'
    },
    userAgent: {
      type: 'string'
    },
    headers: {
      type: 'json'
    },
    params: {
      type: 'object'
    },
    body: {
      type: 'object'
    },
    controller: {
      type: 'string'
    },
    action: {
      type: 'string'
    },
    url: {
      type: 'string'
    }
  }
};
