/**
 * Created by benjamin on 4/1/17.
 */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TextBox
var stamps_box = d3.select("#pubStampBox")

//Smaller boxes
var links = ["https://doi.org/10.1007/s10822-022-00445-6", "https://doi.org/10.1007/s10822-021-00436-z",  "https://doi.org/10.1021/acs.jmedchem.0c02036"]
var colors = [d3.rgb(244, 170, 66), d3.rgb(209, 16, 41), d3.rgb(65, 157, 244)];
var text = ["Automating Distance Restraints", "Free Energies Protein Binding", "Macrocyclic Molecules"]
var nstamps = 3;

for (var i = 0; i < nstamps; i++) {
    function openLink() {
        var me = d3.select(this);
        window.open(me.attr("href"))
    }
    function onhover() {
        d3.select(this).style("opacity", "1.0")

    }

    function outhover() {
        d3.select(this).style("opacity", "0.7")
    }
    var stamp_rect = stamps_box.append("rect")
        .style("width", "25%")
        .style("height", "100%")
        .style("opacity", "0.7")
        .style("position", "absolute")
        .style("x", 33 * i + 5 + "%")
        .style("fill", colors[i])
        .attr("href", links[i])
        .on('click', openLink)
        .on("mouseover", onhover)
        .on("mouseout", outhover);

    var stamp_text = stamps_box.append("foreignObject")
        .style("width", "25%")
        .style("height", "100%")
        .style("position", "absolute")
        .style("y", "35%")
        .style("x", 33 * i + 5 + "%")
        .style("text-align", "center")
        .style("font-size", "1.75em")
        .style("font-weight", "bold")
        .text(text[i])
        .attr("href", links[i])
        .on('click', openLink);

}

//////////////////////////////////////////////////
var particle_colors = [d3.rgb(244, 170, 66), d3.rgb(65, 157, 244), d3.rgb(209, 16, 41), d3.rgb(18, 183, 34)]
var particle_names = ["protein", "water", "sodium", "chloride"];

