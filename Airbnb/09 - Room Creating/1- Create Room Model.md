```
rails g model Room home_type:string room_type:string accommodate:integer bed_room:integer bath_room:integer listing_name:string summary:text address:string is_tv:boolean is_kitchen:boolean is_air:boolean is_heating:boolean is_internet:boolean price:integer active:boolean user:references
```
```rake db:migrate```

Dans ```app/models/user.rb```
Ajouter:
```
has_many :rooms

validates :home_type, presence: true
validates :room_type, presence: true
validates :accommodate, presence: true
validates :bed_room, presence: true
validates :bath_room, presence: true
validates :listing_name, presence: true, length: {maximum: 50}
validates :summary, presence: true, length: {maximum: 500}
validates :address, presence: true
```


