define(['text!views/groupDetailsTemplate.tpl','models/groupModel','controllers/backboneRouter','backbone','underscore'],function(groupDetailsTemplate,GroupModel,router,Backbone,_){
	var GroupDetailsView= Backbone.View.extend({
		el: '.page',
		
		render: function(){
			var template= _.template($(groupDetailsTemplate).html());
			this.$el.html(template);
		},
		
	});
	return GroupDetailsView;
});