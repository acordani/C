## Create User Info Page

Ajouter deux champs au User:
rails g migration AddExtraFieldsToUser phone_number:string description:text

rake db:migrate

Ouvrir config/routes.rb

resources :users, only: [:show]

Ca va permettre de créer le path pour le show de User seulement

Créons maintenant le users_controller.

Donc, on va dans Controller et on crée un nouveau fichier: users_controller.rb

Class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
end

Maintenant créons un nouveau repertoire dans Views : users

Et créons le fichier showw.html.erb
<div class="container">
  <div class="row">
    <div class="col-md-3">
      <div class="center">
        <%= image_tag avatar_url(@user), class: "avatar-full" %>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">Verification</div>
        <div class="panel-body">
          Email Address <br>
          Phone number
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <h2><%= @user.fullname %></h2>
      <div class="description row-space-3">
        <%= @user.description %>
      </div>
    </div>
  </div>
  
  Ouvrons maintenant App/assets/stylesheets et allons dans application.scss
  
  body {
    color: #565a5c;
    background-color: F8F8F8;
  }
  
  .container {
    width:80%;
  }
  
  .navbar-default {
    background-color: #FFF;
    
    .navbar-brand {
      color: #FF5A5F;
      font-size: 2em;
      font-weignt: 400:
      }
  }
  
  8:27
