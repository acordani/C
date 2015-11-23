Les routes sont la traduction des User stories:
ex: En tant qu'utilisateur, je peux voir tous les restaurants

Par convention , on mettre les collections avant les members

###Collection

Pour avoir une Url de type ```get /restaurants/top```:
Elle doit renvoyer que les restaurants qui sont classés 3 étoiles
```
resources :restaurants do
  collection do
    get "top" => "restaurants#top"
  end
end
```

collection car c'est une collection de restaurants

Dans le controller Restaurants, on va definir une nouvelle action top

```
def top
  @top_restaurants = Restaurant.where(stars: 3)
end
```

du coup dans ```Views<Restaurant``` on ajoute un fichier ```top.html.erb```

```
<h1> 3 stars restaurants</h1>
<ul>
  <% @top_restaurants.each do |top| %>
    <li>
      <%= top.name %>
    </li>
  <% end %>
</ul>
```

###Member
Maintenant, je veux une route qui m'affiche le detail sur le chef d'un restaurant. 
Ca sera une route de type get ```/restaurants/42/chef```
42 étant l'id d'un restaurant

```
resources :restaurants do
  member do
    get "chef" => "restaurants#chef"
  end
end
```

Si on fait rake routes:
on a la routes 
```chef_restaurant restaurants/:id/chef```

Du coup on va dans le controller, et on crée l'action chef

```
def chef
 @restaurant= Restaurant.find(params[:id])
end
```

ensuite on crée la vue ```chef.html.erb```

```
<%= @restaurant.chef %>
```

###Routes nestées

resources :restaurants do
  resources :reviews, only: [:new, :create]
end

La resource imbriquée est celle qui appartient à l'autre.

