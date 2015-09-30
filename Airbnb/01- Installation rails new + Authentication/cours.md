- On utilise le rails new minimal.

## Minimal



```bash
rails new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
```


Cela  crée le dossier sur github en meme temps.
Donc pas besoin de:
```bash
git init
git add .
git commit -m"Rails new"
```

- Ensuite, on va sur github, on crée un nouveau repo: airbnb, puis:

```bash
git remote add origin git@github.com:acordani/airbnb.git
git push -u origin master
```

- Ensuite, on crée le repo sur Heroku:
```bash
heroku create airbnb-alex --region=eu
```

Cela donne:
```
Creating airbnb-alex... done, region is eu
https://airbnb-alex.herokuapp.com/ 
Git remote heroku added
updating Heroku CLI...done. Updated to 3.42.3
```
Un espace a bien été réservé sur heroku avec comme adresse web: ```https://airbnb-alex.herokuapp.com/```

Afin de voir si les differents repos ont été créés, il faut faire:

```git remote -v```

Cela donne :
```
heroku	https://git.heroku.com/airbnb-alex.git (fetch)
heroku	https://git.heroku.com/airbnb-alex.git (push)
origin	git@github.com:acordani/airbnb.git (fetch)
origin	git@github.com:acordani/airbnb.git (push)
```

Enfin, pour pousser le code sur heroku:
```
git push heroku master
```

Et ```heroku open``` pour voir le site

--------------------------------------------------------------------------------------------------------------
## Authntication

- Mettre ```gem 'devise'``` dans le gemfile

- Puis ```bundle install```

- Puis ```rails g devise:install```

- Puis ```rails g devise User```

- Puis ```rake db:migrate```

- Puis ```rails g devise:views```

- Puis dans ```config/environments/development.rb```
Mettre: ```config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }```

- Puis, bien verifier que dans ```config/routes.rb```
Il y a bien : root to: ```"home#index"``` L'action et le Controller associé peuvent etre differents.

- Puis dans ```app/views/layouts/application.html.erb```,
Rajouter :  
```
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```

```rails s``` Pour tester ```localhost:3000/users/sign_up```

- Dans ```views/devise/password registrations et sessions```
Entourer le code par les balises class de bootstrap
```
<div clas="container">
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
     ...
    </div>
  </div>
</div>
```
  
```         
  git add .
  git commit -m "Building Navbar with Partial View'
  git push origin master
  
  git push heroku master
  heroku run rake db:migrate
``` 





