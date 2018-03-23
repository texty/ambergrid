var args = process.argv.slice(2);

var multiplier = args[0] || 1.0;

var fs = require("fs");
var d3 = require("d3");

var dx = 0.00543 * multiplier;
var dy = 0.0033342 * multiplier;

var data_text = fs.readFileSync("/dev/stdin", "utf-8").toString();
var data = d3.csvParse(data_text);

var extent = {
    lat: d3.extent(data, function(d) { return d.lat }),
    lon: d3.extent(data, function(d) { return d.lon })
};
//
// console.log((+extent.lat[0] + (+extent.lat[1])) /2);
// console.log((+extent.lon[0] + (+extent.lon[1])) /2);

var lon_min = extent.lon[0] - dx/2;
var lon_max = extent.lon[1] + dx/2;

var lat_min = extent.lat[0] - dy/2;
var lat_max = extent.lat[1] + dy/2;


/////////////////////////////
// проекції туди і назад
// координати центра квадрата
var toDeg = function(input) {
    return [lon_min + dx/2 + input.x * dx, lat_min + dy/2 + input.y * dy]
};

var toIndex = function(input) {
    return {x: Math.floor((input.lon - lon_min) / dx), y: Math.floor((input.lat - lat_min) / dy)}
};
/////////////////

var squares = data.map(toIndex);

var grouped = d3.nest()
    .key(function(d) { return JSON.stringify(d) })
    .rollup(function(leaves) { return leaves.length; })
    .entries(squares)
    .map(function(d) { d.count = d.value; delete d.value; return d });

var polygons = grouped.map(function(d){
    var c = toDeg(JSON.parse(d.key));

    return {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [c[0] - dx/2, c[1] - dy/2], [c[0] + dx/2, c[1] - dy/2],
                    [c[0] + dx/2, c[1] + dy/2], [c[0] - dx/2, c[1] + dy/2],
                    [c[0] - dx/2, c[1] - dy/2]
                ]
            ]
        },
        properties: {
            count: d.count
        }
    }
});

process.stdout.write(JSON.stringify(polygons));


