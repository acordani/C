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

Maintenant, il faut aller sur facebook et créer une nouvelle application.

https://developers.facebook.com/

My Apps -> Add a new app

-> WWW
-> Skip & Create App Id

On crée: test_connect_wagon
Puis on ajoute une categorie

Et on valide


