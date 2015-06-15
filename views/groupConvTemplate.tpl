 <section>
 <ul id="messages"></ul>

     <%_.each(groupConvs,function(item){ %>

        <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><%-item.user %></h3>
              </div>
              <div class="panel-body">
               <%-item.groupPost %>
              </div>
        </div>
        
        <!--  <div class="well well-lg">
            <div><%-item.user %></div>
            <div><%-item.groupPost %></div>

        </div> -->

     <% }); %>
   <div class="well well-lg">
     <input id= "postMsg" type="text" class="form-control">

    </div>
  <button type="button" id= "postConversation" class="btn btn-default" style="float: right;margin-bottom: 10px;">Post</button>
                  
    
</section>