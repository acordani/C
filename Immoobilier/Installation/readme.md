- On utilise le rails new devise.

## Devise



```bash
rails _5.0.2_ new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  immoobilier
```


Cela  crée le dossier sur github en meme temps.
Donc pas besoin de:
```bash
git init
git add .
git commit -m"Rails new"
```

- Ensuite, on va sur github, on crée un nouveau repo: immoobilier, puis:

```bash
git remote add origin git@github.com:acordani/immoobilier.git
git push -u origin master
```

- Ensuite, on crée le repo sur Heroku:
```bash
heroku create immoobilier --region=eu
```

Cela donne:
```
Creating ⬢ immoobilier... done, region is eu
https://immoobilier.herokuapp.com/ | https://git.heroku.com/immoobilier.git
```
Un espace a bien été réservé sur heroku avec comme adresse web: ```https://immoobilier.herokuapp.com/```

Afin de voir si les differents repos ont été créés, il faut faire:

```git remote -v```

Cela donne :
```
heroku	https://git.heroku.com/immoobilier.git (fetch)
heroku	https://git.heroku.com/immoobilier.git (push)
origin	git@github.com:acordani/immoobilier.git (fetch)
origin	git@github.com:acordani/immoobilier.git (push)
```

Enfin, pour pousser le code sur heroku:
```
git push heroku master
```

Et ```heroku open``` pour voir le site
