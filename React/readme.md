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

export default App;
```

- La méthode ``render()`` ne fait que retourner (return)
- Le jsx ressemble à du html
- React exige qu'il y ait un ``<div> parent.``
- ``export default`` exporte la classe

### 4- Utiliser notre Composant App

On va créer un nouveau fichier qui va s'appeler ``index.js`` à la racine de ``src``.
Il doit être au même niveau que le répertoire ``components``.

``index.js``

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App/>, document.getElementById('root'));
```

``<App/>``  est l'appel au composant App
``document.getElementById``permet d'indiquer à quel endroit de la page afficher ce composant.

=> Résultat Ecran

Liste de Course
En construction

### 5- Créer un composant enfant "Form"

Nous allons ajouter 2 composants à notre composant ``<App/>``.

```
import React from 'react';
class App extends React.Component {
  render() {
    return(
      <div>
        <h3>Liste de Courses</h3>
        <Form/>
        <ItemList/>
      </div>
    );
  }
}

export default App;
```




On va avoir un composant parent : App
Et des composants enfants. Ici Form et ItemList

C'est important car il faut séparer les responsabilités.

Le composant ``<Form/>`` a pour responsabilité d'afficher le formulaire de saisi puis de faire remonter l'information aux composant Parent ``<App/>``.
Le formulaire ``<ItemList/>`` a pour unique responsabilité d'afficher les articles que son parent lui aura passé.

On va donc ds un premier temps créer ses composants avec une fonction(Arrow Function) plutôt qu'avec une classe.

On va créer le composant ``<Form/>`` dans le repertoire ``components``.

``Form.js``

```
import React from 'react';
const Form = () => {
  return(
    <div>Form Component</div>
  );
};

export default Form;
```

### 6- Créer un composant enfant "ItemList"

```
import React from 'react';`
const ItemList = () => {
  return(
    <div>Component ItemList</div>
  );
};

export default ItemList;
```

### 7- Utiliser des composants Enfants depuis un composant Parent

``App.js``

``` 
import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import ItemList from './ItemList';

=> Résultat Ecran

Liste de Courses
Component Form
Component ItemList
```

### 8- Stateless Components & ClassBased Components 

Il y a 2 types de composants:

- Ceux basés sur les fonctions : StateLess Components
- Ceux basés sur les classes : ClassBased Components

Les StateLess Compoments n'ont pas d'états
Ils recoivent des données et renvoient du contenu qui sera affiché via le return.

LEs ClassBased Components sont là lorsqu'on a besoin d'un état, lorsqu'on a besoin de faire des opérations à des moments précis grâce au LifeCircle ou lorsqu'on a besoin d'acceder au DOM.

### 9- Transformer un StateLess en ClassBased



Comprendre un callback sur un input:
<input type="text" placeholder="toto" value="" onChange={console.log("toto")} />
