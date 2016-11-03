#Rails CRUD

- Demarrons un projet ```rails new lacuillere -T```
- ```cd lacuillere```
- ```git init``` & ```git add .``` & ```git commit -m "rails new"```
- gemfile "better_errors" et "binding_of_caller"
- ```bundle install```
- ```git add . + git commit -m "add gemfile debug"```
- ```rails g model Restaurant name:string stars:integer```
ca crée un fichier migration(qui crée la table restaurants) et un fichier pour le model restaurant
- Si on veut revenir en arrière car on c'est trompé dans la generation du model, on peut faire:

```rails destroy model Restaurant```

- rake db:migrate (lance la migration) et du coup ca crée la table restaurant dans la base de donnée.

A chaque fois qu'on crée un model, il faut jouer(crash-tester) avec dans la console.

```
  rails c ou rails c --sandbox (bac à sable):
  Restaurant.all =>[] la reponse est vide car il n'y en n'a pas.
  Restaurant.create(name:"Dindon en Laisse", stars:3)
  Restaurant.count => 1
  Restaurant.first => Retourne l'objet restaurant avec l'id 1
  ```
  ```git add .``` & ```git commit -m "adding restaurant Model"```
  
  Ajout d'une migration pour ajouter Address dans la table restaurants
  
  ```
  rails g migration AddAddressToRestaurants address:string
  rake db:migrate
  rails c
  dindon = Restaurant.first
  dindon.address = "13, Rue de Boutreillis"
  dindon.save
   ```
  On regarde si dindon.address fonctionne
   ```git add .``` & ```git commit -m "adding address to restaurant"```
  
  Ensuite, il faut faire les validations du model restaurant
  
  Validates :name, presence: true
  
  Ensuite rails c
  ```
  bad = Restaurant.new(stars:3) On essaie de valider un nouveau resto sans le nom
  bad.valid? Permet de voir si le nouveau resto est valide. La reponse est false
  bad.name = "Un nom" On ajoute un nom à bad
  bad.valid? On lui redemande si il est valide. La reponse est true
  Maintenat si on fait un bad.save, il s'enregiste.
  ```
   ```git add .``` & ```git commit -m "adding validations to restaurant"```
  
##Définir les 7 Points d'entrées CRUD(Restful)

Rails permet d'avoir un raccourci qui permet de sortir le meme routing conventionnel de Rails:
    ```resources :restaurants ```

Si notre site était en read only, cad que l'utilisateur ne peut que lire les infos du site. Le contenu est ajouté par le dev du site.
on aurait:  ```resources :restaurants, only: [:index, :show] ```
On garde juste que les routes qui correspondent à index et à show.

##Le controller
```Rails g controller restaurants```
On va faire tt le routing Crud
```ruby
def index
  @restaurants = Restaurant.all
end

def show
end

def new
end

def create
end

def edit
end

def update
end

def destroy
end
```

Pour l'index, il manque la vue: index.html.erb
```ruby
<h1>Les restaurants</h1>
<@restaurants.each do |restaurant|%>
<h2><%= restaurant.name %></h2>
<p><%= restaurant.address %></p>
<p><%= "*" * restaurant.stars %></p>
<% end %>
```

Dans le controller, index doit trouver tous les restaurants:
```@restaurants = Restaurant.all```

Pour le moment, il n'y a pas de restaurants. Donc on va en créer dans la seed
```
Restaurant.create(name:"Ganieure", stars:2, address:"Champs Elysées")
Restaurant.create(name:"la serre", stars:2, address:"Quai de la Rapée")
Restaurant.create(name:"le Dindon", stars:3, address:"Rue de louse")
```
```rake db:seed```, pour executer la seed. Elle execute ce fichier ruby.

