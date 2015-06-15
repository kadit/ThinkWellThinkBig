define(['backbone'],function(Backbone){
	var UsersToGroup = Backbone.Model.extend({
    	urlRoot: '/UsersToGroup'
	});

	return UsersToGroup;
});