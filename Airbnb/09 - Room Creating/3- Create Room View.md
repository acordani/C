- Créer un partial pour le formulaire : Dans app/views/room/ .. _form.html.erb
```
<div class="panel panel-default">
  <div class="panel-heading">
    Create your beautiful place
  </div>
  <div class="panel-body">
    <div class="container">
      <%= form_for(@room) do |f| %>
        <div class="row">
          <div class="col-md-4 select">
            <div class="form-group">
              <label>Home Type</label>
              <%= f.select :home_type, [["Apartment","Apartment"], ["House","House"], ["Bed & Breakfast","Bed & Breakfast"]], id: "home_type", prompt: "Select...", class: "form-control" %>
            </div>
          </div>

          <div class="col-md-4 select">
            <div class="form-group">
              <label>Room Type</label>
              <%= f.select :room_type, [["Entire","Entire"], ["Private","Private"], ["Shared","Shared"]], prompt: "Select...", class: "form-control" %>
            </div>
          </div>

          <div class="col-md-4 select">
            <div class="form-group">
              <label>Accomodate</label>
              <%= f.select :room_type, [["1",1], ["2",2], ["3",3], ["4",4], ["5",5], ["6+",6]], prompt: "Select...", class: "form-control" %>
            </div>
          </div>
        </div>
      <% end %>
  </div>
</div>
```

Puis dans ```new.html.erb``` et dans ```edit.html.erb```:
```<%= render 'form' %>```
