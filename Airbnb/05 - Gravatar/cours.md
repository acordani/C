Ouvrir app/helpers/application_helpers.rb

Ajouter une nouvelle methode:

def avatar_url(user)
		gravatar_id = Digest::MD5::hexdigest(user.email).downcase 
		"https://www.gravatar.com/avatar/#{gravatar_id}.jpg?d=identical&s=150"
end

Puis ajouter dans shared/_navbar.html.erb à côté du current_user.fullname:

<%= image_tag avatar_url(current_user), class: "img-circle" %> &nbsp;


&nbsp; permet de definir un espace entre l'image et le nom

Puis aller dans stylesheets/layout/_navbar.scss

.avatar-small {
  width:28px;
}

.avatar-medium {
  width:48px;
}

.avatar-large {
  width:68px;
}

.avatar-full {
  width:100%;
}



	
	
