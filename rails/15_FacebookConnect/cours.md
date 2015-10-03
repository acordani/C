Service d'identification Auth

On va générer notre nouvelle application avec devise:

rails new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
  
  Ici, on a installer devise en generant le model User.
  On va maintenant rajouter une couche pour mettre facebook
  
  On ajoute la gem omniauth facebook dans le gemfile:
  
gem 'omniauth-facebook'

Puis bundle install

### SetUp Facebook

Maintenant, il faut aller sur facebook et créer une nouvelle application.

https://developers.facebook.com/

My Apps -> Add a new app

-> WWW
-> Skip & Create App Id

On crée: test_connect_wagon
Puis on ajoute une categorie

Et on valide

On arrive sur notre dashboard de l'application.

On tt de suite créer notre application pour notre site en developpement localhost/3000 

Cliquons sur test Appsà gauche de l'écran
Puis sur Create a Test App
On lui donne un nom : test_connect_wagon_Localhost

On arrive en suite sur notre nouvelle application de test.

Dans le settings, il y a l'ID et le SECRET. Ce sont des éléments qu'on va mettre dans application.yml qui sera géré avec figaro.
Le DisplayName, c'est ce que verront les gens quand ils se loggeront avec facebook.

Et il faut rajouter une plateforme : website: http://localhost:3000

### Integration dans Rails

On va dans: config/application.yml
et on y place les 2 clés facebook:

development:
  FB_ID: "3************1"
  FB_SECRET: "4************e"
  
  Ensuite, on configure devise pour que devise soit au courant que le signup avec facebook existe.
  
  # config/initializers/devise.rb
  
On insere la ligne config.omniauth... dans le Devise.setup existant

Devise.setup do |config|
  config.omniauth :facebook, ENV["FB_ID"], ENV["FB_SECRET"], scope: 'email', info_fields: 'email, first_name,last_name', image_size: 'large'
end

Le scope, ce sont les options. On va lui donner les infos qu'on va demander au User quand facebook va revenir avec son token d'identification, il va donner des droits avec ce qu'on a demandé dans le scope.
Dc ici, on demande a facebook les infos de l'email -> scope: 'email'.
Mais, on aurait pu demander, ses amis, ses photos,... => scope: 'email, friends, photos'
Et image_size permet de récuperer l'avatar du User pour l'afficher.

Maintenant, on va avoir besoin d'une route qui va recevoir le call back de facebook.

# config/routes.rb

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
end

Puis dans le model User, on va lui donner l'option omniauthable, en lui rajoutant facebook comme provider.

class User < ActiveRecord::Base
  devise :omniauthable, omniauth_providers: [:facebook]
end

Si il y avait plusieurs providers, il faudrait rajouter: [:facebook, :twitter] par exemple.

Dans le model, on va vouloir stocker des infos propres à facebook:
uid, c'est l'identification unique à facebook
provider va stocker la string facebook
token va permettre d'appeler l'API facebook avec le token d'utilisateur. Si on veut recuperer des likes, des photos,...
Et on a first_name, last_name et picture qui n'existaient pas encore ds le modele User.

Donc on lance la migration:

rails g migration AddOmniauthToUsers provider uid picture first_name last_name token token_expiry:datetime

rake db:migrate

Puis on va implementer une methode qui va permettre en fonction de l'information qui revient de facebook, de trouver le user qui correspond:

Et si jamais le User n'existe pas de le créer

On va chercher si un User existe,
Si on a que facebook, on peut retirer provider: auth.provider
Si il n'y est pas le User, on le crée

On va seter le provider, l'uid et l'email.
Ensuite, on va lui mettre un password au pif car devise en a besoin d'un.
Ensuite on stocke first name te last name, on stocke aussi la photo et le token

18:00


  



