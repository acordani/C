Lorsqu'on veut faire un lien sur une image,
on passe le premier argument du link_to c'est le path et ensuite on passe l'image dans le do end.

<%= link_to restaurant_path do %>
  <%= image_tag "logo.png", width: "50px" %>
<% end %>

Lorsqu'on veut un lien sur une image. Ici pin est le model et image est l'image.

<%= link_to (image_tag pin.image.url(:medium)), pin %>
