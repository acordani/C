##2 Models

- Restaurants : name, address, stars, chef
- Review : content

J'ai seedé des restaurants

rails c
good = Review.new(content: "super bon resto !!")
good.restaurant = Restaurant.first
Du coup maintenant si on inspecte good, il aura le restaurant_id du Restaurant.first
good.save Pour sauver

Si on prend le premier resto qui était epicure = Restaurant.first
Du coup maintenant comme dans le modele restaurant, on a fait has_many :reviews. Ca a créé une methode restaurant qui peut etre appelée.

epicure.reviews
=> Ca donne un tableau d'objet avec toutes les reviews du restaurant

On peut faire epicure.reviews.count =>1
et epicure.reviews.first.content => super bon resto !!

On peut aussi faire good.restaurant.name ca donne le nom du restaurant "l'épicure"
-------------------------------------------------------
first = Restaurant.first
review = first.build
=> Donne un objet Review avec le restaurant_id est pré rempli car on a utilisé build. C'est comme un new qui pré rempli la clé étrangère.
