// start slingin' some d3 here.
var scoreCount = 0;
var collisionCount = 0;
var timerOn = false;

// console.log(scoreCount)

// build board
var board = d3.select(".board")
                .append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .on({"mousemove": scoreIncrease})
                .style("border", "3px solid black")


// build player
// make player move
// build enemies

var Enemy = function(numEnemies){
  this.datum = [];
  this.numEnemies = numEnemies

}

Enemy.prototype.createEnemy = function(){

  for (var i = 0; i < this.numEnemies; i++){
    var x = Math.random() * 500;
    var y = Math.random() * 500;
    this.datum[i] = {"x": x, "y":  y };
  };

  var enemy = board.selectAll("circle")
                    .data(this.datum)
                    .enter()
                    .append("circle")
                    .attr("class", "enemy")
                    .attr("cx", function(d){ return d.x})//Math.random() * 500)
                    .attr("cy", function(d){ return d.y})//Math.random() * 500)
                    .attr("r", "15px")
                    .attr("fill", "red")
                    .on({"mousemove": playerPosition, "mouseover": increaseCollionCount})


//
}

Enemy.prototype.moveEnemy = function(){

  var changePosition = d3.selectAll(".enemy")
                          .data(this.datum)
                          .transition().duration(1500)
                          .tween('custom', tweenWithCollisionDetection)
                          .attr("cx", function(d){return Math.random() * 500})
                          .attr("cy", function(d){return Math.random() * 500})

}



function playerPosition(){
  var xMouse = d3.mouse(this)[0];
  var yMouse = d3.mouse(this)[1];



  // d3.select(".scoreboard")
  // for (var i = 0; i < newEnemies.datum.length; i++){
  //   if (newEnemies.datum[i].x === d3.select(".player").attr("cx") && newEnemies.datum[i].y === d3.event.y){
  //     scoreCount++;
  //   }
  // }
  // debugger;
  var currentScore = d3.select(".current").select("span").text(scoreCount);//select("span").attr("span", 5);

  // d3.event.x
  // d3.event.y

  // console.log(xMouse, yMouse);
  // console.log(d3.event)
}

function scoreIncrease(){
  d3.select(".player").remove();
  var xMouse = d3.mouse(this)[0];
  var yMouse = d3.mouse(this)[1];
  // console.log(xMouse, yMouse)

  board.append("circle")
        .attr("class", "player")
        .attr("cx", xMouse)
        .attr("cy", yMouse - 7)
        .attr("r", "1px")
        .attr("fill", "blue")
  scoreCount++;
  var currentScore = d3.select(".current").select("span").text(scoreCount);//select("span").attr("span", 5);

  window.clearInterval(clearScoreTimer)

}

function increaseCollionCount(){
  scoreCount = 0;
  collisionCount++;
  var collision = d3.select(".collisions").select("span").text(collisionCount)
  //debugger
  var xMouse = d3.mouse(this)[0];

}

// function checkCollision(){
//   var xMouse = d3.mouse(this)[0];
//   var yMouse = d3.mouse(this)[1];
//   // console.log(xMouse)
//   // debugger;
// }

var newEnemies = new Enemy(20)
newEnemies.createEnemy();

setInterval(console.log(newEnemies.datum[0].x), 10)



// setTimeout(, 2000)
//console.log(d3.mouse(board))

setInterval(Enemy.prototype.moveEnemy.bind(newEnemies), 2000)
// moveEnemy(20);
var tweenWithCollisionDetection = function(){
  var radiusSum = 30;
  var separation;
  var xDiff;
  var yDiff;
  console.log(d3.select(".player").attr("cx") )
  d3.select(".player").attr("cx") // the x cordinate of the circle
  d3.select(".player").attr("cy") // the y cordinate of the circle
  d3.select(".player").attr("r") // the radius of the circle
  for (var i = 0; i < newEnemies.datum.length; i++){
    xDiff =  newEnemies.datum[i].x - d3.select(".player").attr("cx");
    yDiff = newEnemies.datum[i].y - d3.select(".player").attr("cy");
    separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
    if (separation < radiusSum){
      scoreCount = 0;
      collisionCount++;
    }
  }
}
// var clearScore = function(){
//   setInterval(scoreCount = 0, 2000)
// }

var clearScore = function(){
  scoreCount = 0
  debugger;
}
var clearScoreTimer = function(){
  setInterval(clearScore, 2000)
}
 // setTimeout(clearScore, 2000);
setInterval(clearScoreTimer, 3000)
// setInterval(checkCollision, 20)


// make enemies move
// detect collision
