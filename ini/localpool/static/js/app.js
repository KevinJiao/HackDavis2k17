require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(Map, MapView){
  var map = new Map({
    basemap: "streets"
  });
  var view = new MapView({
    container: "viewDiv",  // Reference to the scene div created in step 5
    map: map,  // Reference to the map object created before the scene
    zoom: 15,  // Sets the zoom level based on level of detail (LOD)
    center: [-121.7617120, 38.5382320]  // Sets the center point of view in lon/lat
  });
});