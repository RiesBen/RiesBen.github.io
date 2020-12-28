/**
 * Created by benjamin on 4/1/17.
 */


var desc = "During my bioinformatics studies, I could experience many different coding languages and enjoyed learning their various aspects. Additionally, programming paradigms like object-oriented programming and functional programming were part of the curriculum. Furthermore, I enjoyed learning how to think in parallel programming, high-performance computing, and machine learning."
//content box
//var box = document.getElementById('graph');
//sub style
var text_box_width = anim_box_width = "45%";
var text_height = anim_box_height ="85%";
var full = "100%";
///////////////////////////////////////////////////////////////////////////////////////////////////
// build text
var box = document.getElementById('graph'),
    width = 0.9*box.clientWidth,
    height = box.clientHeight;

// main svg
var text_box = d3.select("#text")
    .style("width", text_box_width)
    .style("padding-bottom", "2%");

var text_box_rect = text_box.append("rect")
    .style("width", full)
    .style("height", text_height)
    .style("fill", d3.rgb("#990000").darker(0.9))
    .style("stroke-width", "1%")
    .style("stroke", d3.rgb("#990000").brighter(1.2));

text_box.append("foreignObject")
    .style("width", full)
    .style("height", full)
    .html("<h1 class='page_text'>I like programming!</h1>" +
        "<p class='page_text'>"+desc+"</p>");

////////////////////////////////////////////////////////////
//build Dendrogram:

var anim_div = d3.select("#anim")
    .style("display", "inline-block")
    .style("width", anim_box_width)
    .style("height", anim_box_height)
    .style("padding-left", "3%");

var dendro = anim_div.append("svg")
    .attr("x", 0)
    .attr("y", 0)
    .style("width", width)
    .style("height", height);


function buildDendrogam(width, height) {
    var dendrogram_width = width;
    var bar_width = width;

    g = dendro.append("g").attr("transform", "translate(0,0)");       // move right 20px.


    //bar-plot
    // x-scale and x-axis
    var experienceName = ["", "Used 1.0", "Basic 2.0", "Expirenced 3.0"];
    var formatSkillPoints = function (d) {
        return experienceName[d % 4];
    }
    var xScale = d3.scaleLinear()
        .domain([0, 3])
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
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });

    d3.csv("../data/coding/coding_data.csv", row, function (error, data) {
        if (error) throw error;

        var root = stratify(data);
        tree(root);

        // Draw every datum a line connecting to its parent.
        var link = g.selectAll(".link")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.parent.y + 100) + "," + d.x
                    + " " + (d.parent.y + 100) + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // Setup position for every datum; Applying different css classes to parents and leafs.
        var node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Draw every datum a small circle.
        node.append("circle")
            .attr("r", 4);

        // Setup G for every leaf datum.
        var leafNodeG = g.selectAll(".node--leaf")
            .append("g")
            .attr("class", "node--leaf-g")
            .attr("transform", "translate(" + 8 + "," + -13 + ")");

        var bar_height = height / (data.length + 2);
        leafNodeG.append("rect")
            .attr("class", "shadow")
            .style("fill", function (d) {
                return d.data.color;
            })
            .attr("width", 2)
            .attr("height", bar_height)
            .attr("rx", 2)
            .attr("ry", 2)
            .transition()
            .duration(800)
            .attr("width", function (d) {
                return xScale(d.data.value);
            });

        leafNodeG.append("text")
            .attr("dy", bar_height * 0.7)
            .attr("x", 8)
            .attr("font-size", bar_height * 0.7)
            .style("text-anchor", "start")
            .text(function (d) {
                return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
            });

        // Write down text for every parent datum
        var internalNode = g.selectAll(".node--internal");
        internalNode.append("text")
            .attr("y", -10)
            .attr("font-size", dendrogram_width * 0.07)
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
            });

        // Attach axis on top of the first leaf datum.
        var firstEndNode = g.select(".node--leaf");
        firstEndNode.insert("g")
            .attr("class", "xAxis")
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
        dendro.selectAll(".grid").select("line")
            .style("stroke-dasharray", "20,1")
            .style("stroke", "white");

        // Animation functions for mouse on and off events.
        d3.selectAll(".node--leaf-g")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(d) {
            var leafG = d3.select(this);

            leafG.select("rect")
                .attr("stroke", "#4D4D4D")
                .attr("stroke-width", "2");
        }

        function handleMouseOut() {
            var leafG = d3.select(this);

            leafG.select("rect")
                .attr("stroke-width", "0");
        }

    });

    function row(d) {
        return {
            id: d.id,
            value: +d.value,
            color: d.color
        };
    }
}

// building dendrogram:
buildDendrogam(width*0.25, height*0.8);
