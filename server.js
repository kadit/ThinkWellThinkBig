var myThinkWellThinkBig= myThinkWellThinkBig || {};
myThinkWellThinkBig.serverStart= (function(){
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var passport = require('passport');
var bcrypt = require('bcrypt');
var session = require('express-session');
var uuid = require('uuid');
var nodemailer = require("nodemailer");
var schemas= require("./db/schemas.js");
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var fs = require('fs');
var User,Group;
var config= (function(){
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
	return obj;
})();
app.listen(8000, function () {
	schemas.createSchemas();
	User= schemas.User;
	Group= schemas.Group;
	Guid= schemas.Guid;
	console.log("Node server started on port 8000...");


});
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

var smtpTransport = nodemailer.createTransport("SMTP",{

		host: 'smtp.gmail.com', 
		connectionTimeout : 1000000,
		debug :false,
		port: 25, 
		auth: { user: config.auth.user, pass: config.auth.pass }
});

//DEfining passport stategy for form based auth
passport.use(new LocalStrategy({
    // set the field name here
    usernameField: 'userMailId',
    passwordField: 'userPassword'
  },
  function(userMailId, password, done) {
    User.findOne({"userMailId":userMailId},function(err,user){
		 if(!user){

		 	return done(null, false, {message: "The user does not exist"});
		 }
          
        
       bcrypt.compare(password, user.userPassword, function(err, res) {
    		if(res===true){
    				 return done(null, user);
    		}else{
    			return done(null, false, {message: "Wrong password"});
    		}
		});
        
          
         
	});
    
  }
));

/*
	Passport Serialize and deserialize users from the session and db


*/
passport.serializeUser(function(user, done) {
  done(null, user.userMailId);
});

passport.deserializeUser(function(userMailId, done) {
  User.findOne({"userMailId":userMailId},function(err,user){
		 if(!user){
		 	 done(null, null);
		 }else{
			done(null, user);
		 }   
         
	});
});

//Logout
app.get('/logout', function(req, res){
  if(req.isAuthenticated()){
    req.logout();
  }
    res.status(200).send({logoutStatus:1});
});


app.get('/GroupConversation',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		var queryObj= req.query;
		queryObj.groupName=queryObj.groupName.replace("+"," ").trim();
		
		Group.find(queryObj, function (err, docs) {
	        res.json(docs);
	        res.end();
		});
	}
	
});

app.post('/GroupConversation',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		var reqBody= req.body;
		var groupName= reqBody.groupName;
		var groupPost= reqBody.groupPost;
		var user= req.session.passport.user;
		Group.findOne({"groupName":groupName}, function (err, group) {
			if(err){
				res.status(500).send(err);
			}else if(group===null){
				res.status(500).send("No group found");
			}else{
				group.groupConversation.push({
					user:user,
					groupPost:groupPost
				});
				group.save(function(err,data){
					if(err){
		 					res.status(500).send(err);
		 			}else{
		 				res.status(201).send({"postStatus":1});
		 			}
				});
			}
	        
		});
	}
});

//Implementing the post on login

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(201).send({authStatus:1,user:user});
    });
    
  })(req, res, next);
});

app.post('/UsersToGroup',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		var reqBody= req.body;
		var usersToBeAdded= reqBody.usersToBeAdded;
		var groupName= reqBody.groupName;

		Group.findOne({"groupName":groupName}, function (err, group) {
			    if(err){
			 			res.status(500).send(err);
			 	}else if(group===null){
						res.status(500).send("No group found");
			 	}else{
			 		for(var i=0;i<usersToBeAdded.length;i++){
			 			group.groupMembers.push(usersToBeAdded[i]);
			 		}
			 		group.save(function(err,data){
			 			if(err){
			 					res.status(500).send(err);
			 			}else{
			 				res.status(201).send({postStatus:1});
			 			}
			 		});
			 	}
		});
		for(var u=0;u<usersToBeAdded.length;u++){
			User.findOne({"userMailId":usersToBeAdded[u].userMailId},function(err, user){
				user.userInGroups.push(groupName);
				user.save(function(err,data){
					if(err){
			 					console.log("Error adding group to user ");
			 			}
				});
			});
		}

	}
	

});

app.get('/login', function(req, res){
  if(req.user){
    res.redirect('/');
  } else {
     res.redirect('/');
    
  }
});

app.get("/Users",function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		 User.find({"referedBy":req.session.passport.user}, function (err, docs) {
		 	if(err){
		 			res.status(500).send(err);
		 	}else if(docs===null){
					res.status(500).send("No reference found for the user");
		 	}else{
		 		res.json(docs);
	        	res.end();
		 	}
	        
	    });
	}
});


app.get('/User', function (req, res) {
	var queryObj= req.query;
	if(isEmpty(queryObj)) {
		res.status(500).send(queryObj);
	}else{
    	User.find(queryObj, function (err, docs) {
            res.json(docs);
            res.end();
        });
    }  
});

app.get("/Groups",function(req,res){
	var queryObj= req.query;
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		if(queryObj["groupName"]){
			queryObj.groupName=queryObj.groupName.replace("+"," ").trim();
	
			Group.find(queryObj, function (err, docs) {
		        res.json(docs);
		        res.end();
	    	});
		}else{
				User.findOne({"userMailId":req.session.passport.user},function(err,user){
			if(err){
				res.status(500).send(String(err));
			}else if(user===null){
				res.status(500).send("No such user");
			}else{
				var groupsArray= user.userInGroups;
				Group.find()
					  .where('groupName')
					  .in(groupsArray)
					  .exec(function (err, records) {
					  		if(err){
					  			res.status(500).send(err);
					  		}else if(records===null){
					  			res.status(500).send("No records found");
					  		}else{
					  			res.json(records);
		        				res.end();
					  		}
					    	
					  });

			}
			});
		}
	}
	 
});

