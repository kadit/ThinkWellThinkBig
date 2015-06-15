define(['backbone'],function(Backbone){
	var AccountModel = Backbone.Model.extend({
    	urlRoot: '/login'
	});

	return AccountModel;
});