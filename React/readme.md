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

On peut changer un composant en cours de dévelopement.

Ex: Le composant Form.

```
StateLess Initial:

import React from 'react';
cont Form = () => {
  return(
    <div>Component Form</div>
  );
};
export default Form;
```

```
ClassBased Component:

import React from 'react';

state = {};

class Form extends React.Component {
  render() {
    return(
      <div>Comonent Form</div>
    );
  }
}

export default Form;
```

``state`` va contenir les données saisies par l'utilisateur.

Notre formulaire va nous permettre de saisir un article et une quantité.

Donc notre état(state) sera un objet javascript qui va comporter la propriété name & quantity

```
state= {
  name:"",
  quantity:0
};
```


Du coup, maintenant, on peut créer notre formulaire dans notre component Form.

```
import React from 'react';

state = {
  name:"",
  quantity:0
};

class Form extends React.Component {
  render() {
    return(
      <form>
        <input type="number" placeholder="quantité" />
        <input type="text" placeholder="article" />
        <button type="submit">Ajouter</button>
      </form>
    );
  }
}

export default Form;
```

Le type ``submit``de ``button``permet la validation par la touche Entrée

Pour le moment quand on ajoute, il ne se passe rien.

### 10- Gérer les Evenement du DOM

Pour récupérer les données saisies par l'utilisateur, on va ajouter une ``value`` et écouter l'évenement ``Change``.
En React, on va prefixer les évenements du DOM par un ``on``puis on ajoutera l'évenement. Ici avec l'évenement ``change``, cela va donner ``onChange``.

```
<input type="number" placeholder="quantité" value="" onChange={} />
<input type="text" placeholder="article" value="" onChange={} />
``` 

Les ``{}``nous permettre de rajouter à l'intérieur du javascript pour le callback

Si on laisse comme ça, cela fait une erreur car il faut absolument mettre quelquechose à l'intérieur des ``{}``.
Les ``{}``contiendront le callback qui sera appelé à chaque fois que l'événement change sera envoyé.

Le CallBack sera une ArrowFunction.

```
<input type="number" placeholder="quantité" value="" onChange={ (event) => this.setState{quantity:event.target.value})}; />
```

Pourquoi une ArrowFunction dans les accolades ?

Il faut  utiliser une fonction car on veut differer l'éxécution du callback.


Comprendre un callback sur un input:
``<input type="text" placeholder="toto" value="" onChange={console.log('toto')} />``

Si on regarde dans la console, ``console.log`` sera exécuté de suite.
Nous ce qu'on veut, c'est que toto soit exécuté à chaque changement dans ``l'input``.

Du coup, cela va donner:
``<input type="text" placeholder="toto" value="" onChange= () => {console.log('toto')} />``
Ici, toto ne va pas s'éxecuter tout de suite.

### 11- Modification de l'état du composant Form à chaque saisie

Il faut utiliser ``setState``

Ex:

``onChange = {(event)=> this.setState({quantity:5})} />``
Dès qu'on changera l'input, le state passera à 5.

MAis ce qu'on veut, c'est récuperer la vrai valeur saisie dans l'input. On va utiliser pour ce faire ``event.target.value``

``onChange = {(event) => this.setState({quantity:event.taget.value})} />``

Afin que cela fonctionne, il faut aussi donner une valeur à ``value``.

```
<input type="number" placeholder="quantité" value={this.state.quantity} onChange= {(event) => this.setState({quantity:event.target.value})} />
```
### 12- Modifier l'état d'un composant(suite)

```
<input type="text" placeholder="article" value={this.state.name} 
  onChange= {(event)=> this.setState({name:event.target.value})} />
```

### 13- Gérer la soumission du formulaire

Selon la même logique que pour les champs texte, maintenant, on veut écouter l'événement ``submit``.
Comme il va y avoir plusieurs lignes de code, on va créer une fonction externe.

handleSubmit = (event) => {
  console.log('inside handlSubmit');
};

Regardons si la fonction fonctionne avec un console.log

Et appelons la fonction à chaque submit. Pour ce faire, on va l'appeler dans la balise ``<form>``.


``<form onSubmit= {this.handleSubmit}>``

Pour éviter le raffraichissement de la page à chaque validation, on va utliser dans la fonction:

```
handleSumit(event) => {
  event.preventDefault();
  console.log('inside handleSubmit');
};
```

Maintenant depuis ``handleSubmit``on peut lire le contenu du state que nous passerons ultérieurement au composant Parent ``<App />``.

Pour ce faire, au lieu d'afficher le console.log dans ``handleSubmit``, on va afficheer l'état ``console.log(this.state);``

Ce qui va nous donner dans la console :

``Object{name:"", quantity:0}``


### 14- Passer des données d'un composant Parent vers un composant Enfant

Notre formulaire possede un h3 avec 'Ajouter des Articles à Acheter'.

On  peut lui passer dynamiquement un titre du Parent vers l'Enfant grâce aux Props.

``<App />``
``<Form formTitle="Ajouter des Articles à Acheter" />``

Ce qui nous permet de retrouver dans le composant ``<Form />``:

``<h3>{this.props.formTitle}</h3>``

On peut aussi rendre accessible une fonction via les props du Parent à son Enfant.

Ca tombe bien car ce qu'on saouhaite, c'est que le composant ``<Form />``soit très peu intelligent.

On prefère que ce soit ``<App />``qui gère l'ajout de nouveaux Articles.

Du coup, on va utiliser les props pour faire passer une référence à une fonction présente dans ``<App />``.

``<App />``

On va créer une fonction addArticle dans App

```
addArticle = (article) => {
  console.log(article)
 };
 ```
 
 Puis grâce à l'appel du composant ``<Form />``, on va intégrer une props en appelant cette fonction.
 
 
 ``<Form formTitle="Ajouter un article" addArticle={this.addArticle} />``
 
 Puis dans le composant ``<Form />`` au sein de la fonction ``handleSubmit``
 
 ```
 handleSubmit = (event) => {
  event.preventDefault();
  this.props.addArticle(this.state);
 ```
 
 On appelle la fonction ``addArticle`` grâce à ``this.props`` et on lui donne comme paramètre ``this.state``.
 
 ### 15- Ajouter un item à l'état du composant Parent
 
 Ce que nous voulons maintenant c'est que le composant PArent App.js ait son propre état.
 
 Donc ajoutons un state à ``<App />``
 
 ``state = { articles:[] };``
 
 le state à comme unique objet un tableau vide qui s'appelle ``articles``
 
 Dans les tableau, il y aura la liste de courses.
 
 La fonction ``addArticle`` que nous avons créé dans les vidéos précédentes va nous permettre d'ajouter un article au tableau d'articles.
 Donc nous allons le faire en utilisant ``l'immutabilité``.
 
 Au lieu de faire un push sur le tableau, on va créer un nouveau tableau en utilisant le ``spread operator``.
 
 
 Ex:
 ```
 let fruits= ["pomme","banane","orange"]
 let newFruit= ["poire"]
 let fruits2 = [...fruits, newFruit]
 => fruits2 
 => ["pomme","banane","orange", "poire"]
 ```
 
 Si nous n'avions pas utilisé le spread operator, nous aurions eu un tableau à 2 dimensions.
 
 C'est ce principe que nous allons mettre en place dans le composant ``<App />``.
 
On commence par récupérer l'état courant:
``let oldArticles = this.state.articles;``

Puis on va créer un id en utilisant Date.now

`` article.id = Date.now``

Puis on utilise le spread operator pour ajouter un article

``let newArticles = [...oldArticles, article];``

Puis on modifie l'état grâce à setState

``this.setState({articles: newArticles});``


