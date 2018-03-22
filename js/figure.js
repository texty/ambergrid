function figure() {

    var gridString // "101 000 111"
        , image
        , img_center
        , grid
        // , dx = 0.00543
        // , dy = 0.0033342
        , imageOffsetPc = {x: 0, y: 0}
        , blocksize_pc = 0.11111111
        , figureSize = {
            x: 3,
            y: 3
        }

        , designBlockSize = 1280 / 9
        , tileOriginalSize = 1000
        , tileDesignSize = 500
        
        , storage = {_onClick: function() {console.log("empty stub")}}
    ;
    
    function my(selection) {
        selection.each(function() {
            
            var backgroundSize_pc = tileDesignSize / (designBlockSize * figureSize.x);
            console.log(inpercents(backgroundSize_pc));
            
            
            var container = d3.select(this);

            container
                .style("width", inpercents(blocksize_pc * figureSize.x))
                .style("height", inpercents(blocksize_pc * figureSize.y))

                .append("div")
                .attr("class", "grid-wrapper")
                .style("background-image", "url('" + image + "')")
                .style("background-position", inpercents(imageOffsetPc.x) + " " + inpercents(imageOffsetPc.y))
                .style("background-size", inpercents(backgroundSize_pc))

                .selectAll("div.elementary-block")
                .data(grid)
                .enter()
                .append("div")
                .attr("class", "elementary-block")
                .classed("opaque", function(d) {return d})
                .classed("transparent", function(d) {return !d})
                .style("width", inpercents(1/figureSize.x))
                .style("padding-bottom", inpercents(1/figureSize.x))
                .attr("title", "Клікніть щоб дивитись карту");

            container
                .selectAll(".elementary-block.transparent")
                .on("click", function() {storage._onClick()});
            
            my.getBackgroundSize_pc = function() {
                return backgroundSize_pc;
            };
        });
    }

    my.image = function (value) {
        if (!arguments.length) return image;
        setImage(value);
        return my
    };

    function setImage(value) {
        image = value;
        img_center = image.replace(/^.*[\\\/]/, '').split("_").slice(0, 2).map(toNumber);
        return my;
    }

    my.imageOffsetPc = function (value) {
        if (!arguments.length) return imageOffsetPc;
        imageOffsetPc = value;
        return my
    };

    my.gridString = function (value) {
        if (!arguments.length) return gridString;
        setGridString(value);
        return my;
    };
    
    function setGridString(value) {
        gridString = value;
        grid = gridString.replace(/\s/g, "").split("").slice(0, figureSize.x * figureSize.y).map(toNumber);
    }

    my.figureSize = function (value) {
        if (!arguments.length) return figureSize;
        figureSize = value;
        return my;
    };

    my.onClick = function (value) {
        if (!arguments.length) return storage._onClick;
        storage._onClick = value;
        return my;
    };

    function toNumber(v) {return +v}

    function inpx(value) {
        return "" + value + "px";
    }

    function inpercents(value) {
        return "" + value * 100 + "%";
    }

    return my;
}

