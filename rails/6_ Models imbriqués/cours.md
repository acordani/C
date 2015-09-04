###Routes nestées

resources :restaurants do
  resources :reviews, only: [:new, :create]
end

La resource imbriquée est celle qui appartient à l'autre.

Du coup si on fait un rake routes, on va avoir:

/restaurants/:restaurant_id/reviews
/restaurants/:restaurant_id/reviews/new

2 nouvelles routes avec comme clé étrangère restaurant_id, c'est le parametre qui permettra de recuperer l'id du restaurant.

###Controlleur Reviews

1- Avant tout on va faire un before_action :set_restaurant
qui permettra de recuperer le restaurant_id dans les params et aller chercher le restaurant correspondant.
Car la reviews va etre associé à un restaurant.

2- Du coup on fait une partie private qui va inclure la methode set_restaurant

private

def set_restaurant
  @restaurant = Restaurant.find(params[:restaurant_id])
end

3- on écrit les methodes new et create

def new
end

def create
new

4- on va créer le fichier dans la vue reviews, new.html.erb
  <h1> Ajouter un resto pour <%= @restaurant.name %> </h1>
  
  <%= form_for [@restaurant, @review] do |f| %>
    <%= f.textfield :content %>
    <%= f.submit %>
  <% end %>
  on met [@restaurant, @review], comme ca rails sait qu'il doit faire son post sur restaurant_reviews_path
  
5- remplir le new du controller reviews

def new
  @review = Review.new ou @review = @restaurant.reviews.build
end
l'avantage de la 2 eme solution est qu'il y aura la clé étrangere(restaurant_id) qui sera indiquée dedans
  
build cest comme un new mais on build le restaurant sur la review comme ca le restaurant_id est prérempli.
  
Il va mettre en mémoire et enregistrera lors du create par le save.

6- Create du controller Reviews.

On va d'abord definir des strongs parametters:
def review_params
  params.require(:review).permit(:content)
end

def create
  @review = Review.new(review_params)
  @review.restaurant = @restaurant
  @review.save
  redirect_to restaurant_path(@restaurant)
  
  @restaurant est le restaurant defini dans le before action.
  
  Du coup, ca fait:
  - on va chercher le restaurant par son id
  - on instancie une nouvelle review avec les paramettres permis (strong parameters)
  - on passe a cette review l'id du restaurant qu'on avait été cherché en 1
  - et on sauve.

Ensuite, on veut injecter toutes les reviews.

<ul>
  <%= @restaurants.reviews.each do |review| %>
    <li><%= review.content %></li>
  <% end %>
</ul>



  
  
  
  





