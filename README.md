ThinkWellThinkBig is an idea sharing forum which facilitate sharing of ideas among trusted groups.
A user can create a group and invite his friends via emails, to join the group.

His friend receives a one time password, using which, he can register himself and gets automatically added to the 
selected group. Once onboarded, he can create new groups, refer friends and grow his network.

Creating the first user:

Since the user registration is only email based, the user who hosts this application(Admin) can run the 
following script after the  mongoDB schemas are created.


db.users.insert({"userMailId" : "AdamUser@abc.com", "userName" : "AdamUser", "userPassword" : "$2a$10$38MzXttD8RZl1s6hs.1leuyi58AwENfqPEw9UdjLJaUzB19CCPZXO",
"userFirstName" : "Adam", "userLastName" : "user", "userRoles" : [ ], "userCreatedByGroups" : [ "Default" ], "userInGroups" : [ "Default" ]});


and also

db.groups.insert({"groupName": "Default","groupCreatedBy": "AdamUser@abc.com","groupMembers":[{"userName":"Adam","userMailId":"AdamUser@abc.com"}]});

This will ensure a user named "AdamUser" is created and added to a group called "Default".

Once this is done, login with the following credentials:

username: AdamUser@abc.com
password: abc123

Now click on the "Default" group, send an invite to your own mail ID. 
Next logout and get yourself onboarded by clicking "I have an invite. I want to register link" using the one time 
password you have received.

Once this is done you can log in with your own created credentials and you are free to create groups and invite 
friends. 

You can now delete the "AdamUser" and the "Default" group by executing the following script:

db.users.remove( { "userMailId": "AdamUser@abc.com" });
db.groups.remove( { "groupName": "Default" });

config.json:

This file should contain the following information:
1) username and password of the gmail account configured to send e-mail invites to friends.
2) MongoDB connection string. (Ex: "mongodb://localhost/mydb")
