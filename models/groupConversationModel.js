define(['backbone'],function(Backbone){
	var GroupConvModel = Backbone.Model.extend({
    	urlRoot: '/GroupConversation'
	});

	return GroupConvModel;
});