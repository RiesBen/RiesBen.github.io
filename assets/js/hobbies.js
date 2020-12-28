/**
 * Created by benjamin on 4/1/17.
 */

var desc = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et " +
    "dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet" +
    " clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet," +
    " consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " +
    "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.!";

function gear_anim(svg,  width, height, x_offset, y_offset) {

    var width = width,
        height = height,
        radius = 80,
        x = Math.sin(2 * Math.PI / 3),
        y = Math.cos(2 * Math.PI / 3);

    var offset = 0,
        speed = 2,
        start = Date.now();

    var svg = svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("x", x_offset)
        .attr("y",y_offset)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(.55)")
        .append("g");

    var frame = svg.append("g")
        .datum({radius: Infinity});

    frame.append("g")
        .attr("class", "annulus")
        .datum({teeth: 80, radius: -radius * 5, annulus: true})
        .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "sun")
        .datum({teeth: 16, radius: radius})
        .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(0,-" + radius * 3 + ")")
        .datum({teeth: 32, radius: -radius * 2})
        .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + -radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
        .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
        .append("path")
        .attr("d", gear);

    d3.selectAll("input[name=reference]")
        .data([radius * 5, Infinity, -radius])
        .on("change", function(radius1) {
            var radius0 = frame.datum().radius, angle = (Date.now() - start) * speed;
            frame.datum({radius: radius1});
            svg.attr("transform", "rotate(" + (offset += angle / radius0 - angle / radius1) + ")");
        });

    d3.selectAll("input[name=speed]")
        .on("change", function() { speed = +this.value; });

    function gear(d) {
        var n = d.teeth,
            r2 = Math.abs(d.radius),
            r0 = r2 - 8,
            r1 = r2 + 8,
            r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
            da = Math.PI / n,
            a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
            i = -1,
            path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
        while (++i < n) path.push(
            "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
            "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
            "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
            "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
            "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
            "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
        path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
        return path.join("");
    }

    d3.timer(function() {
        var angle = (Date.now() - start) * speed,
            transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
        frame.selectAll("path").attr("transform", transform);
        frame.attr("transform", transform); // frame of reference
    });

}

//content box
//var box = document.getElementById('graph');
//sub style
var text_box_width = anim_box_width = "45%";
var text_height = anim_box_height ="85%";
var full = "100%";
//////////////////////////////////////////////////
//Text Box
var svg_text = d3.select("#text")
        .style("width", text_box_width)
        .style("height", text_height)
        .style("padding-bottom", "2%");

var text_box = svg_text.append("rect");
text_box.style("display", "block")
    .style("width", full)
    .style("height", full)
    .style("fill", d3.rgb("#348cb2").darker(0.9))
    .style("stroke-width", "1%")
    .style("stroke", d3.rgb("#348cb2").brighter(1.2));

svg_text.append("foreignObject")
    .style("width", full)
    .style("height", full)
    .html("<h1 class='page_text'>Leisure Time!</h1>" +
          "<p class='page_text'>"+desc+"</p>");




//////////////////////////////////////////////////
//

const div_anim = d3.select("#anim")
        .style("display", "inline-block")
        .style("width", anim_box_width)
        .style("height", anim_box_height)
    .style("padding-left", "3%");


/*
<!-- The grid: four columns -->
<div class="row">
    <div class="column">
    <img src="img_nature.jpg" alt="Nature" onclick="myFunction(this);">
    </div>
    <div class="column">
    <img src="img_snow.jpg" alt="Snow" onclick="myFunction(this);">
    </div>
    <div class="column">
    <img src="img_mountains.jpg" alt="Mountains" onclick="myFunction(this);">
    </div>
    <div class="column">
    <img src="img_lights.jpg" alt="Lights" onclick="myFunction(this);">
 </div>
</div>
*/