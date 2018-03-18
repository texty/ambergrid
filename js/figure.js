function figure() {

    var gridString // "101 000 111"
        , hullString // "0,2 0,1 1,1 1,0 2,0 2,1 3,1 3,2 0,2"
        , hull
        , image
        , fname
        , img_center
        , grid
        // , dx = 0.00543
        // , dy = 0.0033342
        , imgsize = 1000
        , imageOffset = {x: 0, y: 0}
        , blocksize = 120
        , figureSize = {
            x: 3,
            y: 3
        }
    ;
    
    var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
    
    
    function my(selection) {
        selection.each(function() {

            var container = d3.select(this);

            container
                .style("width", inpx(blocksize * figureSize.x))
                .style("height", inpx(blocksize * figureSize.y))

                .append("div")
                .attr("class", "grid-wrapper")
                .style("background-image", "url('" + image + "')")
                .style("background-position", imageOffset.x + "px " + imageOffset.y + "px")

                .selectAll("div.elementary-block")
                .data(grid)
                .enter()
                .append("div")
                .attr("class", "elementary-block")
                .classed("opaque", function(d) {return d})
                .classed("transparent", function(d) {return !d})
                .style("width", inpx(blocksize))
                .style("height", inpx(blocksize));

            var map_container = container
                .append("div")
                .attr("class", "map transparent")
                .attr("id", "map-" + fname)
                .classed("hidden", true);
            
            container
                .selectAll(".elementary-block.transparent")
                .on("click", function() {
                    console.log("click");
                    showMap();
                });

            function showMap() {
                map_container.classed("hidden", false);

                var rect = container.node().getBoundingClientRect();

                // для початку створимо карту, центруємо по центру картинки, просто щоб приблизно переміститись на ту територію
                // і вирахувати точні ширини тайла в градусах для конкретної місцевості

                window.map = L.map('map-' + fname, {
                    // zoomSnap: 0.5
                }).setView(img_center, 18, true);


                // розмір половини картинки в градусах
                var half_img = coord_diff(map.containerPointToLatLng([imgsize/2, imgsize/2]), map.containerPointToLatLng([0, 0]));

                // jquery рахує правильно, на відміну від простих нативних способів

                var newx = img_center[1] + ($(window).width() / 2 - (rect.left + imgsize/2 + imageOffset.x)) / imgsize * (half_img.lng*2);
                var newy = img_center[0] + ($(window).height() / 2 - (rect.top + imgsize/2 + imageOffset.y)) / imgsize * (half_img.lat*2);

                // тепер поставимо правильні кординати центру екрана
                map.setView([newy,  newx], 18, true);
                var bingLayer = L.tileLayer.bing(BING_KEY).addTo(map);

                var one_px_lng = half_img.lng / (imgsize / 2);
                var one_px_lat = half_img.lat / (imgsize / 2);

                var fig_corner_c = {
                    lng: (imageOffset.x + imgsize / 2) * one_px_lng,
                    lat: (imageOffset.y + imgsize / 2) * one_px_lat
                };

                // це Geojson слой для контуру фігури на карті

                var geojson_data = geojsonHull(
                    img_center[1] - fig_corner_c.lng,
                    img_center[0] - fig_corner_c.lat,
                    blocksize * one_px_lng,
                    blocksize * one_px_lat);

                L.geoJSON(geojson_data, {
                    style: {
                        color: "yellow",
                        opacity: 1,
                        weight: 1,
                        fillColor: "white",
                        fillOpacity: 0
                    }
                }).addTo(map);

                map.on('zoomstart', function() { map_container.classed("transparent", false)});
                map.on('dragstart', function() { map_container.classed("transparent", false)});
            }
        });
    }

    my.image = function (value) {
        if (!arguments.length) return image;
        setImage(value);
        return my
    };

    function setImage(value) {
        image = value;
        img_center = image.replace(/^.*[\\\/]/, '').split("_").slice(0, 2).map(toInt);
        return my;
    }

    my.imageOffset = function (value) {
        if (!arguments.length) return imageOffset;
        imageOffset = value;
        return my
    };

    my.gridString = function (value) {
        if (!arguments.length) return gridString;
        setGridString(value);
        return my;
    };
    
    function setGridString(value) {
        gridString = value;
        grid = gridString.replace(/\s/g, "").split("").slice(0, figureSize.x * figureSize.y).map(toInt);
    }

    my.hullString = function (value) {
        if (!arguments.length) return hullString;
        setHullString(value);
        return my;
    };

    function setHullString(value) {
        hullString = value;
        hull = hullString.split(/\s+/).map(function(pair) {
            pair = pair.split(",");
            return {x: +pair[0], y: +pair[1]}; 
        });
    }

    my.figureSize = function (value) {
        if (!arguments.length) return figureSize;
        figureSize = value;
        return my;
    };
    
    my.fname = function (value) {
        if (!arguments.length) return fname;
        fname = value;
        return my;
    };


    function coord_diff(c1, c2) {
        return {
            lat: c1.lat - c2.lat,
            lng: c1.lng - c2. lng
        }
    }

    function toInt(v) {return +v}

    // function geojson_square(left, top, w, h) {
    //     return [[[left, top], [left + w, top], [left + w, top + h], [left, top + h]]]
    // }
    //
    // function geojsonFigure(left, top, block_w, block_h) {
    //     var polygons = [];
    //     for (var i = 0; i < figureSize.y; i++)
    //         for (var j = 0; j < figureSize.x; j++)
    //             polygons.push({y: i, x: j});
    //
    //     var polygons_coords = polygons
    //         .filter(function(p, i){ return grid[i] == 0})
    //         .map(function(p, i) {
    //             return {
    //                 left: left + block_w * p.x,
    //                 top: top + block_h * p.y
    //             }
    //         });
    //
    //     return {
    //         type: "Feature",
    //         geometry: {
    //             type: "MultiPolygon",
    //             coordinates: polygons_coords.map(function(pc){
    //                 return geojson_square(pc.left, pc.top, block_w, block_h)
    //             })
    //         }
    //     };
    // }

    function geojsonHull(left, top, block_w, block_h) {
        var points = hull.map(function(p) {
            return [left + block_w * p.x, top + block_h * p.y];
        });

        return {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [[points]]
            }
        }
    }

    function inpx(value) {
        return "" + value + "px";
    }

    return my;
}

