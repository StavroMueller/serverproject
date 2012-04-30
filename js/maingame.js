
(function () {
  dojo.require("esri.map");

  function init() {
    var basemapUrl = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer";
    var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapUrl);
    var map = new esri.Map("map");

    map.addLayer(basemap);
  }

  dojo.addOnLoad(init);

})()
