### Modifier localement l version de Ruby qui est ds le gemfile

Suite à ce messag d'erreur:

```Your Ruby version is 2.3.0, but your Gemfile specified 2.2.3```

Faire:

```rbenv local 2.2.3```

### Effacer la dernière migration (si erreur)

```rake db:rollback```

![rollback1](https://cloud.githubusercontent.com/assets/10654877/12946381/4a31c5ea-cff4-11e5-9dcc-622998353e2c.jpg)

Puis aller dans le repertoir db/migrate
Effacer à la main la dernière migration

Puis ```rake db:migrate```

### Chercher des données specifiques et les effacer

```a = Land.where(city_id:4).delete_all```
