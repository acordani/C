On a un model restaurant qui possede stars comme nombre d'étoile  en integer.

<% @restaurant.stars.times do %>
  <i class="fa fa-star">
<% end %>
ca va donner le nombre d'étoile en picto

en plus simple, on peut faire 
<p><%= "*" * @restaurant.stars %></p>
