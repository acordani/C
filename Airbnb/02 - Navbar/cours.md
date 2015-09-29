- Aller sur ce lien : http://getbootstrap.com/components/#navbar

- Copier le code html de la navbar.

- Puis se rendre dans son code. Dans le dossier views, créer un nouveau dossier shared.

- Puis créer un fichier _nav.html.erb

- Copier le code de la navbar précédemment copié sur le site bootstrap
```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
```

- Remplacer le mot Brand dans : ```<a class="navbar-brand" href="#">Brand</a>```
par le nom du site donc ici Airbnb

- Remplacer Dropdown dans ```<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>```
par: ```<%= current_user.email %>```

- Et ensuite, afin de savoir si une personne est connectée, devise nous donne un mot clé: ```user_signed_in?```

- Donc, on met: 
```
  <ul class="dropdown-menu">
    <% if user_signed_in? %>
      <li><a href="#">Your Trips</a></li>
      <li><a href="#">Wish Lists</a></li>
      <li><%= link_to "Edit Profile", </a></li>
      <li role="separator" class="divider"></li>
      <li><a href="#">Separated link</a></li>
    <% else %>
      <%= link_to "Log In", new_user_session_path %>
      <%= link_to "Sign Up", new_user_registration_patg %>
    <% end %>
    
   ``` 
          

