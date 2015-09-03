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

Au lieu de text_field, date_field,..., on utilise input.
Du coup, on n'a plus besoin des div form-group, des labels
si vous ne voulez pas de label, il faut mettre label: false dans l'input
si on veut modifier le label, label: "khklhkhkl"
la class form-control est aussi déjà dans simple_form, dc on la retire

Pour modifier un input car simple_form detecte automatiquement quelle genre d'input c'est(string, integer,...)
Si on veut modifier, on rajoute as: :date par exemple, si on veut un input format date
Pour modifier un input en type string, il faut mettre as :string

Pour l'input category, il faut le modifier pas par as, mais directement:
<% f.input :category, collection: Animal::CATEGORIES, prompt: "Choisissez" %>

Tout est configurable ds le fichier config initializer simple_form

Pour ajouter une class html, on peut l'ajouter soit sur le label, soit sur l'input.

On fait donc: label_html: {class: "badge badge-primary"}, input_html: {class: "input-lg"}

##datepicker
lien(https://github.com/Nerian/bootstrap-datepicker-rails)

