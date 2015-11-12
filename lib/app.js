//
// Wall Properties
//
var wallWidth = 1275;
var wallHeight = 750;

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

// var colorShifter = function(values, targetColor) {
//   var current = values;
//   if(targetColor === 'red') {
//     return 
//   }
//   return 
// };

var colorRanger = function(colorMin, colorMax) {
  return (16700000).toString(16);
};

// var randX = function() {
//   return Math.floor(Math.random()*16)*50;
// }; 

// var randY = function() {
//   return Math.floor(Math.random()*16)*50;
// };

var newSwatch = function(x, y, width, height) {
  return new Swatch(randomColor(), x, y, width, height);
};

var populateArray = function(population) {
  var x = 0;
  var y = 0;
  for(var i = 0; i < population; i++) {
    if(x === wallWidth) {
      x = 0;
      y+= 75;
    }
    swatches.push(newSwatch(x, y, 75, 75));
    x+= 75;
  }
};

//
// Wall
//
var population = wallWidth * wallHeight / 2500;
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

var randXstart = function(colorStart, length) {
  return Math.floor(Math.random()*length)*75 + colorStart*75;
};


// var whiteStart = wall.selectAll(".swatch")
//                       .attr("x", function(d) { return randXstart(4, 2);})
//                       .attr("y", function(d) { return randY();})
//                       .attr("width", 50)
//                       .attr("height", 50)
//                       .attr("hex", function(d) { return d.hex; })
//                       .style("fill", 'function(d) { return randomColor();}');
var tooltip = d3.select("this")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

var swatchAttr = wall.selectAll(".swatch")
                      .attr("x", function(d) { return d.x;})
                      .attr("y", function(d) { return d.y;})
                      .attr("width", 75)
                      .attr("height", 75)
                      .attr("hex", function(d) { return d.hex; })
                      .style("fill", function(d) { return randomColor();})
                      .on("mouseover", function(){return tooltip.style("visibility", "visible");})
                      .on("mousemove", function(){return tooltip.style("top",
                          (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
                      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

                      // .on("mouseover", function(d) { 
                      //   d3.select(this).enter().append("text")
                      //     .text(function(d) {return d.hex;}); });


// var newColors = function(){
//   wall.selectAll(".swatch")
//       .transition()
//       .duration(500)
//       .attr("x", function(d) { return randX();})
//       .attr("y", function(d) { return randY();})
//       .attr("width", 50)
//       .attr("height", 50)
//       .attr("hex", function(d) { return d.hex; })
//       .style("fill", function(d) { return randomColor();});
// };

// setInterval(newColors, 3000);






















