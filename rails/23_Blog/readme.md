- Demarrons un projet ```rails new blog -T```
- ```cd lacuillere```
- ```git init``` & ```git add .``` & ```git commit -m "rails new"```
- gemfile "better_errors" et "binding_of_caller"
- ```bundle install```
- ```git add . + git commit -m "add gemfile debug"```

- Articles CRUD

- Commencons par générer le model post:

```rails g model Post title:string content:text```

Ca crée un fichier de migration.

```rake db:migrate```

- Puis créons le Controller

```rails g controller posts```

- Puis dans le fichiers posts_controller.rb

```
def index
end
```

- Puis dans Views, créons le fichier  ```index.html.erb```

```<h1> Hello World </h1>```

- Continuons avec le Controller, 

```
def new
  @post = Post.new
end

def create
  @post = Post.new(post_params)
  if @post.save
    redirect_to @post, notice: "Your article was successfully saved"
   else
    render "new", notice: "Your article wasn't saved"
   end
end

private

def post_params
  params.require(:post).permit(:title, :content)
end
 
```

- Maintenant créons le formulaire de création de posts dans le dossier views

``` new.html.erb ```

```
  <h1> Nouveau formulaire </h1>
  
    <%= render "form" %>
  
```

- Et créons un partial pour le formulaire : _form.html.erb

```
<%= form_for @post do |f| %>

  <%= f.label :title %>
  <%= f.text_field :title %>
  
  <br>
  <br>
  
  <%= f.label :content, "write your content here" %>
  <%= f.text_area :content%>
  
  <br>
  <br>
  
  <%= f.submit %>
  
<% end %>

```

- Créons maintenant dans le controler l'action show

```
def show
  si on fait rake routes, on a : post GET    /posts/:id(.:format)      posts#show
  
  ce qui veut dire que pour l'action show, le controller a besoin d'un id pour trouver le post.
  
  on va donc avoir:
  
  @post = Post.find(params[:id]
end
```

Le plus simple étant de créer une nouvelle action en private

```
def set_post
  @post = Post.find(params[:id])
end
```

et du coup, 

mettre:

```
before_action :set_post, only: [:show, :edit, :destroy, :update]
```

- Donc créons un test pour le ```show.html.erb```

```
<%= @post.title %>
```

- Créons maintenant dans le controller, 2 nouvelles actions edit et update

```
def edit
end

def update
  if @post.update(post_params)
    redirect_to post_path(@post), notice: "Your post was updated"
  else
    render 'edit', notice: "Your post wasn't updated"
  end
end

```

- Créons la page  ```edit.html.erb```

```
<%= render 'form'%>
```

- Maintenant, créons l'action destroy

```
def destroy
  @post.destroy
  redirect_to posts_path
end
```


- Maintenant, rajoutons un lien dans la page show pour l'update
```
<%= link_to "Edit the post", edit_post_path(@post) %>
<%= link_to "Destroy", post_path, method: :delete, data: { Confirm: "Are you sur yaou want to delete"} %>
```
