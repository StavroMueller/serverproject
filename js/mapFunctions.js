// Initialize the main object
var debug = true;
var mapgame = { map:{}, };

(function () {
  dojo.require("esri.map");

  mapgame.map.init = function () {
    var basemapUrl = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer";
    var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapUrl);
    mapgame.map.esriMap = new esri.Map("map");

    if (!debug) {
        dojo.connect(mapgame.map.esriMap, "onLoad", function() {
            // need to disable everything else as well
            mapgame.map.esriMap.disablePan();
            mapgame.map.esriMap.hideZoomSlider();
        });
    }

    mapgame.map.esriMap.addLayer(basemap);
  };

  dojo.addOnLoad(mapgame.map.init);

})()
