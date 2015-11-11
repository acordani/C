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
Auto complete

Créer un fichier: Assets/javascripts/autocomplete.js


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


Dans le formulaire à l'endroit ou il doit y avoir l'autocomplete, ajouter:


        <div class="row">
          <fieldset>
            <div class="form-group">
              <label class="control-label">Address</label><br>
              <input id="user_input_autocomplete_address" name="address" class="form-control" placeholder="What is your address?">
            </div>
          </fieldset>
        </div>

Puis aller dans https://console.developers.google.com

Aller dans le projet, activer une Google Maps JavaScript API

Puis aller ds Identifiant:

Créer une clé serveur et la mettre dans Config/appalication.yml

GOOGLE_API_KEY: AIz

Pusher sur Heroku : figaro heroku:set -e production

Puis, créer une clé Browser et la mettre dans Views/layout/application.html.erb

Inserer <!-- Include Google Maps JS API -->
    <script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBwfMOrUhpkgF">

En remplacant apres &key par la nouvelle clé browser





