// Wall Properties
//
var wallWidth = 1840;
var wallHeight = 880;

//
// Swatch
//

var swatches = [];

var Swatch = function(hex, x, y, width, height) {
  this.hex = hex;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
};

var randomInt = function() {
  return Math.floor(Math.random()*255);
};

var randomColor = function() {
  return 'rgb(' + randomInt() + ',' + randomInt() + ',' + randomInt() + ')';
};

var newSwatch = function(x, y, width, height) {
  return new Swatch(randomColor(), x, y, width, height);
};

var populateArray = function(population) {
  var x = 0;
  var y = 0;
  for(var i = 0; i < population; i++) {
    if(x === wallWidth) {
      x = 0;
      y+= 80;
    }
    swatches.push(newSwatch(x, y, 80, 80));
    x+= 80;
  }
};

//
// Wall
//
var population = wallWidth * wallHeight / 2500;
populateArray(population);

var body = d3.select('body');

var wall = body.append('svg')
               .attr('width', wallWidth)
               .attr('height', wallHeight)
               .attr('class', 'wall');

var colorSwatch = wall.selectAll(".swatch")
                       .data(swatches)
                       .enter()
                       .append("rect")
                       .attr("class", "swatch");

var swatchAttr = wall.selectAll(".swatch")
                      .attr("x", function(d) { return d.x;})
                      .attr("y", function(d) { return d.y;})
                      .attr("width", 80)
                      .attr("height", 80)
                      .attr("hex", function(d) { return d.hex; })
                      .style("fill", function(d) { return randomColor();});

var initiate = function(){
  wall.selectAll(".swatch")
      .transition()
      .duration(600)
      .ease('linear')
      .attr("x", function(d) { return d.x + 5;})
      .attr("y", function(d) { return d.y + 5;})
      .attr("width", 70)
      .attr("height", 70)
      .attr("hex", function(d) { return d.hex; });
  };

setTimeout(initiate, 500);

var componentToHex =function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

var rgbToHex = function(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

$('.swatch').mouseover(function(){
  d3.select(this).transition()
    .duration(100)
    .ease('cubic-out')
    .attr("x", function(d) { return d.x - 5;})
    .attr("y", function(d) { return d.y - 5;})
    .attr("width", 90)
    .attr("height", 90);})
    .mouseleave(function(){
      d3.select(this).transition()
        .duration(400)
        .attr("x", function(d) { return d.x + 5;})
        .attr("y", function(d) { return d.y + 5;})
        .attr("width", 70)
        .attr("height", 70);
    });

var withinRange = function(val) {
  return (val + Math.floor(Math.random()* 120) - 60);
};

$('.swatch').click(function(){
          var oldColor = JSON.stringify($(this).attr("style"));
          var rgb = oldColor.substring(11, oldColor.length-3)
                            .replace(/ /g, '')
                            .split(',');
          wall.selectAll(".swatch")
          .transition()
          .duration(300)
          .attr("x", function(d) { return d.x;})
          .attr("y", function(d) { return d.y;})
          .attr("width", 80)
          .attr("height", 80)
          .attr("hex", function(d) { return d.hex; })
          .style("fill", function(d) { return 'rgb(' + withinRange(~~rgb[0]) + ',' + withinRange(~~rgb[1]) + ',' + withinRange(~~rgb[2]) + ')';});
          setTimeout(initiate, 500);

          var newColor = JSON.stringify($(this).attr("style"));
          var text = newColor.substring(7, newColor.length-2);
          var rgb = newColor.substring(11, newColor.length-3)
                            .replace(/ /g, '')
                            .split(',');

          var hex = rgbToHex(~~rgb[0], ~~rgb[1], ~~rgb[2]);
          $('.color').html('Your color is: <br/>' + text + '&nbsp; &nbsp; &nbsp;  hex: ' + hex);
});
