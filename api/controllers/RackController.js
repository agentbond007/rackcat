/**
 * RackController
 *
 * @description :: Server-side logic for managing Racks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){
		Rack.find()
		.populate('location')
		.populate('items')
		.populate('tags')
		.exec(function list(err, racks){
			if(err) return res.send(500);
			res.json(racks);
		});

	},

	findOne: function findOne(req, res){
		Rack.findOne({
			id: req.params.id
		})
		.populate('location')
		.populate('items')
		.populate('tags')
		.exec(function findOne(err, rack){
			if(err) return res.send(500);
			res.json(rack);
		});
	},

	findByName: function findByName(req, res){

		Rack.find({
			where: {
				name: req.body.query
			}
		}).exec(function(err, rack){
			if(err) return res.send(500);

			if(itemtype.length > 0){
				res.json({ message: res.i18n('Error.Rack.Create.UniqueName'), length: rack.length, unique: false });
			}else{
				res.json({ unique: true });
			}


		});
	}
};
