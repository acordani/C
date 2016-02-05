##drop database

```bash
heroku pg:reset DATABASE_URL --confirm NOMDELABASEDEDONNEES

heroku run rake db:migrate
```

##console

```bash
heroku run console
```

##Modifier d'un plan gratuit à un plan payant sur heroku

Aller sur la console sur le dossier -ex ```cd code/acordani/armefatale```

Mettre en maintenance ```heroku maintenance:on```

Aller sur ```https://elements.heroku.com/addons/heroku-postgresql```

![heroku1](https://cloud.githubusercontent.com/assets/10654877/12644315/54036cae-c5c2-11e5-9497-ad73bf4fc299.jpg)

et Recuperer le code a mettre. Ici Un code pour modifier à 9€.
```heroku addons:create heroku-postgresql:hobby-basic```

Recuperer les noms de database: ```heroku pg:info```

![heroku3](https://cloud.githubusercontent.com/assets/10654877/12644381/d0775df4-c5c2-11e5-9fad-6e44d3c5ec3c.jpg)

Et Recuperer les bases de données ```heroku pg:copy DATABASE_URL HEROKU_POSTGRESQL_NAVY_URL --app armefatale```

- DATABASE_URL ancienne DataBase
- DATABASE_URL HEROKU_POSTGRESQL_NAVY_URL, nouvelle Database
- Et finir avec --app NOMDUSITE (Recuperé sur lr dashbord d'heroku dans les app)

![heroku5](https://cloud.githubusercontent.com/assets/10654877/12644436/2a0a443a-c5c3-11e5-8785-faacd5d167f6.jpg)


##Pbme au moment de pusher une modif sur heroku sur heroku

Si au moment de pusher sur heroku des modifs, il arrive un souci comme ca, avec un rake aborted,

![heroku2](https://cloud.githubusercontent.com/assets/10654877/12841416/f15a05ec-cbeb-11e5-81f5-c619cb9e434a.jpg)

Alors faire :

```RAILS_ENV=production bundle exec rake assets:precompile```

L'erreur va etre mise. Il n'y aura plus qu'à changer ds le code

