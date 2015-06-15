define(['text!views/createGroupTemplate.tpl','models/groupModel','controllers/backboneRouter','backbone','underscore'],function(createGroupTemplate,GroupModel,router,Backbone,_){
	var CreateGroupView= Backbone.View.extend({
		el: '.page',
        events:{
            "click #createGroupBtn": "createGroup"
        },
		createGroup: function(e){
            debugger;
            e.stopPropagation();
            e.preventDefault();
            var that=this;
            var groupName= $('#inputGroup').val();
            var createGroupModel= new GroupModel({ groupName: groupName});
            createGroupModel.save({},{
                error:function(model, xhr, options){
                   
            },success:function(model, response, options){
                
                   if(response.createStatus===1){
                        window.location.hash = 'main';
                   }
            }});
        },
		render: function(){
			var template= _.template($(createGroupTemplate).html());
			this.$el.html(template);
		},
		
	});
	return CreateGroupView;
});

//# sourceURL=executor.js