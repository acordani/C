- Ajouter gem 'toastr-rails' au gemfile

- Puis ouvrir App/assets/javascripts/application.js
Et en dessous de //= require jquery_ujs, rajouter:
//= require toastr

- Puis ouvrir App/assets/stylesheets/application.scss et ajouter:
@import "toastr";

- Puis dans app/views/shared, rajouter un nouveau partial:
_message.html.erb

<% unless flash.empty? %>
  <script type="text/javascript">
    <% flash.each do |f| %>
      <% type = f[0].to_s.gsub("alert","error").gsub("notice","info") %>
      toastr['<%= type %>],('<%= f[1] %>')
    <% end %>
  </script>
<% end %>

A la premiere ligne, on a besoin de verifier que le flash n'est pas vide

- Puis aller dans app/views/layout/application.html.erb

Retirer les alerts:
