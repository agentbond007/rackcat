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

			if(req.wantsJSON) {
				res.json(racks);
			}else{
				res.view('rack/index', { racks: racks});
			}

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

			if(req.wantsJSON) {
				res.json(rack);
			}else{
				res.view('rack/detail', { rack: rack });
			}
		});
	}
};
