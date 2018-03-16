var f1 = figure()
    .fname("1")
    .figureSize({x: 3, y: 2})
    .gridString("101 000")
    .image('52.23236250000002_24.41434000000001_23_Jul_2015_GMT.jpg')
    .imageOffset({x: -500, y: -222});

var f2 = figure()
    .fname("2")
    .figureSize({x: 2, y: 3})
    .gridString("00 01 01")
    .image('52.23236250000002_24.72928000000004_11_Oct_2014_GMT.jpg')
    .imageOffset({x: -180, y: -2});

var f3 = figure()
    .fname("3")
    .figureSize({x: 3, y: 2})
    .gridString("001 100")
    .image('52.23236250000002_25.576360000000115_11_Oct_2014_GMT.jpg')
    .imageOffset({x: -100, y: -32});

d3.select("#figure1").call(f1);
d3.select("#figure2").call(f2);
d3.select("#figure3").call(f3);





