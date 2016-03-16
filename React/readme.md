#React

1- Hello World

Pour créer un composant, on va d'abord nomer une variable ```var App =```

Puis on va utiliser: React.createClass

On va ensuite lui passer un objet, qui va representer un composant

Ce composant aura une methode render ```render : function() {```

Cette methode va retourner une representation du DOM en html ```return(````

````
var App = React.createClass({
    render: function() {
        return <div>Hello World</div>;
    }
});
```

Pour afficher ce composant à l'écran, on va utiliser ```React.renderComponent```

Et on va lui passer le composant ```<App />````

Ainsi que l'endroit ou il va être affiché ```document.body````

```
React.render(<App />, document.body);
````

Cela va permettre d'afficher ```Hello World```

![react2](https://cloud.githubusercontent.com/assets/10654877/13070498/62eddf22-d48d-11e5-8ecc-a6c9b7412a95.jpg)

2- Propriété du composant

Au moment de l’initialisation du composant, quand on va rendre le composant sur la page, on va lui passer un attribut qui va devenir une propriété(props)

```React.render(<App txt="This is the txt"/>, document.body);````



Puis, on va suite à ```return <div>Hello …```

On va ajouter ```{this.props.txt}```

```return <div>Hello World {this.props.txt}</div>;```

![react3](https://cloud.githubusercontent.com/assets/10654877/13070844/c92c8bba-d48f-11e5-8f0a-6858480cd8d1.jpg)

3- State basic

Le state permet de faire varier l'état d'un composant.

On va commencer par lui donner un état initial:
```getInitialState: function() {````

Cette fonction va retourner un objet qui aura comme clé txt:
```txt:"This is the state text````

Pour afficher le state sur l'écran, on va mettre state au lieu de props
```return <div>Hello World {this.state.txt}</div>;````

````
var App = React.createClass({
    getInitialState: function() {
    return {txt:"this is the state text"}
    },
    render: function() {
        return <div>Hello World {this.state.txt}</div>;
    }
});
 
React.render(<App txt="This is the txt"/>, document.body);
```

![react5](https://cloud.githubusercontent.com/assets/10654877/13085939/072ed19c-d4e1-11e5-868d-0e375ee14e43.jpg)


------------------------------------------------------------------------------------------------------------------------

### Your first Component

Créons une page product

```
var Product = React.createClass({
  render: function() {
    return(
      
      
      );
  }
});

React.render(<Product/>, document.getElementById("root"));

````
Puis dans le return, on va mettre:

````
return(
      <div>
        <p>Android -- 199€</p>
        <button>Buy</button>
      </div>
      );
```
Ca va nous rendre un boutton buy cliquable mais que ne donne rien.

![clic](https://cloud.githubusercontent.com/assets/10654877/13729969/aa7920e0-e941-11e5-9686-4004bf0a57c9.gif)
    
    
### Working with Event

Il nous faut maintenant coder la fonction sur le clique
On va la coder directement ds la fonction product

````
buy: function() {
    alert("you bought an Android mobile");
  },
```

Et à l'interieur de <button>, on va rajouter 
```
<button onClick={this.buy}>
````

this se refere à Product. Et ds Product, on va aller à la fonction buy

![clic2](https://cloud.githubusercontent.com/assets/10654877/13730032/fe75c110-e943-11e5-9025-8822b9dcd87a.gif)

### Working with State

Afin de créer un etat, on va commencer par créer un état initial:
On va donc créer une fonction getInitialState qui va rendre un objet qui aura comme clé qty: (quantity)

````
getInitialState: function() {
    return {qty:0};
  },
````
Ensuite, à l'interieur de la fonction buy, au lieu de alert, on va mettre:

````
buy: function() {
    this.setState({qty: this.state.qty + 1})
  },
````

Set state est une fonction de React qui va donner une nouvelle valeur à qty

Puis, pour afficher, on va ajouter :

```
<h3>{this.state.qty} item(s)</h3>
````

![clic3](https://cloud.githubusercontent.com/assets/10654877/13730119/0b91fe42-e947-11e5-9eb7-b495ae72b896.gif)

### Reusable Components 

On va créer une variable Total
et une variable ProductList

````
var Total = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Total Cash: </h3>
      </div>
    );
  }
});
````

````
var ProductList = React.createClass({
  render: function() {
    return (
      <div>
        <Product/>
        <Product/>
        <Product/>
        <Total/>
      </div>
    );
  }
});
```

A l'interieur de la variable ProductList, on va rendre des Product

Puis, on va remplacer Product par ProductList dans React.render

````
React.render(<ProductList/>, document.getElementById("root"));
````
![product](https://cloud.githubusercontent.com/assets/10654877/13730190/d9705600-e948-11e5-9d19-497a8a85fb45.jpg)

### Working with property - Data

On va rajouter des props à product:
```
<Product name="Android" price="121"/>
<Product name="Apple" price="123"/>
<Product name="Sony" price="66"/>
```

Puis on va remplacer : 
```
<h3>Android - $199</h3>
```

par:
```
<p>{this.props.name} -- {this.props.price} €</p>
```

![react](https://cloud.githubusercontent.com/assets/10654877/13730279/67c98ab4-e94b-11e5-9e9b-889a1cd900ec.jpg)

### Working with Property - Function

On va rajouter une fonction showProduct dans la variable ProductList.
Cette fonction va permettre d'afficher une fenetre Alert avec le nom de l'article quand on cliquera sur le bouton show de chaque article.

```
showProduct: function(name) {
    alert("You selected " + name);
  },
```

Et donc dans la variable Product, on va rajouter un bouton show

```
<button onClick={this.show}>Show</button>
```
Le probleme est :
Lorsqu'on va cliquer sur le bouton show de Product, on veut que ce bouton soit relié à la fonction de showProduct de productList
On va passer un props dans productList:

```
<Product name="Android" price="121" handleShow={this.showProduct}/>
```
Et du coup dans la variable Product, on va créer une fonction show ou on va passer le handleShow

```
show: function() {
    this.props.handleShow(this.props.name);
  },
```
