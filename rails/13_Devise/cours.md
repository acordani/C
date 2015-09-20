Dans le controller.

Si on veut voir les appartements de l'utilisateur;
@flats = current_user.flats
On peut utiliser la methode flats pour User car dans le modele User, il y a User has_many :flats

Si l'utilisateur actif veut créer un nouvel appartement( dans l'action new):
@flat = current_user.flats.build

