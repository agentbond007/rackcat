/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    metadata: {
      type: 'json'
    },


    racks: {
      collection: 'rack',
      via: 'location'
    },
    tags: {
      collection: 'tag',
      via: 'locations'
    },
    comments: {
      collection: 'comment',
      via: 'location'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  }
  
};
