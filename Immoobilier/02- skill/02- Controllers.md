```
rails g controller skills index show new create edit update
```


Ca donne

```
Running via Spring preloader in process 23434
      create  app/controllers/skills_controller.rb
       route  get 'skills/update'
       route  get 'skills/edit'
       route  get 'skills/create'
       route  get 'skills/new'
       route  get 'skills/show'
       route  get 'skills/index'
      invoke  erb
      create    app/views/skills
      create    app/views/skills/index.html.erb
      create    app/views/skills/show.html.erb
      create    app/views/skills/new.html.erb
      create    app/views/skills/create.html.erb
      create    app/views/skills/edit.html.erb
      create    app/views/skills/update.html.erb
```

Puis dans 

```
app/controllers/skills_controller.rb
```

```
def index
    @skills = current_user.skills
  end
```

Ici on demnde d'afficher les skills de l'utisateur enrregistré(current_user) current_user.skills car ds le model User, on a mis User has_many :skills

```
def show
  @skill = Skill.find(params[:id])
end
```

Comme on a besoin aussi de ```Skill.find(params[:id])```, dans edit et update, on va créer une methode ```set_skill``` en private
```
private
def set_skill
  @skill = Skill.find(params[:id])
end
```
Puis on met en ```before_action :set_skill, only: [:show, :edit , :update]```

Puis toujours en private on crée une methode ```skill_params```
```
def skill_params
  params.require(:skill).permit(:listing_skill, :active)
end
```
puis on crée la methode new
```
def new
  @skill = current_user.skills.build
end
```
puis la methode create
```
def create
  @skill = current_user.skills.build(skill_params)
  if @skill.save
    redirect_to @skill, notice:"Saved..."
  else
    render :new
  end
end
```
Puis la methode update
```
def update
  if @skill.update(skill_params)
    redirect_to @skill, notice:"Updated ..."
  else
    render :edit
  end
end
```
