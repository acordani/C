##Scrapping

créer un nouveau fichier: wiki_scrapper.rb

require 'open-uri'
require 'nokogiri'

url = "https://en.wikipedia.org/wiki/List_of_current_NBA_team_rosters"
page = Nokogiri::HTML(open(url))

puts page