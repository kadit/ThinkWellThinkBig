var exports = module.exports = {};


exports.createSchemas= function(){
	var mongoose = require('mongoose');
	var config= (function(){
		var fs = require('fs');
		var obj = JSON.parse(fs.readFileSync('././config.json', 'utf8'));
		return obj;
	})();
	mongoose.connect(config.mongoose.connectURL);
	var UserSchema= new mongoose.Schema({
		userMailId: {type: String, required: true, index: { unique: true } },
		userName: {type: String, required: true},
		userPassword:  {type: String, required: true},
		userFirstName: {type: String, required: true},
		userLastName: {type: String, required: true},
		userInGroups: { type : Array , "default" : [] }, //Refs group name
		userCreatedByGroups: { type : Array , "default" : [] }, //Refs group name
		userRoles:[],
		referedBy:{type: String}
	});

	var GroupSchema= new mongoose.Schema({
		groupName:  {type: String, required: true, index: { unique: true }},
		groupCreatedBy:{type: String},
		groupMembers: [], //Refers the usermail ids.
		groupConversation:[]
	});

	var GuidSchema= new mongoose.Schema({
		guid:  {type: String, required: true, index: { unique: true }},
		groupName: {type: String, required: true},
		referedBy:{type: String, required: true}
	});


	this.User= mongoose.model("User",UserSchema);
	this.Group= mongoose.model("Group", GroupSchema);
	this.Guid= mongoose.model("Guid", GuidSchema);
};