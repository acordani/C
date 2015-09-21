Dans le controller.

Si on veut voir les appartements de l'utilisateur;
@flats = current_user.flats
On peut utiliser la methode flats pour User car dans le modele User, il y a User has_many :flats

Si l'utilisateur actif veut créer un nouvel appartement( dans l'action new):
@flat = current_user.flats.build

-------------------------------------------------------
## Photos

Partie 1 

rails g model Photo room:references
rails g paperclip photo image(generate a new fichier of migration image to photo-
rake db:migrate

Dans app/models/photo

class Photo < ActiveRecord::Base
  belongs_to :room

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end

Dans app/models/room

Ajouter: has_many :photos

Dans config/routes

Ajouter : resources :photos

Partie 2

App/controllers/rooms_controller

def show
  @photos = @room.photos
end

def create
    @room = current_user.rooms.build(room_params)

    if @room.save

      if params[:images] 
        params[:images].each do |img|
          @room.photos.create(image: img)
        end
      end

      @photos = @room.photos
      redirect_to edit_room_path(@room), notice: "Saved..."
    else
      render :new
    end
  end
  
  def update
    if @room.update(room_params)

      if params[:images] 
        params[:images].each do |image|
          @room.photos.create(image: image)
        end
      end

      redirect_to edit_room_path(@room), notice: "Updated..."
    else
      render :edit
    end
  end
  
  def edit
    if current_user.id == @room.user.id
      @photos = @room.photos
    else
      redirect_to root_path, notice: "You don't have permission."
    end
  end
  
  Partie 3
  
  App/views/rooms/_form.html.erb
  
  Ajouter au form_for ou simple_form: , html: {multipart: true}
  
  Puis à l'endroit du formulaire ou il y aura l'upload d'images:
  
  <div class="row">
    <div class="col-md-4">
      <div class="form-group">
        <span class="btn btn-default btn-file">
          <i class="fa fa-cloud-upload fa-lg"> </i>Upload Photos
          <%= file_field_tag "image[]", type: :file, multiple: true %>
        </span>
      </div>
    </div>
  </div>
  
  <div id="photos"><%= render 'photos/list' %>
  
  
Dans App/views, créer un nouveau dossier photos

Puis dans le fichier _list.html.erb

<% if @photos %>
	<div class="row">
		<% @photos.each do |photo| %>		
			<div class="col-md-4">
				<div class="panel panel-default">
				  <div class="panel-heading preview">
				  	<%= image_tag photo.image.url() %>
				  </div>
				  <div class="panel-body">
				  	<span class="pull-right">
				  		<%= link_to photo, remote: true, method: :delete, data: {confirm: "Are you sure?"} do %>
					  		<i class="fa fa-times fa-lg"></i>
				  		<% end %>
				  	</span>
				  </div>
				</div>
			</div>
		<% end %>			
	</div>
<% end %>
