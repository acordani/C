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

