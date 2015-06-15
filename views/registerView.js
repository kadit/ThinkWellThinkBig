define(['text!views/registerTemplate.tpl','models/registerUserModel','controllers/backboneRouter','backbone','underscore'],function(registerTemplate,RegisterUserModel,router,Backbone,_){
	var RegisterUserView= Backbone.View.extend({
		el: '.page',
		events: {
            "click #btn-register":  "register"
        },
		render: function(){
			var template= _.template($(registerTemplate).html());
			this.$el.html(template);
		},
		register: function(e) {
            e.preventDefault();
            e.stopPropagation();
            $("#registerInfo").empty();
            var userName= $("#userName").val();
            var userMailId =$("#userMailId").val();
            var userPassword= $("#userPassword").val();
            var userFirstName= $("#userFirstName").val();
            var userLastName= $("#userLastName").val();
            var userGuid= $("#userGuid").val();
            var options= {
                userName:userName,
                userMailId:userMailId,
                userPassword:userPassword,
                userFirstName:userFirstName,
                userLastName:userLastName,
                userGuid:userGuid

            };
           var registerUserModel= new RegisterUserModel(options);
           registerUserModel.save({},{
            error:function(){
                    console.log("Error while saving the user");
                     var registerSuccessHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 11px;'><img src='public/assets/images/error.png'></div>"+
                    "<div class='col-xs-9' style='padding-left:0px !important'><h5><strong>Something went wrong during registration</strong></h5></div></div>";
                    $("#registerInfo").append(registerSuccessHTML);
           },
           success:function(){
                console.log("Saving the user success!!");
                 var registerErrorHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 11px;'><img src='public/assets/images/success.png'></div>"+
                    "<div class='col-xs-9' style='padding-left:0px !important'><h5><strong>Registration successful</strong></h5><a href='#'></a></div></div>";
                    $("#registerInfo").append(registerErrorHTML);
           }

        });
        }
	});
	return RegisterUserView;
});