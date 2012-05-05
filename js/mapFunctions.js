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
  dojo.require("esri.tasks.query");

  mapgame.map.init = function () {

    /*
    var mapOptions = {
      extent: new esri.geometry.Extent(-17.779189243, 32.151455282, 43.219845918, 3.928062948),
    };
    */

    mapgame.map.esriMap = new esri.Map("map"/*, mapOptions*/);

    if (!debug) {
        dojo.connect(mapgame.map.esriMap, "onLoad", function() {
            // need to disable everything else as well
            mapgame.map.esriMap.disablePan();
            mapgame.map.esriMap.hideZoomSlider();
        });
    }

    addDrawToolbar();

    addBasemap();

    // _.map(layers, function(layer))

    // initialize the geoprocessor here

  };

  function queryStopPoint(id) {
    //var query = new esri.tasks.QueryTask;
    // var queryTask = new esri.tasks.QueryTask("http://unseenuniversit/ArcGISServerInstance/rest/services/MainMap/MapServer");
  }

  function addDrawToolbar() {

    mapgame.map.draw = new esri.toolbars.Draw(mapgame.map.esriMap);

  }

  function addBasemap() {
    var basemapUrl = "http://unseenuniversit/ArcGISServerInstance/rest/services/MapWithPoints/MapServer";
    var basemap = new esri.layers.ArcGISDynamicMapServiceLayer(basemapUrl);

    //basemap.layerInfos[0].defaultVisibility = false;

    console.log(basemap.layerInfos);

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
