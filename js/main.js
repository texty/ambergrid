
setUpFigure("#figure1", {
    figureSize: {x: 3, y: 2},
    gridString: "101 000",
    hullString: "0,2 0,1 1,1 1,0 2,0 2,1 3,1 3,2 0,2",
    image: 'selected/51.325369_26.900646999999996_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0, y: 0}
});

setUpFigure("#figure2", {
    figureSize: {x: 2, y: 3},
    gridString: "00 01 01",
    hullString: "0,0 2,0 2,1 1,1 1,3 0,3 0,0",
    image: 'selected/51.496603_26.354936_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.1, y: 0.2}
});

setUpFigure("#figure3", {
    figureSize: {x: 3, y: 2},
    gridString: "001 100",
    hullString: "0,0 2,0 2,1 3,1 3,2 1,2 1,1 0,1 0,0",
    image: 'selected/51.564878_26.512397999999997_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

d3.select("#finalmap").call(finalmap());



function setUpFigure(selector, options) {
    var res = {};

    res.figure = figure()
            .figureSize(options.figureSize)
            .gridString(options.gridString)
            .image(options.image)
            .imageOffsetPc(options.imageOffsetPc);

    d3.select(selector).call(res.figure);

    res.map = map()
            .hullString(options.hullString)
            .image(options.image)
            .imageOffsetPc(options.imageOffsetPc)
            .backgroundSize_pc(res.figure.getBackgroundSize_pc());

    d3.select(selector).call(res.map);

    res.figure.onClick(res.map.showMap);

    return res;
}


