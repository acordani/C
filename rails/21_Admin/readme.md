## Admin

```bash
rails g migration AddAdminToUsers
```

### Open the newly created ***_add_admin_to_users.rb migration file:

```
def change
  add_column :users, :admin, :boolean, null: false, default: false
end
```

  rake db:migrate

