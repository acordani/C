On va utiliser nos validations pour enrichir notre app Rails(messages d'erreurs...)

Dans le model Restaurant

validates :stars, inclusion: { in: [1,2,3], allow_nil: false }
Un restaurant doit avoir des étoiles qui seront comprise entre 1, 2, 3 et qui ne pourront pas etre nulles.

validates :name, uniquenesse: true, presence: true
Un restaurant doit avoir un nom obligatoirement et qui doit etre unique.

validates :address, presence: true
Un restaurant doit avoir une adresse obligatoirement

def create
  @restaurant = Restaurant.new(restaurant_params)
  if @restaurant.save
    redirect_to restaurant_path(@restaurant)
  else
    render :new
  end
end

Le render :new renvoie le template html new donc le @restaurant ne change pas et du coup le formulaire reste rempli.

Afin de savoir si ca fonctionne on met un raise dans le controller juste apres le else.
On rentre dans le formulaire de restaurant avec rails s et on poste un formulaire invalide. stars 4 et pas d'adresse.

On a donc une erreur qui s'affiche. On écrit :
@restaurant.errors
@restaurant.errors.full_messages
=> stars is not included in the list & address can't be blanck

Ces messages, on peut aussi les customiser si on le souhaite dans la validation du model: validates... , message "fffff"

Du coup dans le formulaire new, on va mettre:

<%= form_for @restaurant do |f| %>
  <% if @restaurant.errors.any? %>
    <ul>
      <% @restaurant.errors.full_messages.each do |message| %>
        <li> <%= message %> </li>
      <% end %>
    </ul>
  <% end %>
  <%= f.text_field :content %>
<% end %>

Du coup :
- je parcours @restaurant pour voir si il y a des erreurs
- et pour chaque erreur, j'affiche le messgae


