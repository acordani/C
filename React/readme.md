#React

### 1- Create React App

```
npx create-react-app my-app
```

```
cd my-app
npm start
```

### 2- Organisation des répertoires

- Effacer tous les fichiers dans ``src``
- Créer un repertoire ``components``
- Créer un fichier ``App.js``

### 3- Création de notre composant Racine

Les composants sont comme des pièces de Légo
Le premier composant est notre composant Racine : ``App.js``

```
import React from 'react';

class App extends React.Comoponent {
  render() {
    return(
      <div>
        <h3>Liste des Courses</h3>
        <div>En Construction</div>
      </div>
    );
  }
}
```

- La méthode ``render()`` ne fait que retourner (return)
- Le jsx ressemble à du html
- React exige qu'il y ait un ``<div> parent.``

     


On va avoir un component parent : App
Et des components enfants. Ici Form et ItemList

C'est important car il faut séparer les responsabilités.

Un formulaire a pour responsabilité d'afficher le formulaire puis de faire remonter l'information aux component Parent.
Le formulaire ItemList a pour unique responsabilité d'afficher les articles que son parent lui aura passé.

On va donc ds un premier temps créer ses components avec une fonction.

Comprendre un callback sur un input:
<input type="text" placeholder="toto" value="" onChange={console.log("toto")} />
