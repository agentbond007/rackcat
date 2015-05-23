/**
* Tag.js
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
      via: 'tags'
    },
    locations: {
      collection: 'location',
      via: 'tags',
    },
    items: {
      collection: 'item',
      via: 'tags'
    }
  }
};