![1jpg](https://cloud.githubusercontent.com/assets/10654877/19979647/7e1f9a9c-a1fb-11e6-9e0d-8f7e7a884323.jpg)

On a donc les restaurants qui s'affichent. On a rempli notre base de données.

Le show
Il faut l'id pour récuperer le resto.
Si on fait ```rake routes```, on a : ```restaurants/:id```
l'id est donc dans l'Url.

Car si on fait : ```/restaurants/5```,
On va avoir :
![2jpg](https://cloud.githubusercontent.com/assets/10654877/19979943/82bab784-a1fc-11e6-92c3-0b9a5f6f5836.jpg)


pour le recuperer, on va utiliser la methode .find
```@restaurant = Restaurant.find(params[:id])```

Du coup, une fois qu'on a récupéré le restaurant, on peut le donner à la vue:

Il faut créer le template: show.html.erb
```ruby
<h1><%= @restaurant.name %>
<p><%= @restaurant.address %>
<p><%= "*" * @restaurant.stars %>
```

Mettons le lien pour revenir au listing.

On va utiliser les prefix .
![3jpg](https://cloud.githubusercontent.com/assets/10654877/19980343/e8651d1c-a1fd-11e6-8519-f1022cec61f5.jpg)

```<%= link_to "Back to list", restaurants_path %>```

Si on veut un lien qui nous envoie ds la show view de chaque restaurant.

Si on fait un rake routes, on a restaurant_path mais dans l'url il y a un id. on a donc besoin de cet id.

```<%= link_to "Allez voir", restaurant_path(id: restaurant.id %>``` ou

```<%= link_to "Allez voir", restaurant_path(restaurant) %>``` Ici, On passe l'objet(restaurant) et rails sait qu'il doit trouver l'id tt seul.

###le new
On y accede par la requete restaurants/new
on crée le template new.html.erb
et on va faire l'edit en meme temps edit.html.erb

Commençons par le formulaire :


on poste sur ```/restaurants```. 

Sur rake routes a create, on a l'url /restaurants
On va faire le formulaire en dur ensuite, on va utliser un helper
<form action="/restaurants" method="post">
  <input type="text" name="restaurant[name]">
  <input type="number" name="restaurant[stars]">
  <input type="text" name="restaurant[address]">
  <input type="submit" value="create resto]">
  
  on va donc utiliser un helper
  ```ruby
  <%= form_for @restaurant do |f| %>
    <%= f.label :name, "enter a name" %>
    <%= f.text_field :name, placeholder: "votre nom" %>
    
    <%= f.label :stars %>
    <%= f.number_field :stars%>
    
    <%= f.label :address %>
    <%= f.text_field :address %>
    
    <%= f.submit %>
  <% end %>
  ```
  
  On peut ajouter dans form_for, un select.
  
  Par exemple si dans le model restaurant, on avait defini des categories de restaurant:
  
  CATEGORIES = [fast-food, restaurant] ou CATEGORIES = %w(fast-food, restaurant)
  validates :category, inclusion: {in:CATEGORIES}
  
  
  A ce moment là, dans le form_for, on peut rajouter:
  
   ```<%= f.select :category ,Animal::CATEGORIES, prompt: "Quelle catégorie" %> ```
  
  CATEGORIES EST UNE CONSTANTE QUI EST DANS LA CLASSE
  

  
Link_to genere une balise a href, form_for genere une balise form.

form_for a des sous methodes qui vont permettre de generer tous les input(text_field, number_field, submit).

si on veut rajouter un label pour chaque input, il faut rajouter f.label.

  
Ce helper fonctionne de la manièe suivante:

Pour se construire, il a besoin qu'on lui donne un objet restaurant car apres, il va generer des parametres imbriqués:

```(restaurant[:name], restaurant[:stars], restaurant[:address])```.
  
Ce qui est bien  c'est qu'on met le meme formulaire form_for sur le new et sur l'edit. Et selon que l'objet est prérempli ou pas, il va remplir ou non le formulaire.
  
Donc ds le controller à new, on doit construire cet objet en coquille vide.

  ```@restaurant = Restaurant.new```
  
et pour l'edit, on va mettre:

  ```@restaurant= Restaurant.find(params[:id])```. Car il a besoin de l'id dans l'Url.
  
  
Si on fait rails s et qu'on va sur le formulaire new, on peut en créer un.
Au moment d'envoyer, il nous dit qu'il manque ```create.html.erb```
  
Allons voir ce quil y a ds les parametres en faisant un raise au niveau du controlleur create.
On se rend compte qu'il y a un parametre qui s'appellle restaurant et qui a comme valeur tout ce qu'on a mis dans le formulaire quand on l'a envoyé.
Si on veut avoir le detail on peut faire: ```params[:restaurant]```
Du coup si on veut faire un create, on peut faire: ```Restaurant.create(params[:restaurant])```
  
et bien, on va faire la meme chose dans le controller a create.
  ```Restaurant.create(params[:restaurant]) ```
  
Dans le update, on fait la meme chose mais avant, il faut le recuperer avec le params[:id]
  ```
  @restaurant = Restaurant.find(params[:id])
  @restaurant.update(params[:restaurant])
  ```
Pour donner plus de securité, il faut en plus passer par des strongs params.
```
private
def restaurant_params
  params.require(:restaurant).permit(:name, :address, :stars)
end
```

et du coup on utilise les strongs params a la place de params[:restaurant]





