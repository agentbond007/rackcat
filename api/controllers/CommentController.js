/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res){
		Comment.create(req.body, function(err, comment){
			if (err) return res.json(err, 400);

			Comment.findOneById(comment.id )
			.populate('user')
			.populate('location')
			.populate('rack')
			.populate('item')
			.exec(function(err, comment){
				res.json(comment);
			});

		});
	}
};
