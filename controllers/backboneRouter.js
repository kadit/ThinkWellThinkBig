define(['backbone','views/loginView','views/mainPageView','views/createGroupView','views/registerView'],function(Backbone,LoginView,MainPageView,CreateGroupView,RegisterUserView){
	
		var Router= Backbone.Router.extend({
		routes:{	
			'':'home',
			'main':'main',
			'createGroup':'createGroup',
			'register':'register'
		}
	});

	var loginView= new LoginView();
	var mainPageView= new MainPageView();
	var createGroupView= new CreateGroupView();
	var registerUserView= new RegisterUserView();

	var router= new Router();
	router.on('route:home',function(){
		loginView.render();
	});
	router.on('route:main',function(){
		mainPageView.render();
	});
	router.on('route:createGroup',function(){
		createGroupView.render();
	});
	router.on('route:register',function(){
		registerUserView.render();
	});
	Backbone.history.start();
	return router;

});