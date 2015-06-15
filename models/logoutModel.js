define(['backbone'],function(Backbone){
	var Logout = Backbone.Model.extend({
    	urlRoot: '/logout'
	});

	return Logout;
});