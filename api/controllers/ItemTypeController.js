/**
 * ItemTypeController
 *
 * @description :: Server-side logic for managing Itemtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
	}
};
