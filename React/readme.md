#React

On va avoir un component parent : App
Et des components enfants. Ici Form et ItemList

C'est important car il faut séparer les responsabilités.

Un formulaire a pour responsabilité d'afficher le formulaire puis de faire remonter l'information aux component Parent.
Le formulaire ItemList a pour unique responsabilité d'afficher les articles que son parent lui aura passé.

On va donc ds un premier temps créer ses components avec une fonction.

Comprendre un callback sur un input:
<input type="text" placeholder="toto" value="" onChange={console.log("toto")} />
