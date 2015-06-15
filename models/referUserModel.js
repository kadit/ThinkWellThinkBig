define(['backbone'],function(Backbone){
	var ReferUser = Backbone.Model.extend({
    	urlRoot: '/ReferUser'
	});

	return ReferUser;
});