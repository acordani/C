1- Ajouter dans le gemfile
gem 'bootstrap-sass', '~> 3.3.5'

2- Import Bootstrap styles in app/assets/stylesheets/application.scss:


@import "bootstrap-sprockets";
@import "bootstrap";

3- Require Bootstrap Javascripts in app/assets/javascripts/application.js:

//= require bootstrap-sprockets

A mettre juste au dessus de require_tree
------------------------------------------------------------------------------------------------------------
Les helpers, image_tag, link_to, ils ont tous un argument optionnel qui est un hash d'attribut html.
par exemple:
<%= link_to "Ajouter une annonce", new_announce_path, {class: "btn btn-danger", id: "hgkkk" } 

et quand une methode ruby a pour dernier argument un hash, les accolades sont optionnelles.
Donc souvent il n'y aura pas d'accolade. Ca s'appelle du sucre syntaxique
donc on pourra l'écrire:
<%= link_to "Ajouter une annonce", new_announce_path, class: "btn btn-danger", id: "hgkkk" 

Pour bootsrapiser un form_for,
on va utiliser des form_group

<div class="form-group">
  <%= f.label :name %>
  <%= f.text_field :name, class:"form-control" %>
</div>
...
Et comme link_to, ou peut utiliser le dernier argument optionnel pour mettre des attributs html pour les text_field.
On va utiliser class:"form-control" C'est la classe qui permet de designer les inputs ds bootstrap.

Pour submit si on souhaite lui mettre une classe, il ne faut pas mettre de virgule.
<%= f.submit class: "btn btn-success" %>

Le plus simple est d'utiliser simple_form en gem.
