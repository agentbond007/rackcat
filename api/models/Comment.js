/**
* Comments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    comment: {
      type: 'string',
      required: true,
    },

    rack: {
      model: 'rack',
    },
    location: {
      model: 'location',
    },
    item: {
      model: 'item',
    },
    user: {
      model: 'user'
    }
  }
};
