```
rails g controller rooms index show new create edit update
```

Ds ```app/controller/rooms_controller```
```
def index
  @rooms = current_user.rooms
end
```
Ici on demnde d'afficher les rooms de l'utisateur enrregistré(```current_user```)
```current_user.rooms``` car ds le model User, on a mis User has_many :rooms

```
def show
  @room = Room.find(params[:id])
end

Comme on a besoin aussi de Room.find(params[:id]), dans edit et update, on va créer une methode set_room en private

private
def set_room
  @room = Room.find(params[:id])
end

Puis on met en before_action :set_room, only: [:show, :edit , :update]

Puis toujours en private on crée une methode room_params

def room_params
  params.require(:room).permit(:home_type, :room_type, :accommodate, :bed_room, :bath_room, :listing_name, :summary, :address, :is_tv, :is_kitchen, :is_air, is_heating,is_internet, :price, :active)
end

puis on crée la methode new

def new
  @room = current_user.rooms.build
end

puis la methode create

def create
  @room = current_user.rooms.build(room_params)
  if @room.save
    redirect_to @room, notice:"Saved..."
  else
    render :new
  end
end

Puis la methode update

def update
  if @room.update(room_params)
    redirect_to @room, notice:"


  
