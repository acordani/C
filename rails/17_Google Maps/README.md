###Google MAps

Créer un nouveau projet dans dev.google

Puis aller chercher l'API de geocoding:
Google Maps Geocoding API

Activer l'API

Puis aller dans Credentials ou Idendifiant(fr)
Puis aller dans API Key ou Clé de l'API(fr)
PUis on va dans serveur key ou Clé de Serveur
ENsuite, il nous demande si on veut eventuellement restreindre cette clé à certaines IP sur le reseau internet?
On pourra le faire uniquement si on connait notre IP de notre serveur . Là comme c'est une Ip d'un serveur Heroku et qu'on ne la connait pas, on ne le fait pas .
Si on utilise figaro, pas de souci

On clic sur create.





------------------------------------------------------------------------
###Auto complete

Créer un fichier: ```Assets/javascripts/autocomplete.js```

```
$(document).ready(function() {

   var onPlaceChanged = function() {
    console.log("Place changed");
    }

  function initializeAutocomplete(id) {
    var element = document.getElementById(id);
    if (element) {
      var autocomplete = new google.maps.places.Autocomplete(element, { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
    }
  }



  google.maps.event.addDomListener(window, 'load', function() {
    initializeAutocomplete('user_input_autocomplete_address');
  });
});
```


Dans le formulaire à l'endroit ou il doit y avoir l'autocomplete, ajouter:

```
        <div class="row">
          <fieldset>
            <div class="form-group">
              <label class="control-label">Address</label><br>
              <input id="user_input_autocomplete_address" name="address" class="form-control" placeholder="What is your address?">
            </div>
          </fieldset>
        </div>
````

Puis aller dans ```https://console.developers.google.com```

Aller dans le projet, activer une Google Maps JavaScript API ey Google Maps Geocoding API

Puis aller ds Identifiant:

Créer une clé serveur et la mettre dans ```Config/appalication.yml```

GOOGLE_API_KEY: AIz

Pusher sur Heroku : figaro heroku:set -e production

Puis, créer une clé Browser et la mettre dans Views/layout/application.html.erb

Inserer juste après ```<%= yield %>```
```
    <script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBwfMOrUhpkgF">
    </script>
```
En remplacant apres &key par la nouvelle clé browser


Pour avoir un cercle sur la map:
```
<% content_for(:after_js) do %>
  <%= javascript_tag do %>
    $(document).on('ready', function() {
      circle = [{lng: <%= @user.longitude %>, lat: <%= @user.latitude %>, radius: 200}]
      circle_options = { strokeColor:"#FECC1F",strokeOpacity: 1, strokeWeight: 3, fillColor: 'transparent' }
      handler = Gmaps.build('Google');
      handler.buildMap({ internal: { id: 'map' } }, function(){
        markers = handler.addMarkers(<%= raw @markers.to_json %>);
        handler.addCircles(circle, circle_options);
        handler.getMap().setOptions({ scrollwheel: false });
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
        handler.getMap().setZoom(14);
      });
    })
  <% end %>
<% end %>
```


Si on veut avoir une map qui s'ouvre sur un clic de lien:

```
$('a#openMap').bind('click',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active').html('<span class="icon-map2"></span> Voir la carte');
                $('div#containerMap').animate({height:"0px"},1000);
            }else{
                $(this).addClass('active').html('<span class="icon-map2"></span> Fermer la carte');
                $('div#containerMap').animate({height:"300px"},1000);
            }
            
            
            return false;
        });
````

   Le lien est un lien a avec une id openMap:
   
```
   <li><a href="#" id="openMap"><span class="icon-map2"></span> Voir la carte</a></li>
```


Pour Trouver l'id_place d'une entreprise, 
il faut aller sur:
```
https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder?hl=fr
```

Et puis ensuite pour récupérer le json, on fait:

```
https://maps.googleapis.com/maps/api/place/details/json?placeid=remplacer_par_id_place&key=remplacer_par_votre_APIKEy
```
