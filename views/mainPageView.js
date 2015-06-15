define(['text!views/mainPageTemplate.tpl','text!views/groupDetailsTemplate.tpl','text!views/groupConvTemplate.tpl','models/groupModel','models/logoutModel','models/registerUserModel','models/referUserModel','models/usersToGroupModel','models/groupConversationModel','backbone',
    'underscore'],function(mainPageTemplate,groupDetailsTemplate,groupConvTemplate,GroupModel,LogoutModel,RegisterUserModel,ReferUser,UsersToGroupModel,GroupConversationModel,Backbone,_){
	 
  var MainPageView= Backbone.View.extend({
		el: '.page',
        events: {
            "click .detailsImg": "showGroupDetails",
            "click #leftPaneExpandCollapseImg": "toggleMenu",
            "click #logout":"logout",
            "click #createGroup": "createGroup",
            "click .groupItem":"showGroupConversation",
            "hide.bs.modal":"closePopup",
            "click .addUsers": "addUsers",
            "click #addUserToGrp":"addUserToGrp",
            "click #postConversation":"postConversation",
            "click #sendEmail":"sendEmail"
        },
        sendEmail:function(e){
            var that= this;
            $("#sendMailInfo").empty();
            e.stopPropagation();
             var toEmailId= $("#recipient-email").val();
             var mailContent= $("#message-text").val();
             var group=  that.selectedGroupName;
             var referUser= new ReferUser({group: group, toEmailId : toEmailId, mailContent: mailContent});
             referUser.save({},{
                error:function(model, xhr, options){
                       var errorHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 11px;'><img src='public/assets/images/error.png'></div>"+
                "<div class='col-xs-10' style='padding-left:0px !important'><h5><strong>Error sending mail</strong></h5></div></div>";
                $("#sendMailInfo").append(errorHTML);
                 },success:function(model, response, options){
                    if(response.mailSentStatus===1){
                        var successHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 10px;'><img  src='public/assets/images/success.png'></div>"+
                        "<div class='col-xs-10' style='padding-left:0px !important'><h5><strong>Mail sent successfully</strong></h5></div></div>";
                        $("#sendMailInfo").append(successHTML);
                    }
            }});
           
            
                
        },
        closePopup:function(){
            $("#addUsersInfo").empty();
            $("#sendMailInfo").empty();
            
        },
        addUsers:function(e){
          //selection preserve
            e.stopPropagation();
             $(".selected").removeClass("selected");
            $(e.currentTarget.parentNode).addClass("selected");
            $("#displayUsers").modal();

            
        },
        postConversation:function(e){
             e.stopPropagation();
             var msg= $("#postMsg").val();
             var groupConversationModel= new GroupConversationModel({groupName: this.selectedGroupName, groupPost : msg});
             groupConversationModel.save({},{
                success:$.proxy(function(model, response, options){
                    console.log("Posted successfully to the group");
                    this._fetchAndDisplayGroupConversation();

                },this),
                error:function(model, xhr, options){
                     console.log("Error while posting");
                }
             });
        },
        addUserToGrp:function(e){
            e.stopPropagation();
            console.log("Add users called");
            var allVals = [];
             $('#userDetailsChk :checked').each(function() {
                var value= $(this).val();
                var obj= {
                    userName: value.split('/')[0],
                    userMailId:value.split('/')[1]
                }
               allVals.push(obj);
             });
             console.log(allVals);
             var options= {
                groupName:  this.selectedGroupName,
                usersToBeAdded: allVals
             };
             var usersToModel= new UsersToGroupModel(options);
             usersToModel.save({},{
                success: function(model, response, options){
                   
                    var successHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 10px;'><img  src='public/assets/images/success.png'></div>"+
                    "<div class='col-xs-10' style='padding-left:0px !important'><h5><strong>Users added successfully</strong></h5></div></div>";
                    $("#addUsersInfo").append(successHTML);
                },
                error:function(model, xhr, options){
                
                 var errorHTML= "<div class='row'><div class='col-xs-2' style='margin-top: 11px;'><img src='public/assets/images/error.png'></div>"+
                    "<div class='col-xs-10' style='padding-left:0px !important'><h5><strong>Error adding users</strong></h5></div></div>";
                    $("#addUsersInfo").append(errorHTML);
                }
             });
             
        },
        showGroupConversation: function(e){
          //selection preserve
          

            e.stopPropagation();
            e.preventDefault();
            $(".selected").removeClass("selected");
            $(e.currentTarget.parentNode).addClass("selected");
            this.selectedGroupName= $(e.currentTarget.parentNode.childNodes[0].nextSibling).text().trim();
            this._fetchAndDisplayGroupConversation();
           
           
        },
        _fetchAndDisplayGroupConversation:function(){
           var groupConvModel= new GroupConversationModel();
            groupConvModel.fetch({
                data: {groupName: this.selectedGroupName},
                success: $.proxy(function(model, response, options){
                     var template= _.template(groupConvTemplate);
                     $("#pageContent").html(template({"groupConvs":response[0].groupConversation}));
                },this),
                error:function(model, response, options){
                    console.log("Error");
                
                }
            });
        },
        showGroupDetails:function(e){
          //selection preserve
            e.stopPropagation();
            $(".selected").removeClass("selected");
            $(e.currentTarget.parentNode).addClass("selected");
            this.selectedGroupName=$(e.currentTarget.parentNode.childNodes[0].nextSibling).text().trim();
            console.log("Group Details Clicked"+ this.selectedGroupName);
            var groups= new GroupModel();
            groups.fetch({
            data: {groupName: this.selectedGroupName},
            success:$.proxy(function(model, response, options){
                console.log("Success");
                var template= _.template(groupDetailsTemplate);
                $("#pageContent").html(template({"groupDetails":response[0].groupMembers}));
                
            },this),
            error:function(model, response, options){
                console.log("Error");
                
            }});

            
        },
        createGroup: function(e){
           window.location.hash = 'createGroup'; 
        },
        logout:function(){
            var logoutModel= new LogoutModel();
            logoutModel.fetch({
                success:function(model, response, options){
                    if(response.logoutStatus===1){
                        window.location.hash = '';
                    }
                },
                error:function(model, response, options){
                    console.log("Error logging out");
                }
            });

        },
        toggleMenu: function(e){
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            var cssClass= $("#leftPaneExpandCollapseImg").attr('class');
            if(cssClass==="detailsExpanded"){
                $("#leftPaneExpandCollapseImg").attr("src", "public/assets/images/rightArrow.png");
                $("#leftPaneExpandCollapseImg").attr('class',"detailsCollapsed");
            }else if(cssClass==="detailsCollapsed"){
                  $("#leftPaneExpandCollapseImg").attr("src", "public/assets/images/leftArrow.png");
                  $("#leftPaneExpandCollapseImg").attr('class',"detailsExpanded");
            }
        },
		    render: function(){
            var groups= new GroupModel();
            var users= new RegisterUserModel();
            groups.fetch({
            success:$.proxy(function(model, response, options){
                users.fetch({
                    success:$.proxy(function(usermodel, userResponse, useroptions){
                         var template= _.template(mainPageTemplate);
                         this.$el.html(template({"items":response,"users":userResponse}));
                    },this),
                    error:function(usermodel, userResponse, useroptions){
                        console.log("Error fetching users");
                        window.location.hash = '';
                    }
                });

               
            },this),
            error:function(model, response, options){
                 console.log("Error");
                 window.location.hash = '';
            }});
			
            
		},
		
	});
	return MainPageView;
});

//# sourceURL=executor.js