/*
	POST requests section

*/

app.post("/ReferUser",function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
		var reqBody= req.body;
		var guid= new Guid({
					guid:uuid.v1(),
					groupName: reqBody.group,
					referedBy: req.session.passport.user
		});
		guid.save(function(err,data){
			if(err){
				res.status(500).send(String(err));
			}else{
				var mailOptions={
					to : reqBody.toEmailId,
					subject : 'New User registration for Think well Think big',
					text : reqBody.mailContent+"\nYou have been referred to join the group : "+data.groupName+"\nPlease login with the following id\n"+data.guid
				}	
				smtpTransport.sendMail(mailOptions, function(error, response){
				if(error){
						res.status(500).send("Error sending mail");
				}else{
						
						res.status(201).send({mailSentStatus:1});
				}
				});
				smtpTransport.close();

			}
		});
}
});

app.post("/AuthUserCleanup",function(req,res){
	User.findOne({"userMailId":"AuthTestUser@yahoo.com"},function(err,user){
		if(err){
			res.status(500).send(String(err));
		}else{
			user.userInGroups=[];
			user.userCreatedByGroups=[];
			user.save(function(err,data){
				if(err){
					res.status(500).send(String(err));
				}else{
					res.status(201).send({"postStatus":1});
				}
			});
		}
	});
});

app.post("/Users",function(req,res){
	var reqBody= req.body;
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(reqBody.userPassword, salt, function(err, hash) {
    		if(err){
    			res.status(500).send(String(err));
    		}else{
				    Guid.findOne({"guid":reqBody.userGuid},function(err,data){
					if(err){
						res.status(500).send(String(err));
					}else if(data===null){
						res.status(500).send("No guid found");
					}
					else{
						var userGroup= data.groupName;
						var userGroupArray= [];
						userGroupArray.push(userGroup);

						var user= new User({
										userMailId: reqBody.userMailId,
										userName: reqBody.userName,
										userPassword:hash,
										userFirstName: reqBody.userFirstName,
										userLastName: reqBody.userLastName,
										userInGroups: userGroupArray,
										referedBy:data.referedBy
								
						});
						user.save(function(err,userData){
										if(err){
											res.status(500).send(String(err));
										}else{
											data.remove(function(err,data) {
									            if( !err ) {
									                console.log( "GUID deleted" );    
									            } else {
									                console.log( "GUID delete error" );    
									            }
								        	});
								        	Group.findOne({"groupName":userGroup},function(err,group){
								        		if(err){
								        			console.log("Error adding new user to group");
								        		}else{
								        			group.groupMembers.push({
								        					"userMailId": userData.userMailId,
               												"userName": userData.userName          
								        			});
								        			group.save(function(err,groupData){
								        				if(err){
								        					res.status(500).send(String(err));
								        				}else{
								        					res.status(201).send({"postStatus":1,"userData":userData});

								        				}
								        			});
								        		}
								        	});
											
							
										}
						});
					}
				});
    		}
        	
    	});
	});
	
});

app.post("/Groups",function(req,res){
	if(!req.session.passport.user){
		res.status(401).send("User not authenticated");
	}else{
			User.findOne({"userMailId":req.session.passport.user},function(err,user){
			if(err){
				res.status(500).send(String(err));
			}else if(user===null){
					res.status(500).send("No such user found");
			}else{
				var reqBody= req.body;
				var group= new Group({
					groupName: reqBody.groupName,
					groupCreatedBy:req.session.passport.user,
					groupMembers: [
						{
							"userMailId": req.session.passport.user,
							"userName":user.userName
						}
					]
			
				});
				group.save(function(err,data){
				if(err){
					res.status(500).send(String(err));
				}else{
					user.userCreatedByGroups.push(data.groupName);
					user.userInGroups.push(data.groupName);
					user.save(function(err,data){
						if(err){
							res.status(500).send(String(err));
						}else{
							res.status(201).send({"createStatus":1});
						}
					});
					
				}
				});

			}
		});
	}
	
});

/*
	DELETE requests section

*/
app.delete('/Users/:userEmailId', function( request, response ) {
	User.findOne({"userMailId":request.params.userEmailId}, function( err, user ) {
    	if (user===null) {
    		return response.status(500).send("No user" );
    	}
    	return user.remove( function(err,data) {
            if( !err ) {
                console.log( 'User deleted' );
                return response.status(200).send( data );
            } else {
                console.log( err );
                return response.status(500).send(err);
            }
        });
    });
});

app.delete('/Groups/:groupName', function( request, response ) {
    Group.findOne({"groupName":request.params.groupName}, function( err, group ) {
    	if (group===null) {
    		return response.status(500).send("No group" );
    	}
    	return group.remove( function(err,data) {
            if( !err ) {
                console.log( 'Group deleted' );
                return response.status(200).send( data );
            } else {
                console.log( err );
                return response.status(500).send(err);
            }
        });
    });
});

var isEmpty= function(obj) {

    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
})();




	

   





