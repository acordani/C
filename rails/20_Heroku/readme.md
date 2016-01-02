##drop database

```bash
heroku pg:reset DATABASE_URL --confirm NOMDELABASEDEDONNEES

heroku run rake db:migrate
```

##console

```bash
heroku run console
```
