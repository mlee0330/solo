//
// Wall Properties
//
var wallWidth = 1000;
var wallHeight = 1000;

//
// Swatch
//

var swatches = [];

var Swatch = function(hex, x, y, width, height) {
  this.hex = hex;
  this.width = width;
  this.height = height;
};

var randomColor = function() {
  return Math.floor(Math.random()*16777215).toString(16);
};

var randX = function() {
  return Math.floor(Math.random()*wallHeight);
}; 

var randY = function() {
  return Math.floor(Math.random()*wallWidth);
};

var newSwatch = function(x, y, width, height) {
  return new Swatch(randomColor(), x, y, width, height);
};

var populateArray = function(population) {
  for(var i = 0; i < population; i++) {
    swatches.push(newSwatch(randX(), randY(), 50, 50));
  }
};

//
// Wall
//
var population = wallWidth * wallHeight / 2000;
populateArray(population);
console.log(swatches);


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
                      .attr("x", function(d) { return randX();})
                      .attr("y", function(d) { return randY();})
                      .attr("width", 50)
                      .attr("height", 50)
                      .attr("hex", function(d) { return d.hex; })
                      .style("fill", function(d) { return randomColor();});

var newColors = function(){

  wall.selectAll(".swatch")
      .transition()
      .attr("x", function(d) { return randX();})
      .attr("y", function(d) { return randY();})
      .attr("width", 50)
      .attr("height", 50)
      .attr("hex", function(d) { return d.hex; })
      .style("fill", function(d) { return randomColor();});

};

setInterval(newColors, 100);





















