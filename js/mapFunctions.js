// All content (c) Julien Clifford. Do not use without permission.

// Everything in here is pretty abstracted, in case a new API and map server are used.
// Initialize the main object
var debug = true;
var mapgame = { 
  init: null, 
  map:{ 
    locations: {},
  }, 
};

(function () {
  dojo.require("esri.map");
  dojo.require("esri.toolbars.draw");

  mapgame.map.init = function () {
    mapgame.map.esriMap = new esri.Map("map");

    if (!debug) {
        dojo.connect(mapgame.map.esriMap, "onLoad", function() {
            // need to disable everything else as well
            mapgame.map.esriMap.disablePan();
            mapgame.map.esriMap.hideZoomSlider();
        });
    }

    addDrawToolbar();

    addBasemap();

    // initialize the geoprocessor here

  };

  function addDrawToolbar() {

    mapgame.map.draw = new esri.toolbar.Draw(mapgame.map.esriMap);

  }

  function addBasemap() {
    var basemapUrl = "http://unseenuniversit/ArcGISServerInstance/rest/services/Madagascar/MapServer";
    var basemap = new esri.layers.ArcGISDynamicMapServiceLayer(basemapUrl);

    mapgame.map.esriMap.addLayer(basemap);
  }

  mapgame.map.locations.init = function () {
    // some placeholder for the init locations function.
    // I'm thinking here will be a list of locations for
    // the potential explorer - a set of real points on the map for the person to explore. 
    // Thing is, I'm wondering which attributes to give there - I don't know 
  };

  mapgame.init = function () {
    mapgame.map.init();
    mapgame.game.init();
  };


})()
