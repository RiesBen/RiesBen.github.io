/**
 * Created by benjamin on 4/1/17.
 */

function newLayer(svg,  width, height, x_offset, y_offset) {

    var nodes = d3.range(200).map(function() { return {radius:20}; }), // Math.random() * 12 +
        root = nodes[0];

    root.radius = 10;
    root.fixed = true;

    var force = d3.layout.force()
        .gravity(0.25)
        .chargeDistance(0.3*width)
        .charge(function(d, i) { return i ? 0 : -3000; })
        .nodes(nodes)
        .size([x_offset + width, height]);

    force.start();
    svg.attr("width", width)
        .attr("height", height);

    svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter().append("circle")
        .attr("r", function(d, i) {
            if(i == 0){
                return 70;
            }
            else if(i % 20 == 0 || i % 20 == 1){
                return 18;
            }
            else{
                return  15; }
        })//d.radius; })
        .style("fill", function(d, i) {
            if(i == 0){
                return d3.rgb(244, 170, 66);
            }
            else if(i % 20 == 0){
                return d3.rgb(18, 183, 34);
            }
            else if(i % 20 == 1){
                return d3.rgb(209, 16, 41);
            }
            else{
                return  d3.rgb(65, 157, 244); }})
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

var rect_width = width*0.45;
svg.append("rect")
    .attr("width",rect_width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y",0)
    .style("fill", d3.rgb("#088c34").brighter(1.2))
    .style("stroke-width", 0.02*rect_width)
    .style("stroke", d3.rgb("#088c34").darker(0.9))
    .append("text")
    .text("Simulations with biochemical background!")
    .attr("x", 20)
    .attr("y", 20)
    .attr("font-size", 20)
    .attr("fill", "black")
    .attr("class", "content");
newLayer( svg, width, height, rect_width*1.1, 0);
