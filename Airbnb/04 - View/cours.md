- Rajouter dans ```app/views/devise/registrations/edit.html.erb``` et dans ```app/views/devise/registrations/new.html.erb```
```
<%= f.input :fullname, required: true, autofocus: true, placeholder: "John Lerouge" %>
```
Puis modifier dans ```shared/navbar```:

```current_user.email``` par ```current_user.fullname```

```         
  git add .
  git commit -m "View for fullname'
  git push origin master
  
  git push heroku master
``` 
