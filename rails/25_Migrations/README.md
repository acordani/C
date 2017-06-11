-----------------------------
Ajout migration à une table:
------------------------------

```
rails g migration AddLocalityToSupermarkets locality:string
```

On ajoute le champ locality à la table Supermarkets

-----------------------------------
On retire un champ d'une table
-----------------------------------

```
rails g migration RemoveLocalityFromSupermarkets locality:string
```


