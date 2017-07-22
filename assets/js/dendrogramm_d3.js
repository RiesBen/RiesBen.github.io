/**
 * Created by benjamin on 4/1/17.
 */


var desc = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et " +
    "dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet" +
    " clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet," +
    " consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " +
    "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.!";

var box = document.getElementById('graph'),
    width = box.clientWidth,
    height = box.clientHeight;

var text_box_width = width*0.45,
plot_offset=text_box_width+0.05*text_box_width,
plot_width= width-plot_offset-width*0.02,
text_height =height*0.6;

// main svg
var svg = d3.select("svg")

var text_box = svg.append("rect")
    .attr("width", text_box_width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", d3.rgb("#990000").darker(0.9))
    .style("stroke-width",  0.01*text_box_width)
    .style("stroke", d3.rgb("#990000").brighter(1.2));

svg.append("foreignObject")
    .attr("x", width*0.03)
    .attr("y", height*0.07)
    .attr("width", text_box_width-(width*0.05))
    .attr("height", text_height)
    .html("<h1 class='text'>I like programming!</h1>" +
        "<p class='text'>"+desc+"</p>");

var dendro = svg.append("svg")
    .attr("x", plot_offset)
    .attr("y", 0)
    .attr("width", plot_width)
    .attr("height", height);








var dendrogram_width = plot_width*0.4;
var bar_width =  plot_width*0.6;

g = dendro.append("g").attr("transform", "translate(0,0)");       // move right 20px.


//bar-plot
// x-scale and x-axis
var experienceName = ["", "Used 1.0","Basic 2.0","Expirenced 3.0"];
var formatSkillPoints = function (d) {
    return experienceName[d % 4];
}
var xScale =  d3.scaleLinear()
    .domain([0,3])
    .range([0, bar_width]);

var xAxis = d3.axisTop()
    .scale(xScale)
    .ticks(3)
    .tickFormat(formatSkillPoints);

//dendrogramm
// Setting up a way to handle the data
var tree = d3.cluster()                 // This D3 API method setup the Dendrogram datum position.
    .size([height, dendrogram_width])    // Total width - bar chart width = Dendrogram chart width
    .separation(function separate(a, b) {
        return a.parent == b.parent            // 2 levels tree grouping for category
        || a.parent.parent == b.parent
        || a.parent == b.parent.parent ? 0.4 : 0.8;
    });

var stratify = d3.stratify()            // This D3 API method gives cvs file flat data array dimensions.
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.csv("assets/data/coding_data.csv", row, function(error, data) {
    if (error) throw error;

    var root = stratify(data);
    tree(root);

    // Draw every datum a line connecting to its parent.
    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 100) + "," + d.x
                + " " + (d.parent.y + 100) + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    // Setup position for every datum; Applying different css classes to parents and leafs.
    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    // Draw every datum a small circle.
    node.append("circle")
        .attr("r", 4);

    // Setup G for every leaf datum.
    var leafNodeG = g.selectAll(".node--leaf")
        .append("g")
        .attr("class", "node--leaf-g")
        .attr("transform", "translate(" + 8 + "," + -13 + ")");

    var bar_height = height/(data.length+2);
    leafNodeG.append("rect")
        .attr("class","shadow")
        .style("fill", function (d) {return d.data.color;})
        .attr("width", 2)
        .attr("height", bar_height)
        .attr("rx", 2)
        .attr("ry", 2)
        .transition()
        .duration(800)
        .attr("width", function (d) {return xScale(d.data.value);});

    leafNodeG.append("text")
        .attr("dy",bar_height*0.7)
        .attr("x", 8)
        .attr("font-size", bar_height*0.7)
        .style("text-anchor", "start")
        .text(function (d) {
            return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
        });

    // Write down text for every parent datum
    var internalNode = g.selectAll(".node--internal");
    internalNode.append("text")
        .attr("y", -10)
        .attr("font-size", dendrogram_width*0.07)
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
        });

    // Attach axis on top of the first leaf datum.
    var firstEndNode = g.select(".node--leaf");
    firstEndNode.insert("g")
        .attr("class","xAxis")
        .attr("transform", "translate(" + 7 + "," + -14 + ")")
        .call(xAxis);

    // tick mark for x-axis
    firstEndNode.insert("g")
        .attr("class", "grid")
        .attr("transform", "translate(7," + (height - 15) + ")")
        .call(d3.axisBottom()
            .scale(xScale)
            .ticks(5)
            .tickSize(-height, 0, 0)
            .tickFormat("")
        );

    // Emphasize the y-axis baseline.
    svg.selectAll(".grid").select("line")
        .style("stroke-dasharray","20,1")
        .style("stroke","white");

    // Animation functions for mouse on and off events.
    d3.selectAll(".node--leaf-g")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(d) {
        var leafG = d3.select(this);

        leafG.select("rect")
            .attr("stroke","#4D4D4D")
            .attr("stroke-width","2");
    }
    function handleMouseOut() {
        var leafG = d3.select(this);

        leafG.select("rect")
            .attr("stroke-width","0");
    }

});

function row(d) {
    return {
        id: d.id,
        value: +d.value,
        color: d.color
    };
}