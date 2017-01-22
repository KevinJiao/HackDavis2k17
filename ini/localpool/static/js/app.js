require([
        "esri/Map",
        "esri/views/MapView",
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
    Map, MapView, Graphic, GraphicsLayer, RouteTask, RouteParameters,
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

    function addStop(event) {
        // Add a point at the location of the map click
        console.log(event);
        var stop = new Graphic({
            geometry: event.mapPoint,
            symbol: stopSymbol
        });
        routeLyr.add(stop);

        routeParams.stops.features.push(stop);
        if (routeParams.stops.features.length >= 2) {
            routeTask.solve(routeParams).then(showRoute);
        }
    }

    function showRoute(data) {
        var routeResult = data.routeResults[0].route;
        routeResult.symbol = routeSymbol;
        routeLyr.add(routeResult);
    }
});
