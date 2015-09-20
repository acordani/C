Partial avec parametre

Sur une page html, on n'a pas forcement envie de pourrir son code avec des lignes de codes.
Le plus simple est de mettre des partials.

Par exemple, une card avec des infos qui se repetent.
Pour chaque card, il y a  une image, le nom, le prix,...

On va mettre faire un <%= render "card" %>

et dans la partiel _card.html.erb, on va indiquer les infos.

ca donne:

restaurant.html.erb

< div class="row" >
  <% @restaurant.each do |r| %>
    <% div class="col-xs-12 col-sm-4">
      <%= render "card", restaurant: r %>
    </div>
  <% end %>
</div>

_card.html.erb

<%= restaurant.name %>
<%= restaurant.address %>
...


