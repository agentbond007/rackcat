/**
 * LocationController
 *
 * @description :: Server-side logic for managing Locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){
		Location.find()
		.populate('racks')
		.populate('tags')
		.populate('comments')
		.exec(function findLocations(err, locations){
			if(err) return res.send(500);

			if(req.wantsJSON) {
				res.json(locations);
			}else{
				res.view('location/index', { locations: locations});
			}
		});

	}
};
