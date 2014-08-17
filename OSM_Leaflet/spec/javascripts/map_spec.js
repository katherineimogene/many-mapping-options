returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe("NameSpace", function(){
  it("is defined", function(){
    expect(BootMap).toBeDefined()
  }),

  it("has a controller constructor function", function(){
    expect(BootMap.Controller).toBeDefined()
  }),

  it("has a view constructor function", function(){
    expect(BootMap.View).toBeDefined()
  })
})

describe("Controller", function(){
  beforeEach(function(){
    mapStub = {}
    osmStub = {}
    BootMap.Controller.prototype = {
      newMap: function(){
        var map = {}
        return map
      },
      initializeOSM: function(){
        var osm = {}
        return osm
      }
    }
    controller = new BootMap.Controller
  })

  it("has a new map function", function(){
    expect(controller.newMap()).toBeDefined()
  }),

  it("creates a new map object", function(){
    expect(returnTypeOf(controller.newMap())).toBe(returnTypeOf(mapStub))
  }),

  it("initializes an OpenStreetMap layer", function(){
    expect(returnTypeOf(controller.initializeOSM())).toBe(returnTypeOf(osmStub))
  })

})

describe("View", function(){
  beforeEach(function(){
    this.view = new BootMap.View(true);
    this.mapObject = true;
    this.osm = true;
    BootMap.View.prototype = {
      drawMap: function(){
        var drawnMap = {}
        return drawnMap
      }
    }
  })

  it("it has a controller",function(){
    expect(this.view.controller).toBeTruthy()
  }),

  it("draws a map", function(){
    expect(this.view.drawMap()).toBeDefined()
  })
})