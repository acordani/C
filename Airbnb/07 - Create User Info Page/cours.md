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
  
  .btn-primary.btn {
  border: 1px solid #ff5a5f;
  border-radius: 2px;
  font-weight: bold;
  background-color: #ff5a5f;
  color: #fff;
  padding: 10px 25px 10px 25px;
}

.btn-primary.btn:hover, .btn-primary.btn:focus {
  border-color: #ff7e82;
  border-bottom-color: #fa0008;
  background-color: #ff7e82;  
  outline:none;
}

.btn-primary.btn:active {
  border-color: #e00007;
  background-color: #e00007;  
  outline:none;
}

.btn-default.btn {
  width: 100%;
  border-radius: 2px;
  padding: 10px 0;
  margin-top: 10px; 
}

.panel-default .panel-heading {
  color: #565a5c;
  background-color: #edefed;
  font-size: 18px;
  font-weight: 400
}

.row-space-1 {
  margin-top: 6px;
  margin-bottom: 6px;
}

.row-space-2 {
  margin-top: 12px;
  margin-bottom: 12px;
}

.row-space-3 {
  margin-top: 24px;
  margin-bottom: 24px;
}

.description {
  color: #575757;
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
}

