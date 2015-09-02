#Rails CRUD

- Demarrons un projet ```rails new lacuillere -T```
- ```cd lacuillere```
- ```git init``` & ```git add .``` & ```git commit -m "rails new"```
- gemfile "better_errors" et "binding_of_caller"
- ```bundle install```
- ```git add . + git commit -m "add gemfile debug"```
- ```rails g model Restaurant name:string stars:integer```
ca crée un fichier migration(qui crée la table restaurants) et un fichier pour le model restaurant
- Si on veut revenir en arrière car on c'est trompé dans la generation du model, on peut faire:

```rails destroy model Restaurant```

- rake db:migrate (lance la migration) et du coup ca crée la table restaurant dans la base de donnée.

