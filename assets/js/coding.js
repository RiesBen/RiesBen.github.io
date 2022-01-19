/**
 * Created by benjamin on 4/1/17.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////
//stamps
var stamps_box = d3.select("#repoStampBox");

var links = ["https://github.com/rinikerlab/Ensembler", "https://github.com/rinikerlab/restraintmaker", "https://github.com/rinikerlab/PyGromosTools"]
var pic = ["../data/EnsemblerLogo_with_whiteBackround.png", "../data/RestraintMaker_logo_noBackground.png", "../data/PyGromosToolsBanner_small.png"]
var text = ["Ensembler", "RestraintMaker", "PyGromosTools"]
var colors = [d3.rgb(256, 256, 256), d3.rgb(39, 217, 7),    d3.rgb( 173, 221, 239)]
var nstamps = links.length;

for (var i = 0; i < nstamps; i++) {

    var tmp_color = colors[i];

    function openLink() {
        var me = d3.select(this);
        window.open(me.attr("href"))
    }

    function onhover() {
        d3.select(this).style("opacity", "0.0")
    }

    function outhover() {
        d3.select(this).style("opacity", "0.2")
    }

    stamps_box.append("rect")
        .style("height", "100%")
        .style("width", "25%")
        .style("position", "absolute")
        .style("x", 33 * i + 5 + "%")
        .style("fill", tmp_color);

    if("" == pic[i]){
        stamps_box.append("foreignObject")
            .style("width", "25%")
            .style("height", "100%")
            .style("position", "absolute")
            .style("y", "40%")
            .style("x", 33 * i + 5 + "%")
            .style("text-align", "center")
            .style("font-size", "1.25em")
            .style("font-weight", "bold")
            .style("color", "black")
            .text(text[i])
            .attr("href", links[i])
            .on('click', openLink);

    } else {
        stamps_box.append("svg:image")
            .style("height", "100%")
            .style('width', "25%")
            .style("position", "absolute")
            .style("x", 33 * i + 5 + "%")
            .attr("xlink:href", pic[i]);
    }

    stamps_box.append("rect")
        .style("height", "100%")
        .style("width", "25%")
        .style("position", "absolute")
        .style("x", 33 * i + 5 + "%")
        .style("opacity", "0.3")
        .style("fill", d3.rgb(55, 55, 55))
        .attr("href", links[i])
        .on('click', openLink)
        .on("mouseenter", onhover)
        .on("mouseleave", outhover);
}

////////////////////////////////////////////////////////////
//build Dendrogram:

var anim_div = d3.select("#animation")

anim_width = anim_div.node().getBoundingClientRect().width ;
anim_box_height = anim_div.node().getBoundingClientRect().height;

var dendro = anim_div.append("svg")
    .style("width", anim_width)
    .style("height", anim_box_height)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 6 00 400")

function buildDendrogam(width, height) {
    var dendrogram_width = width * 0.4;
    var bar_width = width * 0.45;
    var y_offset = height * 0.07
    height = height * 0.9

    g = dendro.append("g").attr("transform", "translate(" + width * 0.05 + "," + y_offset + ")");       // move right 20px.


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
buildDendrogam(anim_width, anim_box_height);
