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

A chaque fois qu'on crée un model, il faut jouer(crash-tester) avec dans la console.

```
  rails c ou rails c --sandbox (bac à sable):
  Restaurant.all =>[] la reponse est vide car il n'y en n'a pas.
  Restaurant.create(name:"Dindon en Laisse", stars:3)
  Restaurant.count => 1
  Restaurant.first => Retourne l'objet restaurant avec l'id 1
  ```
  ```git add .``` & ```git commit -m "adding restaurant Model"```
  
  Ajout d'une migration pour ajouter Address dans la table restaurants
  
  ```
  rails g migration AddAddressToRestaurants address:string
  rake db:migrate
  rails c
  dindon = Restaurant.first
  dindon.address = "13, Rue de Boutreillis"
  dindon.save
   ```
  On regarde si dindon.address fonctionne
   ```git add .``` & ```git commit -m "adding address to restaurant"```
  
  Ensuite, il faut faire les validations du model restaurant
  
  Validates :name, presence: true
  
  Ensuite rails c
  ```
  bad = Restaurant.new(stars:3) On essaie de valider un nouveau resto sans le nom
  bad.valid? Permet de voir si le nouveau resto est valide. La reponse est false
  bad.name = "Un nom" On ajoute un nom à bad
  bad.valid? On lui redemande si il est valide. La reponse est true
  Maintenat si on fait un bad.save, il s'enregiste.
  ```
   ```git add .``` & ```git commit -m "adding validations to restaurant"```
  

