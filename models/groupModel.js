define(['backbone'],function(Backbone){
	var GroupModel = Backbone.Model.extend({
    	urlRoot: '/Groups'
	});

	return GroupModel;
});