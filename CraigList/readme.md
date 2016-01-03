Nous allons essayer de faire un CraigList ;-)

Nous allons dans un premier temps créer un model Listing dans lequel nous allons mettre des champs dont le champ category.

Dans un deuxieme temps, nous passerons le champ en model séparé.

Donc le le model Listing à plusieurs champs:
    t.string   "title"
    t.text     "description"
    t.string   "city"
    t.integer  "category"
