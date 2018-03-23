var fs = require("fs");
var d3 = require("d3");

var data_text = fs.readFileSync("/dev/stdin", "utf-8").toString();
var data = d3.csvParse(data_text);

var extent = {
    lat: d3.extent(data, function(d) { return d.lat }),
    lon: d3.extent(data, function(d) { return d.lon })
};

console.log(JSON.stringify([[+extent.lat[0], +extent.lon[0]], [+extent.lat[1], +extent.lon[1]]]));
