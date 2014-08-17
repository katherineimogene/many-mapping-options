BootMap.City = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
  this.boots = []
}

BootMap.City.prototype = {
  addBoot: function(boot){
    this.boots.push(boot)
  },

  cityBootPopulation: function(){
    return this.boots.length
  }
}

BootMap.CityList = function(){
  this.uniqueCities = []
  this.cityLatitudes = []
}

BootMap.CityList.prototype = {
  populateUniqueCities: function(bootList){
    for(i=0; i<bootList.length; i++){
      var thisBoot = bootList[i]
      if(this.checkForCity(thisBoot.latitude) < 0){
        this.addToNewCity(thisBoot)
      } else {
        this.addToExistingCity(thisBoot)
      }
    }
  },

  checkForCity: function(cityLat){
    return this.cityLatitudes.indexOf(cityLat)
  },

  addToNewCity: function(thisBoot){
    newCity = new BootMap.City(thisBoot.current_location, thisBoot.latitude, thisBoot.longitude)
    newCity.addBoot(thisBoot)
    this.uniqueCities.push(newCity)
    this.cityLatitudes.push(newCity.latitude)
  },

  addToExistingCity: function(thisBoot){
   for(c=0; c<this.uniqueCities.length; c++){
    thisCity = this.uniqueCities[c]
    if(thisCity.latitude === thisBoot.latitude){
      thisCity.addBoot(thisBoot)
    }
  }
}

}