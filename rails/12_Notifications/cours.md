- Ouvrir le gemfile : gem 'toastr-rails'

- Ouvrir app/assets/javascript/application.js
- Ajouter : //= require toastr

- Ouvrir app/assets/stylesheets/applications.js
- Ajouter : @import "toastr";

### Notification sign_up et sign_in :


- Dans app/Views/shared
- Ajouter une nouvel partial: ```_message.html.erb```

```ruby
<% unless flash.empty? %>
	<script type="text/javascript">
		<% flash.each do |f| %>
			<% type = f[0].to_s.gsub('alert','error').gsub('notice','info') %>
			toastr['<%= type %>']('<%= f[1] %>')
		<% end %>
	</script>
<% end %>
```

On check pour etre certain que le flash n'est pas vide
On itere sur chaque message flash
Et on remplace alert par error et notice par info.

Plus d'infos : https://github.com/tylergannon/toastr-rails
options : http://codeseven.github.io/toastr/demo.html

- Ouvrir app/view/layouts/application.html.erb

- Effacer:

```ruby
<p class="notice"><%= notice %>
<p class="alert"><%= alert %>
```

- Et remplacer par :

```ruby
<%= render 'shared/message' %>
```
### Notification messages d'erreurs :

- Dans app/Views/shared
- Ajouter un nouveau partial: ```_devisemes.html.erb```

```ruby
<% unless resource.errors.empty? %>
	<script type="text/javascript">
		<% resource.errors.full_messages.each do |msg| %>
			toastr.error('<%= msg %>')
		<% end %>
	</script>
<% end %>
```
	
- Dans app/views/devise/sessions/new.html.erb, Sous ```<%= form_for ou simple_form_for ... %>```

- Ajouter ```<%= render 'shared/devisemes' %>```
	
- Dans /registrations/new
	
- Retirer: ```<%= devise_error_messages! %>```
	
- Et remplacer par : ```<%= render 'shared/devisemes' %>```
	
- Idem dans registrations/edit
- Idem dans passwords/new
- Et dans passwords/edit
	
	
	
	
	

