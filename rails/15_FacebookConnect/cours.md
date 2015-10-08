Service d'identification Auth

- On va générer notre nouvelle application avec devise:
``` 
rails new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
  ``` 
  
  Ici, on a installer devise en generant le model User.
  On va maintenant rajouter une couche pour mettre facebook
  
  - On ajoute la gem omniauth facebook dans le gemfile:

```   
gem 'omniauth-facebook'
``` 
- Puis ``` bundle install``` 

### SetUp Facebook

- Maintenant, il faut aller sur facebook et créer une nouvelle application.
``` 
https://developers.facebook.com/
``` 
My Apps -> Add a new app

-> WWW
-> Skip & Create App Id

On crée: ``` test_connect_wagon``` 
Puis on ajoute une categorie

Et on valide

On arrive sur notre dashboard de l'application.

On tt de suite créer notre application pour notre site en developpement localhost/3000 

Cliquons sur test Appsà gauche de l'écran
Puis sur Create a Test App
On lui donne un nom : ``` test_connect_wagon_Localhost``` 

On arrive en suite sur notre nouvelle application de test.

Dans le settings, il y a l'ID et le SECRET. Ce sont des éléments qu'on va mettre dans application.yml qui sera géré avec figaro.
Le DisplayName, c'est ce que verront les gens quand ils se loggeront avec facebook.

Et il faut rajouter une plateforme : website: http://localhost:3000

### Integration dans Rails

On va dans: ``` config/application.yml``` 
et on y place les 2 clés facebook:

``` 
development:
  FB_ID: "3************1"
  FB_SECRET: "4************e"
``` 
- Ensuite, on configure devise pour que devise soit au courant que le signup avec facebook existe.
  
  # config/initializers/devise.rb
  
On insere la ligne ``` config.omniauth...```  dans le Devise.setup existant

``` 
Devise.setup do |config|
  config.omniauth :facebook, ENV["FB_ID"], ENV["FB_SECRET"], scope: 'email', info_fields: 'email, first_name,last_name', image_size: 'large'
end
``` 
Le scope, ce sont les options. On va lui donner les infos qu'on va demander au User quand facebook va revenir avec son token d'identification, il va donner des droits avec ce qu'on a demandé dans le scope.
Dc ici, on demande a facebook les infos de l'email -> scope: 'email'.
Mais, on aurait pu demander, ses amis, ses photos,... => scope: 'email, friends, photos'
Et image_size permet de récuperer l'avatar du User pour l'afficher.

- Maintenant, on va avoir besoin d'une route qui va recevoir le call back de facebook.

# config/routes.rb

``` 
Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
end
``` 

Puis dans le model User, on va lui donner l'option omniauthable, en lui rajoutant facebook comme provider.

``` 
class User < ActiveRecord::Base
  devise :omniauthable, omniauth_providers: [:facebook]
end
``` 

Si il y avait plusieurs providers, il faudrait rajouter: ``` [:facebook, :twitter]```  par exemple.

Dans le model, on va vouloir stocker des infos propres à facebook:
uid, c'est l'identification unique à facebook
provider va stocker la string facebook
token va permettre d'appeler l'API facebook avec le token d'utilisateur. Si on veut recuperer des likes, des photos,...
Et on a first_name, last_name et picture qui n'existaient pas encore ds le modele User.

- Donc on lance la migration:

``` 
rails g migration AddOmniauthToUsers provider uid picture first_name last_name token token_expiry:datetime
``` 

``` 
rake db:migrate
``` 
- Puis on va implementer une methode qui va permettre en fonction de l'information qui revient de facebook, de trouver le user qui correspond:

Et si jamais le User n'existe pas de le créer

On va chercher si un User existe,
Si on a que facebook, on peut retirer provider: auth.provider
Si il n'y est pas le User, on le crée

On va seter le provider, l'uid et l'email.
Ensuite, on va lui mettre un password au pif car devise en a besoin d'un.
Ensuite on stocke first name te last name, on stocke aussi la photo et le token

Dc grace à cette methode, on va pouvoir créer un utilisateur en bdd sans l'aide de formulaire.

# app/models/user.rb

``` 
class User < ActiveRecord::Base
  def self.find_for_facebook_oauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]  # Fake password for validation
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.picture = auth.info.image
      user.token = auth.credentials.token
      user.token_expiry = Time.at(auth.credentials.expires_at)
    end
  end
end
``` 

Ensuite on va créer un nouveau controller: ``` omniauth_callbacks_controller.rb``` 

Ul va recevoir le callback de facebook. Dès qu'on c'est loggué correctement dans facebook, ca revient dans notre application rails et du coup ca va taper cette methode:

Elle va demander au modele User; est ce qu'il y a un User qui existe et s'il n'existe pas, on va le créer te on va sign_in le User et ducoup ca revient à la page ou on était avant.

Pourquoi user.persisted?
Si pour une raison qulconque, le User n'est pas créé (par exemple si il n'y a pas l'email),le User Devise n'est pas valide. Ds ce cas là,on va vers le else qui redirige sur une creation d'un compte classiquement.

# app/controllers/users/omniauth_callbacks_controller.rb

``` 
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    user = User.find_for_facebook_oauth(request.env['omniauth.auth'])

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: 'Facebook') if is_navigational_format?
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      flash[:alert] = "We need your email"
      redirect_to new_user_registration_url
    end
  end
end
``` 

Maintenant si on fait un rails s.
Cela fonctionne.

Si on veut recuperer la photo de profile de facebook: current_user.picture

Si on veut mettre un sign in with facebook par exemple dans la navbar:

``` 
<%= link_to "Sign In with facebook", omniauth_authorize_path('user','facebook') %>
``` 

Routes

Quelques changements:

devise_for :user, path: '',
                  path_name: { sign_in: 'login', sign_out: 'logout', edit: 'profile' },
                  controller: { omniauth_callbacks: 'omniauth_callbacks' }

32:00


##Mailing

###Mailing Transactionnel
Mail envoyé à une personne

On va utiliser un protocole SMTP(Simple Mail Transfert Protocol).

C'est un protocole au même titre que HTML est un protocole

HTTP est une facon de parler entre un client et un serveur. Le client c'est le navigateur web(chrome ou firefox). Et le serveur est un serveur web(application Ruby on rails).
SMTP, c'est le meme principe. Le client est par exemple gmail ou outlook et le serveur mail c'est quelquechose qui recoit les demandes d'email et qui va les traiter.

Pour envoyer des mails avec Rails, ca s'appelle Action Mailer.

On va avoir une premiere chose qui va jouer le role de controller. qui va definir les parametres d'expedition du mail et le contenu de l'email va etre rendu dans une vue.

On va d'abord generer un mailer

rails g mailer Usermailer welcome

Usermailer est le nom
welcome est l'action (1er mail)

On aurait pu mettre plusieurs actions comme welcome goodbye

5:40
###Mailing Marketing
Mail envoyé à plein de personne


###Google MAps

Créer un nouveau projet dans dev.google

Puis aller chercher l'API de geocoding:
Google Maps Geocoding API

Activer l'API

Puis aller dans Credentials ou Idendifiant(fr)
Puis aller dans API Key ou Clé de l'API(fr)
PUis on va dans serveur key ou Clé de Serveur
ENsuite, il nous demande si on veut eventuellement restreindre cette clé à certaines IP sur le reseau internet?
On pourra le faire uniquement si on connait notre IP de notre serveur . Là comme c'est une Ip d'un serveur Heroku et qu'on ne la connait pas, on ne le fait pas .
Si on utilise figaro, pas de souci

On clic sur create.

