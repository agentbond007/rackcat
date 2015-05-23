/**
* Item.js
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
    position: {
      type: 'integer',
    },
    size: {
      type: 'integer'
    },
    metadata: {
      type: 'json'
    },


    type: {
      model: 'Itemtype'
    },
    rack: {
      model: 'Rack'
    },
    tags: {
      collection: 'tag',
      via: 'items'
    },
    comments: {
      collection: 'comment',
      via: 'item'
    }
  }
};
