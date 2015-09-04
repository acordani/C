<%= f.input :ingredient_id, collection: Ingredient.all, prompt: "Quel ingredient ?" %>
<%= f.button :submit, class: "btn btn-primary" %>

Message d'erreurs

<% if @dose.errors.any? %>
  <% @dose.errors.full_messages.each do |message| %>>
    <li><%= message %>
  <% end %>
<% end %>

