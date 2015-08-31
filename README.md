# MVC

##Controller

C'est le chef d'orchestre de l'application Rails.
En fonction de la requete de l'utilisateur, le controller va interoger le modele(classes Ruby qui vont être connéctées à la base de donnée).

Donc, il va aller chercher les infos depuis le modèle et une fois que le controller a les infos, il les injecte dans les vues afin de construire la page qui va être renvoyée à l'utilisateur.

##Model

Il assure le lien avec la base de données.

##View

La vue doit présenter l'information.


Comment communique t-on avec un serveur?
----------------------------------------

On communique avec un protocole HTTP. Donc, quand on communique avec un site web, on le fait avec des requetes http.

Et donc, en entrée de l'app, on va avoir des requetes entrantes. Il va donc manquer une brique à notre MVC. C'est le but du fichier de routing.

##Route

Il va dispatcher. Telle requette va aller ds tel controller et dans telle action.

Comment 
