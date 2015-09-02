# MVC

##Controller

C'est le chef d'orchestre de l'application Rails.
En fonction de la requete de l'utilisateur, le controller va interoger le modele(classes Ruby qui vont être connéctées à la base de donnée).

Donc, il va aller chercher les infos depuis le modèle et une fois que le controller a les infos, il les injecte dans les vues afin de construire la page qui va être renvoyée à l'utilisateur.

C'est aussi au controller d'avoir le code ruby afin de l'injecter dans les vues.
Il va definir des variables d'instances qui seront accessibles depuis la vue.
Une variable d'instance est une variable avec un @ devant.
On dit qu'on instancier un controller. On va donc ensuite donner ces variables d'instance à la vue.

Quand on fait une requete ca instanci  un controller. Ca tape une action et si tu veux donner des choses à ta vue, c'est cette action qui doit definir les variables d'instance.
On a donc besoin d'instancier des variables et ce sont elles qui seront disponible ds la vue associée.
Par exemple, dans le controller pages et l'action about. C'est ici qu'on va instancier les variables qui seront disponibles dans la vue pages/about

##Model

Il assure le lien avec la base de données.

##View

La vue doit présenter l'information.
.html.erb car on peut melanger du code html et du code ruby par l'intermediaire de <% %> ou <%= %>

Dans la vue, on aura donc les variables d'instances qui auront été instanciées par le controller et on lui demandera de les afficher par l'intermediaire de <%= %>.

C'est le layout qui recoit le squelette de la page. Les vues vont s'inserer à la place de yield.
Dans le layout, il y aura donc le header et le footer. Le contenu changera en fonction de la page.


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

Une action d'un controller(methode ruby) renvoie le fichier qui a le meme nom que cette methode et qui se trouve dans le fichier vue. Il sera dans un dossier qui portera le meme nom que le controller et la page associée aura le meme nom que l'action du controller.
Un controller est donc lié à un dossier de vues. Ca s'appelle la convention Action-Vue

ex:

Controller Pages| View  dossier pages
----------------|------------------------
Action 'about'  | Fichier about.html.erb


Comment fait-on pour créer une nouvelle action dans Pages ?


def team
end


et dans View > pages >
On créer la page team.html.erb

sans oublier la route associée

get 'team' => 'pages#team'

Chaque vues seront donc dans des dossiers differents qui porteront le nom de chaque controller.

2eme méthode de rooting:

root 'welcome#index'

Cette route va gérer la page get /, c'est a dire la racine du site.
C'est donc la première page ou le site va pointer. C'est à  dire http://localhost/3000
Pour notre exemple, ca sera root 'pages#about'

Pour afficher le rooting, il faur faire rake routes

Comment recuperer des parametres depuis une requete entrantes ?

Les parametres, il y aplusieurs facons de les communiquer:

- Par un Get, les parametres sont ds l'URL (query strings). C'est quand on fait un search.
- Par un Post, les params sont cachés ds le corps de la requete.
-  Et on peut avoir : un bout d'URL qui est interprété par exemple airbnb avec torino (58:00).

Dans Rails, on recupere tous ces parametres dans un hash qui va s'appeler params. Peu importe si c'est get ou post. C'est magique !!

On va rajouter une page de recherche sur le site:

- Rooter

    get 'search" => 'pages#search'

- Controller Pages

    def search

    end

- View pages

    search.html.erb
      <form action="/search">
        <input type="text" name="category">
        <input type="submit" value="search">
      </form>

Dans form action="", on va avoir l'Url surlequel on va soumettre le formulaire. cad, quand on va soumettre le formulaire, il va y avoir une requete, et ds cette requete, il y aura une URL. C'est celle-ci quon va utiliser dans form action="/home". On pourrait aussi decider de faire une requete sur la meme URl form action="/search"

L'attribut name est aussi tres important.Ca sert a nommer le parametre pour ensuite le recuperer ds notre backend.
C'est ce parametre qui va partir ds l'url dans la query string.
Par exemple si on envoie le formulaire, et qu'on nomme thai dans le formulaire , on va avoir en postant ce formaulaire, l'url suivante : localhost/3000/search?category=thai

Les parametres passent dans l'URL car par defaut le formulaire fait un get
Donc quand on soumet le formulaire, on fait une requete get sur /search.
Donc on va arriver sur le fichier route qui nous dit que get 'search' => 'pages#search'

Donc on arrive au controller Pages dans l'action search.
      def search
        @category = params[:category]
      end
pour recuperer les parametres, on va chercher les params[:category] et qu'on va integrer dans une variable d'instance @category.

Et du coup, le controller Pages/search envoie la variable d'instance à la vue pages/search

      <p>Search for <%= @category %>

Si on rajoute method="post" à form action="".
Il va y avoir un probleme car on fait maintenant une requete post sur /search. Et il n'y a pas de route post.

Il faut donc rajouter une route:

      post 'search' => 'pages#search".
Le parametre ne sera plus envoyé dans l'Url mais ds le corps de la requete.

La il y avoir une erreur car Rails protege les formulaire. Il faudra passer par un helper form_for ou simple_form.

Si au lieu de mettre < input type="text" name="category" >, on met :
      <input type="text" name="search[category]">
      <input type="text" name="search[name]">

ca va nous donner un formulaire avec 2 inputs. Si on met un raise dans le controller a search, et qu'on inspecte les params, ca nous donne:
      {"search"=>{"category"=>"thai", "name"=>"blue elephant"}.

Il va nous donner une clé search qui aura des sous informations category et name. Et on peut y acceder en faisant params[:search]. Et ca c'est plutôt cool ;-)

On peut aussi dans les routes faire des url parametriques:

      get 'search/:category' => 'pages#search".
Ca donne un but d'Url qui sera interprété comme un parametre.
C'est comme restaurant/:id => restaurant/23

##Les liens

On utilise un helper 'link_to'
     <%= link_to "texte du lien", url_path %>
     <%=" chercher un resto", search_path %>

quand on fait rake routes, il ya a gauche des prefixes qui vont nous donner accés à des methodes qui vont generer pour nous des url.

Par exemple l'url /search a comme prefixe search. dans le link_to on ajoute au prefixe _path.

Ca permet si on veut changer l'url d'une page de ne pas tout casser.

par exemple a la place de get 'team' => 'pages#team', on veut mettre get 'equipe'.
on va donc changer l'url mais en ajoutant as: :team apres, on ne changera pas les liens créés avec link_to

     get 'equipe' => 'pages#team', as: :team



