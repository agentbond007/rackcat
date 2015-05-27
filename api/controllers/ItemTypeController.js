/**
 * ItemTypeController
 *
 * @description :: Server-side logic for managing Itemtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){

		Itemtype.find()
		.populate('items')
		.exec(function list(err, itemtypes){
			if(err) return res.send(500);

			if(req.wantsJSON) {
				res.json(itemtypes);
			}else{
				res.view('itemtype/index', { itemtypes: itemtypes});
			}

		});
	},

	findByName: function findByName(req, res){

		Itemtype.find({
			where: {
				name: req.body.query
			}
		}).exec(function(err, itemtype){
			if(err) return res.send(500);

			if(itemtype.length > 0){
				res.json({ message: res.i18n('Error.ItemType.Create.UniqueName'), length: itemtype.length, unique: false });
			}else{
				res.json({ unique: true });
			}

		});
	},

	create: function create(req, res){
		res.view('itemtype/create');
	},

	createNew: function createNew(req, res){
		res.send(200);
	},
};