function coarseSim(svg, width, height, x_offset, y_offset) {
    //simBox
    var box_width = width * 0.5;
    var box_height = height * 0.85;
    var box_front_p1 = [x_offset * 0.75, 0.1 * height + y_offset];
    var box_front_p2 = [box_front_p1[0], box_front_p1[1] + box_height];
    var box_front_p3 = [box_front_p1[0] + box_width, box_front_p1[1]];
    var box_front_p4 = [box_front_p1[0] + box_width, box_front_p1[1] + box_height];

    var box_back_p1 = [x_offset * 1, 0.03 * height + y_offset];
    var box_back_p2 = [box_back_p1[0], box_back_p1[1] + box_height];
    var box_back_p3 = [box_back_p1[0] + box_width, box_back_p1[1]];
    var box_back_p4 = [box_back_p1[0] + box_width, box_back_p1[1] + box_height];

    svg.append("rect")
        .attr("x", box_back_p1[0])
        .attr("y", box_back_p1[1])
        .attr("width", box_width)
        .attr("height", box_height)
        .style("stroke", d3.rgb("#555555"))
        .style("stroke-width", 5)
        .style("fill", "none");

    svg.append("line")
        .attr("x1", box_front_p1[0])
        .attr("x2", box_back_p1[0])
        .attr("y1", box_front_p1[1])
        .attr("y2", box_back_p1[1])
        .attr("stroke-width", 8)
        .attr("stroke", d3.rgb("#555555"));

    svg.append("line")
        .attr("x1", box_front_p2[0])
        .attr("x2", box_back_p2[0])
        .attr("y1", box_front_p2[1])
        .attr("y2", box_back_p2[1])
        .attr("stroke-width", 8)
        .attr("stroke", d3.rgb("#555555"));

    var particle_num = 200;
    var salt_conc = particle_num * 0.15;
    var protein_index = Math.round((particle_num - 1) * 0.85);
    var nodes = d3.range(particle_num).map(function (d, i) {
            if (i == protein_index + 1) {
                return {radius: width * 0.02};
            } else if (i % salt_conc == 0 || i % salt_conc == 1) {
                return {radius: width * 0.017};
            } else {
                return {radius: width * 0.014};
            }

        }), // Math.random() * 12 +
        root = nodes[0];

    root.radius = 10;
    root.fixed = true;

    var force = d3.layout.force()
        .gravity(0.25)
        .chargeDistance(0.1 * width)
        .charge(function (d, i) {
            if (i == protein_index + 1) {   //prot
                return -5000;
            } else if (i % salt_conc == 2) {   //Na
                return +300;
            } else if (i % salt_conc == 1) {   //Cl
                return -300;
            } else {
                return -3;
            }
        })
        .nodes(nodes)
        .size([x_offset + width * 0.75, y_offset + height]);

    force.start();
    svg.style("width", width)
        .style("height", height);

    svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter().append("circle")
        .attr("x", function (d) {
            return width * 0.5
        })
        .attr("name", function (d, i) {
            if (i == protein_index) {
                return "protein";
            } else if (i % salt_conc == 0) {
                return "NA";
            } else if (i % salt_conc == 1) {
                return "CL";
            } else {
                return "SOL";
            }
        })
        .attr("r", function (d, i) {
            if (i == protein_index) {
                return width * 0.07;
            } else if (i % salt_conc == 0 || i % salt_conc == 1) {
                return width * 0.015;
            } else {
                return width * 0.012;
            }
        })//d.radius; })
        .style("fill", function (d, i) {
            if (i == protein_index) {
                return particle_colors[0];
            } else if (i % salt_conc == 0) {
                return particle_colors[3];
            } else if (i % salt_conc == 1) {
                return particle_colors[2];
            } else {
                return particle_colors[1];
            }
        })
        .data(nodes.slice(1)[1])


    svg.selectAll("circle")
    force.on("tick", function (e) {
        var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;

        while (++i < n) q.visit(collide(nodes[i]));
        svg.selectAll("circle")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    });

    svg.on("mousemove", function () {
        var p1 = d3.mouse(this);
        root.px = p1[0];
        root.py = p1[1];
        force.resume();
    });

    svg.on("MozOrientation", function () {
        var p1 = d3.mouse(0);
        root.px = p1[0];
        root.py = p1[1];
        force.resume();
    });

    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }


    svg.append("rect")
        .attr("x", box_front_p1[0])
        .attr("y", box_front_p1[1])
        .attr("width", box_width)
        .attr("height", box_height)
        .style("stroke", d3.rgb("#555555"))
        .style("stroke-width", 8)
        .style("fill", "none");

    svg.append("line")
        .attr("x1", box_front_p3[0])
        .attr("x2", box_back_p3[0])
        .attr("y1", box_front_p3[1])
        .attr("y2", box_back_p3[1])
        .attr("stroke-width", 8)
        .attr("stroke", d3.rgb("#555555"));

    svg.append("line")
        .attr("x1", box_front_p4[0])
        .attr("x2", box_back_p4[0])
        .attr("y1", box_front_p4[1])
        .attr("y2", box_back_p4[1])
        .attr("stroke-width", 8)
        .attr("stroke", d3.rgb("#555555"));


    var rect_color = particle_colors;
    var rect_text = particle_names;
    var rect_width = box_width / 8;
    var rect_height = 0.1 * (height - box_height);
    var offset = rect_width * 2.75;
    var start_offset = -rect_width
    for (var i = 0; i < 4; i++) {
        svg.append("rect")
            .attr("x", box_front_p1[0] + i * offset + start_offset)
            .attr("y", box_front_p4[1] + (rect_height * 1.5))
            .style("stroke", d3.rgb("#555555"))
            .attr("width", rect_width)
            .attr("height", rect_height)
            .style("fill", rect_color[i]);
        svg.append("text")
            .attr("x", box_front_p1[0] + (i + 0.4) * offset + start_offset)
            .attr("y", box_front_p4[1] + (rect_height * 2.3))
            .attr("class", "content")
            .attr("font-size", 12)
            .attr("font-weight", "bold")
            .text(rect_text[i]);
    }
}

//simulation_box+ coarse_sim:
var anim_div = d3.select("#animation");

anim_width = anim_div.node().getBoundingClientRect().width;
anim_box_height = anim_div.node().getBoundingClientRect().height;

var simBox = anim_div.append("svg")
    .style("width", anim_width)
    .style("height", anim_box_height);
//    .style("viewBox", "0 0 300 600");

var box_height = anim_box_height;
var box_width = anim_width;
var x_offset = anim_width * 0.25;
var y_offset = 0;

coarseSim(simBox, box_width, box_height, x_offset, y_offset);
