/**
 * Created by benjamin on 4/1/17.
 */
var particle_colors = [d3.rgb(244, 170, 66),  d3.rgb(65, 157, 244), d3.rgb(209, 16, 41), d3.rgb(18, 183, 34)]
var particle_names  = ["protein", "water", "sodium", "chloride"];



var desc = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et " +
    "dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet" +
    " clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet," +
    " consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " +
    "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.!";
function coarseSim(svg,  width, height, x_offset, y_offset) {

    var particle_num = 200;
    var salt_conc = particle_num*0.15;
    var protein_index = Math.round((particle_num-1)*0.85);
    var nodes = d3.range(particle_num).map(function(d,i) {
            if(i == protein_index+1){
                return {radius:width*0.02};
            }
            else if(i % salt_conc== 0 || i % salt_conc == 1){
                return {radius:width*0.017};
            }
            else{
                return {radius:width*0.014}; }; }), // Math.random() * 12 +
        root = nodes[0];

    root.radius = 10;
    root.fixed = true;

    var force = d3.layout.force()
        .gravity(0.25)
        .chargeDistance(0.1*width)
        .charge(function(d, i) {
        if(i == protein_index+1){   //prot
            return -5000;
        }
        else if(i % salt_conc == 2){   //Na
            return +300;
        }
        else if(i % salt_conc == 1){   //Cl
            return -300;
        }
        else{
            return  -3; }})
        .nodes(nodes)
        .size([x_offset + width, height]);

    force.start();
    svg.attr("width", width)
        .attr("height", height);

    svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter().append("circle")
        .attr("x", function(d) {return width*0.5})
        .attr("name", function(d, i) {
            if(i == protein_index){
                return "protein";
            }
            else if(i % salt_conc == 0){
                return "NA";
            }
            else if(i % salt_conc == 1){
                return "CL";
            }
            else{
                return  "SOL"; }})
        .attr("r", function(d, i) {
            if(i == protein_index){
                return width*0.07;
            }
            else if(i % salt_conc == 0 || i %  salt_conc == 1){
                return width*0.015;
            }
            else{
                return  width*0.012; }
        })//d.radius; })
        .style("fill", function(d, i) {
            if(i == protein_index){
                return particle_colors[0];
            }
            else if(i % salt_conc == 0){
                return particle_colors[3];
            }
            else if(i % salt_conc == 1){
                return particle_colors[2];
            }
            else{
                return  particle_colors[1]; }})
        .data(nodes.slice(1)[1])


    svg.selectAll("circle")
    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          i = 0,
          n = nodes.length;

      while (++i < n) q.visit(collide(nodes[i]));
        svg.selectAll("circle")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });

    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });

    svg.on("MozOrientation", function() {
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
}

var svg = d3.select("svg");
var box = document.getElementById('graph'),
    width = 0.9 * box.clientWidth,
    height = box.clientHeight;

svg.attr("width", width)
    .attr("height", height);

var text_box_width = width*0.45;
var sim_center = text_box_width+(width*0.6)/2;
var dwidth = text_box_width/3;
var stamps_area = [dwidth*0.1, height*0.7];
var stamp_width = 0;
var stamp_height = 0;
var stamps_height =height*0.3;
var text_height =height*0.6;

if(text_box_width<=stamps_height){
    stamp_width = dwidth*0.8 ;
    stamp_height = stamp_width ;
}
else{
    stamp_width = dwidth*0.8;
    stamp_height = stamps_height*0.7;
}

//////////////////////////////////////////////////
//Text Box

var colors=[d3.rgb(244, 170, 66), d3.rgb(209, 16, 41), d3.rgb(65, 157, 244)];
var text=["biochemistry", "informatics", "physics"]

var text_box = svg.append("rect")
    .attr("width", text_box_width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y",0)
    .style("fill", d3.rgb("#088c34").darker(0.9))
    .style("stroke-width", 0.01*text_box_width)
    .style("stroke", d3.rgb("#088c34").brighter(1.2));

svg.append("foreignObject")
    .attr("x", width*0.03)
    .attr("y", height*0.07)
    .attr("width", text_box_width-(width*0.05))
    .attr("height", text_height)
    .html("<h1 class='page_text'>Simulation of Biochemistry!</h1>" +
          "<p class='page_text'>"+desc+"</p>");

for( var i =0; i <3; i++){
    svg.append("rect")
        .attr("x", stamps_area[0]+i*dwidth)
        .attr("y", stamps_area[1])
        .attr("width", stamp_width)
        .attr("height", stamp_height)
        .style("fill", colors[i])
    svg.append("text")
        .attr("x", stamps_area[0]+i*dwidth+stamp_width*0.5-( stamp_width*0.035)*text[i].length)
        .attr("y", stamps_area[1]+stamp_height*0.55)
        .attr("class", "content")
        .attr("font-size", stamp_width*0.15)
        .attr("font-weight", "bold")
        .text(text[i]);

}



//////////////////////////////////////////////////
//simulation_box+ coarse_sim:
var box_width = width*0.5;
var box_height = height*0.85;
var box_front_p1=[sim_center*0.75, 0.1*height];
var box_front_p2=[box_front_p1[0], box_front_p1[1]+box_height];
var box_front_p3=[box_front_p1[0]+box_width,box_front_p1[1]];
var box_front_p4=[box_front_p1[0]+box_width,box_front_p1[1]+box_height];

var box_back_p1=[sim_center*0.85, 0.03*height];
var box_back_p2=[box_back_p1[0], box_back_p1[1]+box_height];
var box_back_p3=[box_back_p1[0] + box_width, box_back_p1[1]];
var box_back_p4=[box_back_p1[0] + box_width,box_back_p1[1]+box_height];

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


coarseSim( svg, width, height, sim_center, 0);

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


var rect_color=particle_colors;
var rect_text=particle_names;
var rect_width = box_width/8
var rect_height = 0.1*(height - box_height)

for( var i =0; i <4; i++) {
    svg.append("rect")
        .attr("x", box_front_p1[0] + i* rect_width*2)
        .attr("y", box_front_p4[1] + (rect_height*1.5))
        .style("stroke", d3.rgb("#555555"))
        .attr("width", rect_width)
        .attr("height", rect_height)
        .style("fill", rect_color[i]);
    svg.append("text")
        .attr("x", box_front_p1[0] + (i+0.5)*rect_width*2+3)
        .attr("y", box_front_p4[1] + (rect_height*2.3))
        .attr("class", "content")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .text(rect_text[i]);
}