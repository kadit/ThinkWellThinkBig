define(['backbone'],function(Backbone){
	var RegisterUser = Backbone.Model.extend({
    	urlRoot: '/Users'
	});

	return RegisterUser;
});