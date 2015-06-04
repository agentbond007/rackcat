/**
* Field.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    class: {
      type: 'string',
    },
    cssId: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    required: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
