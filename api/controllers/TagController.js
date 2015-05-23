/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){
		Tag.find()
		.populate('racks')
		.populate('locations')
		.populate('items')
		.exec(function findLocations(err, tags){
			if(err) return res.send(500);

			if(req.wantsJSON) {
				res.json(tags);
			}else{
				res.view('tag/index', { tags: tags});
			}
		});
	}
};
