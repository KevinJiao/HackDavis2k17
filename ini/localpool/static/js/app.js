require([
        "esri/Map",
        "esri/views/MapView",
        "esri/geometry/Point",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/tasks/RouteTask",
        "esri/tasks/support/RouteParameters",
        "esri/tasks/support/FeatureSet",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/core/urlUtils",
        "dojo/on",
        "dojo/domReady!"
], function(
    Map, MapView, Point, Graphic, GraphicsLayer, RouteTask, RouteParameters,
    FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol, Color, urlUtils, on
    ) {

    //urlUtils.addProxyRule({
    //    urlPrefix: "route.arcgis.com",
    //    proxyUrl: "/sproxy/"
    //});


    var routeTask = new RouteTask({
        url: "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
    });

    var routeLyr = new GraphicsLayer();

    var routeParams = new RouteParameters({
        stops: new FeatureSet(),
        outSpatialReference: { // autocasts as new SpatialReference()
        wkid: 3857
    }
    });

    var routeSymbol = new SimpleLineSymbol({
        color: [0, 0, 255, 0.5],
        width: 5
    })

    var map = new Map({
        basemap: "streets",
        layers: [routeLyr],
    });

    var view = new MapView({
        container: "viewDiv",  // Reference to the scene div created in step 5
        map: map,  // Reference to the map object created before the scene
        zoom: 15,  // Sets the zoom level based on level of detail (LOD)
        center: [-121.7617120, 38.5382320]  // Sets the center point of view in lon/lat
    });

    on(view, "click", addStop);

    var stopSymbol = new SimpleMarkerSymbol({
        style: "cross",
        size: 15,
        outline: { width: 4}
    });

    stops = getStops();

    function addStop(event) {
        // Add a point at the location of the map click
        var stop = new Graphic({
            geometry: event.mapPoint,
            symbol: stopSymbol
        });
        routeLyr.add(stop);
        stops.push([event.mapPoint.latitude, event.mapPoint.longitude]);
        saveStops();
        stops = getStops();
        if (stops.length % 2 == 0) {
            start = stops[stops.length - 2];
            end = stops[stops.length - 1];
            startPoint = new Point({latitude: start[0], longitude: start[1]});
            endPoint = new Point({latitude: end[0], longitude: end[1]});
            startGraphic = new Graphic({geometry: startPoint, symbol: stopSymbol});
            endGraphic = new Graphic({geometry: endPoint, symbol: endPoint});
            // convert stop Point object to Graphic Object
            routeParams.stops.features = [startGraphic, endGraphic];
            routeTask.solve(routeParams).then(showRoute);
        }
    }

    function showRoute(data) {
        var routeResult = data.routeResults[0].route;
        routeResult.symbol = routeSymbol;
        routeLyr.add(routeResult);
    }

    function saveStops(){
        localStorage.setItem("stops", JSON.stringify(stops));
    }

    function getStops(){
        stops = JSON.parse(localStorage.getItem("stops"));
        if (stops === null){
            return [];
        }
        return stops;
    }
});
