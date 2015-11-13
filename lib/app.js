//
// Splash Screen
//



// Wall Properties
//
var wallWidth = 1280;
var wallHeight = 800;

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

// var randXstart = function(colorStart, length) {
//   return Math.floor(Math.random()*length)*75 + colorStart*75;
// };

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


// console.log($('.swatch'))



// var svg = d3.select('body').append('svg')

// svg.append('text')
//   .text('Touch me')
//   .attr('font-size', 20)
//   .attr('fill', '#000')
//   .style('text-anchor', 'middle')
//   .on('mouseover', function(d,i) {
//     d3.select(this).transition()
//       .ease('cubic-out')
//       .duration('200')
//       .attr('font-size', 32)
//       .attr('fill', 'springgreen');
//   })
//   .on('mouseout', function(d,i) {
//     d3.select(this).transition()
//       .ease('cubic-out')
//       .duration('200')
//       .attr('font-size', 20)
//       .attr('fill', '#333');
//   });




  $('.swatch').mouseover(function(){
    d3.select(this).transition()
          .duration(100)
          .ease('cubic-out')
          .attr("x", function(d) { return d.x - 5;})
          .attr("y", function(d) { return d.y - 5;})
          .attr("width", 90)
          .attr("height", 90);
        })
  .mouseleave(function(){
          d3.select(this).transition()
          .duration(400)
          .attr("x", function(d) { return d.x + 5;})
          .attr("y", function(d) { return d.y + 5;})
          .attr("width", 70)
          .attr("height", 70);
        });


var withinRange = function(val) {
  return (val + Math.floor(Math.random()* 70) - 35);
}

$('.swatch').click(function(){
          var newColor = JSON.stringify($(this).attr("style"));
          console.log(newColor);
          var rgb = newColor.substring(11, newColor.length-3)
                            .replace(/ /g, '')
                            .split(',');
                           console.log(rgb);
          wall.selectAll(".swatch")
          .transition()
          .duration(300)
          .attr("x", function(d) { return d.x;})
          .attr("y", function(d) { return d.y;})
          .attr("width", 80)
          .attr("height", 80)
          .attr("hex", function(d) { return d.hex; })
          // .style("fill", function(d) { return 'rgb(' + withinRange(100) + ',' + withinRange(100) + ',' + withinRange(100) + ')';});
          .style("fill", function(d) { return 'rgb(' + withinRange(~~rgb[0]) + ',' + withinRange(~~rgb[1]) + ',' + withinRange(~~rgb[2]) + ')';});
          // .style("fill", function(d) { return randomColor();});
          setTimeout(initiate, 500);

})








