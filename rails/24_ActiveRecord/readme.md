https://www.youtube.com/watch?v=Z9GaNNztcZk
50:15

def index
	@items = Item.where(:user_id => current_user.id)
end

Recupere tous les items qui ont comme user_id le current_user


Si on ajoute apres:

.order("created_at DESC")

Va les afficher du plus recent au plus ancien.

