/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){

		Item.find()
		.populate('rack')
		.populate('type')
		.populate('tags')
		.exec(function list(err, items){
			if(err) return res.send(500);

			if(req.wantsJSON) {
				res.json(items);
			}else{
				res.view('item/index', { items: items});
			}

		});
	},
	create: function create(req, res){
		res.send(200);
	},
	createNew: function createNew(req, res){
		res.send(200);
	},
};
