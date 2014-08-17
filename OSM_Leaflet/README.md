# BootMap

http://bootmap.herokuapp.com/

BootMap is a visual representation of Dev Bootcamp humans around the world.  I completed this work originally as a part of my final project at Dev Bootcamp, [DBC Connect](http://dbcconnect.herokuapp.com/). Access to DBC Connect is restricted to DBC humans; if this pertains to you please feel free to visit and use the application. 

#### Open Source, Open Data
BootMap uses open source and open data mapping software, [OpenStreetMap](http://www.openstreetmap.org/). On top of this, I implement [Leaflet](leafletjs.com), an open-source JavaScript library for mobile-friendly interactive maps, to facilitate the visual representation of boots.

#### How BootMap works, basically
I hit our database with a single Ajax request on page load. The response is a JSON object of all boots, which I then manipulate to render on the map. Check out the nice JavaScript MVC I wrote to create the map and display the boots. It's in <code>app/assets/javascripts/</code>.

#### Backend
BootMap runs on Ruby on Rails.  One table, boots, stores information about all DBC humans (henceforth called 'boots').  Data about all boots is pulled from the DBC API. After validation I use the geocoder gem to generate latitude and longitude based on the boot's entry for current_location. This is the only data manipulation done on the backend.

#### DBC API
The [DBC API](http://developer.devbootcamp.com/) requires an API key which you main obtain by logging in with your Socrates credentials. I've stored this key in a yaml file not tracked by Git. Check out <code>config/initializers/environment_variables.rb</code> for an example of how this works. Be sure to include the yaml file in <code>.gitignore</code>.

#### Geocoder
The [Geocoder](https://github.com/alexreisner/geocoder) documentation is quite good. 

I've configured Geocoder to use [ESRI](https://developers.arcgis.com/en/) rather than the default, Google, because the rate limit is higher and the geocoding performance equal.
```ruby
## config/initializers/geocoder.rb

Geocoder.configure({lookup: :esri, timeout: 15})
```
Using Geocoder is simple. The conditionals checking for test environment and update to current_location are not required, but limit unnecessary hits to the ESRI API.
```ruby
## app/models/boot.rb 

geocoded_by :current_location
  unless Rails.env.test?
    after_validation :geocode,
    :if => lambda{ |user| user.current_location_changed? }
  end
```
#### Tests
Rspec controller tests for the two routes: ***index***, which is the root, and ***boots***, which renders a JSON object of all boots in the database.  To run the tests:

1. Prepare the test database:
```ruby
rake db:test:prepare
```
2. Run rspec:
```ruby
rspec
```

Jasmine tests for the most basic JavaScript components: namespace, controller, and view. Check out the ***tdd-map*** branch to see how these features were TDD-ed.  Unfortunately, Jasmine and Leaflet do not place nicely together, and so there are no meaninful tests of functions involving Leaflet. You will notice, in <code>specs/javascripts/map-spec.js</code> that there are before blocks before each test that create the functions the tests are testing. This is really rather silly.*

Jasmine is configured for the app according to [these installation instructions](https://github.com/searls/jasmine-rails#installation). 

To run the tests:
visit <code>localhost:3000/specs</code> (or whichever port you're using)

*An extremely non-silly discovery: Jasmine relies on a file called <code>boot.js</code> which defines <code>describe</code>, <code>it</code>, etc, all of the functions and syntax we use to write Jasmine tests. At one point in development I had a file aptly named <code>boot.js</code> which contained the Boot model. My file was overriding the one required by Jasmine, and it broke all of the things. So, lesson: don't name your JavaScript files boot.js if you'll be using Jasmine.
