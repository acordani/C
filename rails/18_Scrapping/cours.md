##Scrapping


### Airbnb

ouvrir sublime et créer un nouveau fichier: ```airbnb_scraper.rb```

```
require 'open-uri'
require 'nokogiri'

# store URL to be scraped
url = "https://www.airbnb.fr/s/Nyc"

# Parse the page with Nokogiri
page = Nokogiri::HTML(open(url))


# Display output onto the screen
page.css('.h5.listing-name').each do |line|
  puts line.text
end

page.css('span.h3.price-amount').each do |line|
  puts line.text
end

page.css('div.text-muted.listing-location.text-truncate').each do |line|
  puts line.text
end
```



Puis dans le terminal : ```ruby airbnb_scraper.rb```

### How to Build a CSV Uploader into a Ruby on Rails Application

https://www.youtube.com/watch?v=W8pohTautj8

```
rails g scaffold Company name:string manager:string status:string terms:integer

rake db:create

rake db:migrate
```


```routes. rb```

```
resources :companies do
    collection { post :import }
end
```


```company_controller.rb```

```
def import
    Company.import(params[:file])
    redirect_to companies_path, notice: "Companies addes succesfully"
end
```


```Model company.rb```

```
class Company < ActiveRecord::Base

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Company.create! row.to_hash
     end
  end

end
```

```Views/index.html.erb```

```
<h3>Import Companies</h3>
<%= form_tag import_companies_path, multipart: true do %>
  <%= file_field_tag :file %>
  <%= submit_tag "Upload Companies" %>
<% end %>
```


```Config/application.rb```

```require 'csv'```




