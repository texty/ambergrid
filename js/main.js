
setUpFigure("#figure1", {
    figureSize: {x: 3, y: 2},
    gridString: "101 000",
    hullString: "0,2 0,1 1,1 1,0 2,0 2,1 3,1 3,2 0,2",
    image: '52.23236250000002_24.41434000000001_23_Jul_2015_GMT.jpg',
    imageOffset: {x: 0, y: 0}
});

setUpFigure("#figure2", {
    figureSize: {x: 2, y: 3},
    gridString: "00 01 01",
    hullString: "0,0 2,0 2,1 1,1 1,3 0,3 0,0",
    image: '52.23236250000002_24.72928000000004_11_Oct_2014_GMT.jpg',
    imageOffset: {x: -180, y: -2}
});

setUpFigure("#figure3", {
    figureSize: {x: 3, y: 2},
    gridString: "001 100",
    hullString: "0,0 2,0 2,1 3,1 3,2 1,2 1,1 0,1 0,0",
    image: '52.23236250000002_25.576360000000115_11_Oct_2014_GMT.jpg',
    imageOffset: {x: -100, y: -32}
});


function setUpFigure(selector, options) {
    var res = {
        figure: figure()
            .figureSize(options.figureSize)
            .gridString(options.gridString)
            .image(options.image)
            .imageOffset(options.imageOffset),

        map: map()
            .hullString(options.hullString)
            .image(options.image)
            .imageOffset(options.imageOffset)
    };

    res.figure.onClick(function() {res.map.showMap()});

    d3.select(selector)
        .call(res.figure)
        .call(res.map);

    return res;
}