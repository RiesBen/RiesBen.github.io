/**
 * Created by benjamin on 4/1/17.
 */

function newLayer(node, root_rectangle,  width, height, x_offset, y_offset) {
    var children = node["children"];
    var margin_height = 0.05 * root_rectangle.attr("height");
    var margin_width = 0.03 * root_rectangle.attr("width");
    var layer_height = height- margin_height; //root_rectangle.attr("height")
    var layer_width = width - margin_width; //root_rectangle.attr("width")

    var it = 0;
    var x_it = 0;
    var y_it = 0;

    for (it = 0; it < children.length; it++) {
        var child = children[it];

        if (width > height) {
            layer_width = (root_rectangle.attr("width") / children.length)-margin_width;
            x_it = it;
        }
        else {
            layer_height = (root_rectangle.attr("height") / children.length)-margin_height;
            y_it = it;
        }

        var y = y_it* layer_height+ 0.5*margin_height+y_offset;
        var x = x_it * layer_width+ 0.5*margin_width+x_offset;

        var rect = root_rectangle.append("rect")
            .attr("id", child["name"])
            .attr("x", x)
            .attr("y", y)
            .attr("width", layer_width)
            .attr("height", layer_height)
            .attr("fill", color[it])
            .attr("stroke-width", "2")
            .attr("stroke", "black");

        var text = root_rectangle.append("text")
            .attr("id", "text")
            .attr("x", x+ 0.03* layer_width)
            .attr("y", y + 0.07* layer_height)
            .text(child["name"])
            .attr("font-size", "18px")
            .attr("fill", "white");

        console.log(text)
        console.log(child["name"]);
        console.log( x);
        console.log( y);

        if (child["children"]) {
            newLayer(child, svg, layer_width, layer_height, x, y + 0.07* layer_height);
        }
    }
}


//var svg = d3.select("svg");
var box = document.getElementById('graph'),
    width = 0.9 * box.clientWidth,
    height = box.clientHeight;
svg.attr("width", width)
    .attr("height", height);

var color = ["blue", "red"];

var request = new XMLHttpRequest();
request.open("GET", "assets/data/treeMap_data.json", false);
request.send(null);
var dict = JSON.parse(request.responseText);

//svg.attr("width", width)
 //   .attr("height", height);



//newLayer(dict, svg, width, height, 0, 0);
