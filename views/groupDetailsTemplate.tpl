<section id="groupConv">
   <div class="container">
  <div class="panel panel-default">    
    <div class="panel-heading"> <h3>Group Details</h3></div>
  <table class="table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    	 <% _.each(groupDetails, function( listItem ){ %>
      <tr>
        <td><%-listItem.userName %></td>
        <td><%-listItem.userMailId %></td>
      </tr>

        <% }); %>
    </tbody>
  </table>
  </div>    
</div>
</section>