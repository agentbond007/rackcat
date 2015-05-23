module.exports = {
  isCurrentPage: function(req, controller, action) {
    if(!action){
      return(req.options.controller === controller);
    }else{
      return (req.options.controller === controller && req.options.action === action);
    }
  }
};
