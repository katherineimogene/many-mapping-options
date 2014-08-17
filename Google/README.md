## Using the Google Maps API
https://developers.google.com/maps/documentation/javascript/tutorial

### Key files
#### layout.erb
Include Google Maps API
```html
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false">
```
Required div in order for map to display
```html
  <div id="map-canvas"></div>
```
#### application.js
This isn't object-oriented or MVC, it's soupy functional JS. 

Use HTML5 geolocation to get current location. user must allow access.  callback is initialization method

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

initialize function:

Using google.maps objects:

* LatLng 
* Map 

And events

* addDomListener

placeMarker function: 

Using google.maps objects:

* Marker 
* Animation

https://developers.google.com/maps/documentation/javascript/examples/marker-animations

neither the initialize or placeMarker functions are namespaced or scoped. This is not great.


#### application.css
default div height is 0px, if we want our map to display we need to give it a height.
```css
#map-canvas {
  height: 720px;
  width: 80%;
  border: 1px solid #ccc;
  margin: 0 auto;
}
```