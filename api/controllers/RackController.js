/**
 * RackController
 *
 * @description :: Server-side logic for managing Racks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
