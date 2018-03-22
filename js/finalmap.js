function finalmap() {

    var
        map
        ;

    var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';

    function my(selection) {

        selection.each(function() {

            var container = d3.select(this);
            
            d3.queue()
                .defer(d3.csv, "coordinates.csv")
                .defer(d3.json, "process/squares.geojson")
                .await(function(err, points, polygons) {
                    if (err) throw err;
    
                    console.log(points);
                    console.log(polygons);

                    map = L.map(container.node(), {
                        // trackResize: true
                        // zoomSnap: 0.01
                        minZoom: 6
                    });
    
    
                    var bingLayer = L.tileLayer.bing(BING_KEY, {minZoom: 13});
                    // bingLayer.setMinZoom(13);
                    bingLayer.addTo(map);
                    L.tileLayer('http://{s}.texty.org.ua/maps/w3/{z}/{x}/{y}.png', {
                        maxZoom: 12
                    }).addTo(map);
    
                    map.setView([51.081851400000005, 27.3154423], 8, true);
    
                    var geojsondata = points.map(function(d) {
                       return {
                           type: "Feature",
                           geometry: {
                               type: "Point",
                               coordinates: [d.lon, d.lat]
                           }
                       }
                    });

                    var polygons_layer = L.geoJSON(polygons, {

                        style: {
                                // radius: 1,
                                fillColor: "black" ,
                                color: "yellow",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.3,
                                stroke: 1
                        }

                        // pointToLayer: function (feature, latlng) {
                        //     return L.circleMarker(latlng);
                        // }
                    });

                    polygons_layer.addTo(map);


//                     var points_layer = L.geoJSON(geojsondata, {
//
//                         style: function (feature) {
//                             return {
//                                 radius: 1,
//                                 fillColor: "white" ,
//                                 color: "#000",
//                                 weight: 1,
//                                 opacity: 1,
//                                 fillOpacity: 1,
//                                 stroke: 0
//                             };
//                         },
//
//                         pointToLayer: function (feature, latlng) {
//                             return L.circleMarker(latlng);
//                         }
//                     });
//
//                     points_layer.addTo(map);

                    // new L.StamenTileLayer("terrain-labels").addTo(map);
                    // new L.StamenTileLayer("terrain-labels").addTo(map);
                });


        });
    }

    return my;
}

