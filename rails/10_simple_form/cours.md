Nous avons un routing qui dit:

/restaurants      restaurants#create
Donc pour le formulaire de creation ds new.html.erb, on a décidé que nous faisions un post sur restaurant

Voyons le html que ca va generer:
```
<form action="/restaurants" method= "post">
  <input type="text" name="restaurant[name]">
  <input type="number" name="restaurant[stars]">
  <input type="text" name="restaurant[address]">

  <input type="submit" value="Create resto">
</form>
```
Mais ds Rails, on ne peut pas ecrire de formulaire comme ca, car sinon, ca pete (probleme de clé de protection )

Et du coup, on va utiliser un helper:

# Form_for

Voilà ce que cela donne:

C'est un helper, comme ```link_to``` qui genere une balise ```a```; ```image_tag``` qui genere une balise ```img``` et ```form_for``` va generer une balise ```form```

```
<% form_for @restaurant do |f| %>
  <%= f.text_field :name %>
  <%= f.number_field :stars %>
  <%= f.text_field :address %>
  <%= f.submit %>
```

  Si on veut ajouter des labels, on ajoute ```f.label :name, "enter a name"``` par exemple
  
  ![1](https://cloud.githubusercontent.com/assets/10654877/11336124/f3a5dd14-91e2-11e5-91d1-3f17a7c62077.jpg)

Ce helper, pour se construire, il a besoin qu'on lui donne un objet ```@restaurant```, car apres, il va generer des parametres imbriqués comme restaurant[name]

Du coup, ds le controler ds l'action new, on va devoir lui donner la coquille vide au form_for:

def new
  @restaurant = Restaurant.new
end


on a restaurant[name], car on va recuperer tous les parametres dans un seul parametre imbriqué.
On aura un params restaurant et a l'interieur, on aura tout le hash d'information:  name:, address:, ....

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

