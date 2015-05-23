/**
* Rack.js
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
    size: {
      type: 'integer',
      required: true
    },
    metadata: {
      type: 'json'
    },


    location: {
      model: 'location'
    },
    items: {
      collection: 'item',
      via: 'rack'
    },
    tags: {
      collection: 'tag',
      via: 'racks'
    },
    comments: {
      collection: 'comment',
      via: 'rack'
    }
  }
};
