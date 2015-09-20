```ruby
<%= f.input :ingredient_id, collection: Ingredient.all, prompt: "Quel ingredient ?" %>
<%= f.button :submit, class: "btn btn-primary" %>
```

Message d'erreurs

```ruby
<% if @dose.errors.any? %>
  <% @dose.errors.full_messages.each do |message| %>>
    <li><%= message %>
  <% end %>
<% end %>
```


Pour le front 

```ruby
<div class="panel panel-default">
  <h3>Create your beautiful place</h3>
</div>
<div class="panel-body">
  <div class="container">
    <%= simple_form_for ... %>
  </div>
</div>
```

