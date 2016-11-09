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

- Puis dans Views, créons le fichier ```index.html.erb```

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

```new.html.erb```
  <h1> Nouveau formulaire </h1>
  
- Et créons un partial pour le formulaire : _form.html.erb










