- Ajouter ```gem 'toastr-rails'```   au gemfile

- bundle install

- Puis ouvrir ```App/assets/javascripts/application.js```
Et en dessous de ```//= require jquery_ujs```, rajouter:
```//= require toastr```

- Puis ouvrir ```App/assets/stylesheets/application.scss``` et ajouter:
```@import "toastr";```

- Puis dans ```app/views/shared```, rajouter un nouveau partial:

```
_message.html.erb
```

```
<% unless flash.empty? %>
  <script type="text/javascript">
    <% flash.each do |f| %>
      <% type = f[0].to_s.gsub("alert","error").gsub("notice","info") %>
      toastr['<%= type %>],('<%= f[1] %>')
    <% end %>
  </script>
<% end %>
```

A la premiere ligne, on a besoin de verifier que le flash n'est pas vide

- Puis aller dans ```app/views/layout/application.html.erb```

- Retirer les alerts:
```
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```

- Et les remplacer par: ```<%= render 'shared/message' %>```

- Tester : ```rails s```

Ca fonctionne pour les alerts mais pas pour les erreurs sur les formulaires:

- Aller dans ```app/views/shared```, rajouter un nouveau partial:
```
_devisemes.html.erb
```

```
<% unless resource.errors.empty? %>
	<script type="text/javascript">
		<% resource.errors.full_messages.each do |msg| %>
			toastr.error('<%= msg %>')
		<% end %>
	</script>
<% end %>
```

- Puis aller dans ```views/devise.session/new.html.erb```

Sous ```simple_form_for```, rajouter:
```<%= render 'shared/devisemes' %>```

La meme chose dans ```registration/new.html.erb``` et ```edit.html.erb```


```         
  git add .
  git commit -m "Add Gravatar'
  git push origin master
  
  git push heroku master
``` 

### With Bootstrap

- Aller dans ```app/views/layout```
- Retirer les alerts:
```
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```
- Remplacez par:
```
<% flash.each do |name, msg| %>
        <% if msg.is_a?(String) %>
          <div class="alert alert-<%= name == "notice" ? "success" : "danger" %> alert-dismissable">
            <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <%= content_tag :div, msg, :id => "flash_#{name}" %>
          </div>
        <% end %>
      <% end %> 
```

- Pour les erreurs de formulaire, aller dans ``` app/helpers```
- créer un fichier ```devise_helper.rb```
```
module DeviseHelper
  def devise_error_messages!
    return '' if resource.errors.empty?
        
    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t('errors.messages.not_saved', count: resource.errors.count,
      resource: resource.class.model_name.human.downcase)

    html = <<-HTML
    <div class="alert alert-danger alert-dismissable">
      <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
      <h4>#{sentence}</h4>
      #{messages}
    </div>
    HTML

    html.html_safe
  end
end
```
