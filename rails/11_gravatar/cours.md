Ouvrir app/helpers/application_helper.rb
```ruby
module ApplicationHelper
  def avatar_url(user)
    gravatar_id = Digest::MD5::hexdigest(user.email).downcase
    "https://www.gravatar.com/avatar/#{gravatar_id}.jpg?d=identical&s=150"
  end
end
```

http://asciicasts.com/episodes/244-gravatar

Ouvrir app/views/shared/_navbar.html.erb
```ruby
<%= image_tag avatar_url(cuurent_user), class: "img-circle avatar-small" %>&nbsp;
<%= current_user.fullname %>
```

```&nbsp;``` permet d'avoir un espace entre l'image de l'avatar et le full name.

et finir pr le css


```ruby
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
```



