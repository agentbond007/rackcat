/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req, res){
    res.view('dashboard');
  }
};
