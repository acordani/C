### Modifier localement l version de Ruby qui est ds le gemfile

Suite à ce messag d'erreur:

```Your Ruby version is 2.3.0, but your Gemfile specified 2.2.3```

Faire:

```rbenv local 2.2.3```

### Effacer la dernière migration (si erreur)

```rake db:rollback```

Puis aller dans le repertoir db/migrate
Effacer à la main la dernière migration

Puis ```rake db:migrate```
