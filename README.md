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

###Comment créer un controller dans un application Rails?

On va utiliser des generateurs : **rails g controller pages about contact**

g             => generate
pages         => Nom du controller, **tjs au pluriel**. Le controller va gérer **des pages**.
about action  => Methode d'instance d'un controller.

Ca va créer les routes (2), les actions du controller et les vues associées.

Pour afficher les pages, on fait : localhost/3000/pages/contact ou pages/about
pages_contact et pages_about sont les chemins (path).

Pour voir les routes de l'application , on écrit rake routes (Affiche moi les routes de mon app!!)

###Comment l'action du controller sait quelle vue elle doit renvoyer?

Une action d'un controller(methode ruby) renvoie le fichier qui a le meme nom que cette methode et qui se trouve dans le fichier vue. Il sera dans un dossier qui portera le meme nom que le controller et la page associée aura le meme nom que l'action du controoler.

ex:

Controller Pages| View  dossier pages
----------------|------------------------
Action 'about'  | Fichier about.html.erb


Comment fait-on pour créer une nouvelle action dans Pages

def team
end

et dans View > pages > 
On créer la page team.html.erb

sans oublier la route associée

get 'team' => 'pages#team'

