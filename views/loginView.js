define(['text!views/loginTemplate.tpl','models/loginModel','controllers/backboneRouter','backbone','underscore'],function(loginTemplate,LoginModel,router,Backbone,_){
	var LoginView= Backbone.View.extend({
		el: '.page',
		events: {
            "click #btn-login":  "login_press"
        },
		render: function(){
			var template= _.template($(loginTemplate).html());
			this.$el.html(template);
		},
		login_press: function(e) {
            e.preventDefault();
            $("#loginError").empty();
            var email= $('#email').val();
            var password= $('#key').val();
            var loginModel= new LoginModel({ userMailId: email, userPassword: password });
            loginModel.save({},{
            	error:function(model, xhr, options){
            		console.log("Login Error");
                     var loginErrorHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 11px;'><img src='public/assets/images/error.png'></div>"+
                    "<div class='col-xs-9' style='padding-left:0px !important'><h5><strong>Login error</strong></h5></div></div>";
                    $("#loginError").append(loginErrorHTML);
            },success:function(model, response, options){

            	if(response.authStatus===1){
            		window.location.hash = 'main';
            	}
            }});
        }
	});
	return LoginView;
});