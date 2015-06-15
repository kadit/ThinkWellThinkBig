<section>
    
    <nav class="navbar navbar-default navbar-static-top headerStrip" role="navigation">
        <div style="margin-top: 12px;">
          <span style="color: #777;font-size: 25px;margin-left: 18px;">Manage</span>
          
          <a>
           <img id= "logout" src="public/assets/images/logout.ico" style="float:right;margin-right:35px;margin-top: 15px;">
         </a>
        </div>
     </nav>
   <div id="wrapper" class="navbar-default sidebar" role="navigation">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" class="sidebar-nav navbar-collapse" style="margin-top: 57px;">
            <ul class="sidebar-nav list-group">
                <li class="sidebar-brand" style="color: #337ab7;">
                        <span>Groups</span>
                </li>


                <% _.each(items, function( listItem ){ %>


                <li class="list-group-item">
                   <div class="row">
                        <div class="col-xs-14 grp groupItem" style= "color: darkgrey;cursor: pointer;">
                            <span style= "color: #337ab7;margin-left: 6%;"><%- listItem.groupName %> </span>
                          <img class= "addUsers" src="public/assets/images/add_user.png" style="width:25px;height:18px;float: right;margin-right: 10px;margin-top: 14px;">
                         <img class= "detailsImg" src="public/assets/images/details.png" style="width:47px;height:18px;float: right;margin-right: 10px;margin-top: 14px;">

                        
                        </div>
                        
                    </div>
                </li>

                <% }); %>

               
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper" style= "height:85%;background-color: rgba(209, 226, 247, 0.6);">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                      <div class="col-lg-12" style="height: 100%;overflow-y: auto;">
                      <span>  
                           <img id= "leftPaneExpandCollapseImg" class= "detailsExpanded" src="public/assets/images/leftArrow.png">
                          
                          
                       </span> 
                       <div id="pageContent">
                                   <h3></h3>  
                       </div>
                    </div>
                  </div>
                </div>
            </div>
           
        </div>

        <div id="footer-content-wrapper">
         <footer class="footer">
                  
                  <button type="button" id= "createGroup" class="btn btn-primary" style="float: right;margin-left: 20px;margin-right: 10px;">Create Group</button>
                  <button type="button" style="float: right;" class="btn btn-primary" data-toggle="modal" data-target="#inviteFriend" data-whatever="@mdo">Invite a friend</button>
                  
            </footer>
        </div>
        <!-- /#page-content-wrapper -->
       

    </div>
    <!-- /#wrapper -->
<div class="modal fade" id="inviteFriend" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">New message</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-email" class="control-label">Recipient Email:</label>
            <input type="text" class="form-control" id="recipient-email">
          </div>
          <div class="form-group">
            <label for="message-text" class="control-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div id="sendMailInfo" style="float:left;margin-left: 20px;"></div>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" id= "sendEmail" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="displayUsers" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel1">Add users</h4>
      </div>

      <div class="modal-body">
        <form>
          <div class="form-group" id="userDetailsChk">
            <%_.each(users,function(user){ %>
             <ul>
                <li class="row-fluid"> 
                  <label class="checkbox inline">
                       
                        <input name= "userData" type="checkbox" value="<%- user.userName+'/'+user.userMailId %>"><%- user.userName +"   (Email :  "+ user.userMailId +" )"%>
        
                    </label>

                </li>
            </ul>
           <% }); %>
          </div>
        </form>
      </div>
     
      <div class="modal-footer">
        <div id="addUsersInfo" style="float:left;margin-left: 20px;"></div>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" id= "addUserToGrp" class="btn btn-primary">Add user to selected group</button>
      </div>
    </div>
  </div>
    
</div>



   
</section>