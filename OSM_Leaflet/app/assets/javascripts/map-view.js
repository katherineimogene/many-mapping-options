BootMap.View = function(controller){
  this.controller = controller
}

BootMap.View.prototype = {
  // setView is a Leaflet function
  drawMap: function(){
    var controller = this.controller
    var thisMap = controller.map
    if (!thisMap) return;
    var map = thisMap.setView(controller.initialMapCoords,controller.initialZoom)
    map.addLayer(controller.osm)
  },

  // addLayer is a Leaflet function
  renderMarkers: function(bootList, map){
    var map = map
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<bootList.length; i++){
        var lat=bootList[i].latitude
        var long=bootList[i].longitude
        var marker = L.marker([lat,long])
        var content = this.formatPopup(bootList[i])
        this.bindThisPopup(marker,content)
        markers.addLayer(marker)
    }
    map.addLayer(markers)
  },

  renderStats: function(cityCount){
    var newDiv = document.createElement('div')
    newDiv.classList.add('boot-stats')
    newDiv.innerText = this.setStatDivText(cityCount)
    document.getElementById('map').appendChild(newDiv)
  },

  setStatDivText: function(cityCount){
    var divText = "BootMap: find Dev Bootcamp humans in " + cityCount + " cities around the world"
    return divText
  },

  //bindPopup and openPopup are leaflet fns
  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatPopup: function(boot){
    var thisBoot = {
      name: boot.name,
      socialLinks: [
        { url: boot.github_profile_link,     icon: 'fa fa-github fa-lg'},
        { url: boot.twitter_profile_link,    icon: 'fa fa-twitter fa-lg'},
        { url: boot.facebook_profile_link,   icon: 'fa fa-facebook fa-lg'},
        { url: boot.linked_in_profile_link,  icon: 'fa fa-linkedin fa-lg'},
        { url: boot.blog_link,               icon: 'fa fa-tumblr fa-lg'}
        ]
    }

    var bootNameTemplate = "<div class='boot-name'>{{name}}</div>";
    var bootNameHtml = Mustache.to_html(bootNameTemplate, thisBoot);

    var socialMedia = "<ul class='social-media'>{{#socialLinks}}<li class='social-link'><a href='{{url}}' target='_blank'><i i class='{{icon}}'></i></a></li>{{/socialLinks}}</ul>";
    var bootSocialMediaHtml = Mustache.to_html(socialMedia, thisBoot);

    var bootPopupContent = [
                    "<div class='user-popup'>",
                    bootNameHtml,
                    bootSocialMediaHtml,
                    boot.current_location,
                    "</div>"
                  ]
    return bootPopupContent.join("")
  }

}


