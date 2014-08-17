BootMap.Controller = function(){

}

BootMap.Controller.prototype = {

  osmInitializer: function(){
    var osm = {}
    return osm
  }
}

BootMap.Controller = function(){
}

BootMap.Controller.prototype = {
  newMap: function(){
    if ($("#map").length < 1) return;
    var newMap = new L.map('map')
    this.map = newMap
  },

  initializeMapData: function(startLat,startLong,startZoom){
    this.initialMapCoords = new L.LatLng(startLat,startLong)
    this.initialZoom = startZoom
  },

  initializeOSM: function(){
    var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});
    this.osm = osm
  },

  initializeMap: function(startLat,startLong,startZoom){
    this.newMap()
    this.initializeMapData(startLat,startLong,startZoom)
    this.initializeOSM()
  },

  fetchUsers: function(){
    var controller = this
    $.ajax({
      url: '/boots',
      type: 'get'
    }).done(function(data){
      controller.facilitateMarkers(data.boots)
    })
  },

  facilitateMarkers: function(serverData){
    var controller = this
    var bootList = controller.bootListFromJSON(serverData)
    controller.view.renderMarkers(bootList, controller.map)
    controller.view.renderStats(controller.masterRoster.uniqueLocationsCount)
  },

  bootListFromJSON: function(bootData){
    var controller = this
    controller.masterRoster = new BootMap.MasterRoster
    var bootList = controller.masterRoster.bootList
    for(var i=0; i<bootData.length; i++){
      var thisBoot = bootData[i]
      if(controller.validateLocation(thisBoot)){
        boot = new BootMap.Boot(thisBoot)
        bootList.push(boot)
      }
    }
    controller.generateUniqueLocations(bootList)
    return bootList
  },

  validateLocation: function(boot){
    if(boot.latitude && boot.longitude){
      return true
    }
  },

  generateUniqueLocations: function(bootList){
    var cityList = new BootMap.CityList
    cityList.populateUniqueCities(bootList)
    this.masterRoster.uniqueLocationsCount = cityList.uniqueCities.length
  }
}





