/*
The rover will have initial starting point (x,y) coordinates (i.e. 0,0)
The rover will have an initial direction (N,E,S,W) to where it is facing
The rover is on a 10 x 10 grid
Implement commands that go forward and backward (f,b)
Implement commands to turn the rover left or right (l,r).
The rover just change the direction it is facing when the user sets this command.
It won't move right or left automatically. To make it change its position, the user needs to specify the change of direction and then the actual movement.

✓ **ITERATION 1
✓1) Create an object to represent the rover that has position and direction attributes
✓2) Create a grid using arrays (hint: do a google search for two-dimensional arrays).
✓3) Write functions for the various commands
✓4) Try to call some of those functions and display the new position of the rover.

✓ **ITERATION 2
We want to be able to send a series of commands to the rover and execute them in sequence.

We will send an array of character commands, which can include:

f for go forward
b for go back
r for turn right*
l for turn left*
*The rover just change its direction when we use this command.
It won't move right or left automatically.
To make it go right or left, the user needs to specify the change of direction and then the actual movement.
So we should be able to tell the rover, for example, ‘fffrfflfffbb’ and it would execute those movements and provide us with its new position.
Furthermore, we need to make sure that the rover never goes off the grid but rather,
wraps from one edge of the grid to another (planets are spheres after all)

✓ *Bonus

In your 10 x 10 grid, place some obstacles that the rover cannot cross or land on
Implement obstacle detection.
The rover should execute the given commands until it reaches an obstacle, then stop at the last possible position and report the obstacle.

✓ *Extra hardcore super bonus

Our rover is lonely! We need to send another one that can roam on the same grid and execute the same commands.
Make sure the rovers don’t bump into each other.


*/


/* ITERATION 1

function checkBoundaries(rover, grid){
  //checks whether the given position is valid
  if((rover.position[0] < 0 || rover.position[1] < 0) || (rover.position[0] > grid.length - 1 || rover.position[1] > grid.length - 1 )){
    return false;
  } else return true;

}

function goForward(rover) {
  var oldPosition = rover.position.slice(0);
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[0]--;
      }
      break;
    case 'E':
      rover.position[1]++;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[1]--;
      }
      break;
    case 'S':
      rover.position[0]--;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[0]++;
      }
      break;
    case 'W':
      rover.position[1]--;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[1]++;
      }
      break;
  }
  //cleaning the old position and updating the new position in the grid
  if(oldPosition != rover.position){
    grid[oldPosition[0]][oldPosition[1]] = " ";
    updatePosition(rover);
  }




  console.log("Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  viewWorld();
}

function goBackward(rover) {
  var oldPosition = rover.position.slice(0);
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[0]++;
      }
      break;
    case 'E':
      rover.position[1]--;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[1]++;
      }
      break;
    case 'S':
      rover.position[0]++;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[0]--;
      }
      break;
    case 'W':
      rover.position[1]++;
      if(!checkBoundaries(rover, grid)){
        console.log("Can't go there");
        rover.position[1]--;
      }
      break;
  }
  //cleaning the old position and updating the new position in the grid
  if(oldPosition != rover.position){
    grid[oldPosition[0]][oldPosition[1]] = " ";
    updatePosition(rover);
  }




  console.log("Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  viewWorld();
}

*/

function createGrid(size){
  //this function returns a grid size * size
  var grid = [];
  for (var i = 0; i < size; i++){
    grid.push([]);
    for (var j = 0; j < size; j++){
        //placing random obstacles in the grid
        if(Math.floor(Math.random() * 11) == 10) grid[i].push("*");
        else grid[i].push(" ");
      }
  }
  return grid;
}

//creating 10*10 grid
var grid = createGrid(10);

function randomPosition(grid){
  //generates a random position for the rover
  var pos = [Math.floor(Math.random()* 10), Math.floor(Math.random() * 10)];
  //checks whether the position generated is free and returns pos, otherwise recalls the function to reroll
  if(!detectObstacle(pos, grid)) return pos;
  else return randomPosition(grid);
}

function randomDirection(){
  //generates a random starting direction
  var dir = Math.floor(Math.random() * 4);
  switch (dir){
    case 0:
        dir = "N";
        break;
    case 1:
        dir = "E";
        break;
    case 2:
        dir = "S";
        break;
    case 3:
        dir = "W";
        break;
  }
  return dir;
}

//rover constructor;
function Rover(){
  this.position = randomPosition(grid);
  this.direction = randomDirection();
}
//generating the 2 rovers
var myRover = new Rover();
var rover2 = new Rover();


function detectObstacle(position, grid){
//checks whether the given position is free, returns true or false
  return grid[position[0]][position[1]] != " ";
  }

//initializing the rover in the grid
updatePosition(myRover);
updatePosition(rover2);

viewWorld();

function updatePosition(rover){
  //updates rover position in the grid
  var arrow;
  switch(rover.direction){
    case "N":
        arrow = "▲";
        break;
    case "W":
        arrow = "◄";
        break;
    case "S":
        arrow = "▼";
        break;
    case "E":
        arrow = "►";
        break;
  }
  grid[rover.position[0]][rover.position[1]] = arrow;
       }

function goLeft(rover){
  //rotates direction counterclockwise
   switch(rover.direction) {
       case "N":
           rover.direction = "W";
           break;
       case "W":
           rover.direction = "S";
           break;
       case "S":
           rover.direction = "E";
           break;
       case "E":
           rover.direction = "N";
           break;

   }
  updatePosition(rover);
}


function goRight(rover){
 //rotates direction clockwise
   switch(rover.direction) {
       case "N":
           rover.direction = "E";
           break;
       case "E":
           rover.direction = "S";
           break;
       case "S":
           rover.direction = "W";
           break;
       case "W":
           rover.direction = "N";
           break;
   }
   updatePosition(rover);
 }





function correctPosition(rover, grid){
  //this function adjust the rover position near the grid borders
  if(rover.position[0] < 0) rover.position[0] = grid.length - 1;
  if(rover.position[1] < 0) rover.position[1] = grid.length - 1;
  if(rover.position[0] > grid.length - 1) rover.position[0] = 0;
  if(rover.position[1] > grid.length - 1) rover.position[1] = 0;

}

function goForward(rover) {
  var changed = 0;
  var oldPosition = rover.position.slice(0);
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]--;
      break;
  }
  //cleaning the old position and updating the new position in the grid
  correctPosition(rover, grid);
  if(detectObstacle(rover.position, grid)){
    rover.position = oldPosition;
    console.log("Obstacle ahead detected, cannot proceed.");
  } else {
    grid[oldPosition[0]][oldPosition[1]] = " ";
    updatePosition(rover);
    changed = 1;
  }

  console.log("Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  //returns wether the position has changed(1) or not(0)
  return changed;
}

function goBackward(rover) {
  var changed = 0;
  var oldPosition = rover.position.slice(0);
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]++;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }
  //cleaning the old position and updating the new position in the grid
  correctPosition(rover, grid);
  if(detectObstacle(rover.position, grid)) {
    console.log("Obstacle ahead detected, cannot proceed.");
    rover.position = oldPosition;
  }
  else {
    grid[oldPosition[0]][oldPosition[1]] = " ";
    updatePosition(rover);
    changed = 1;
  }

  console.log("Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  //returns wether the position has changed(1) or not(0)
  return changed;
}

function viewWorld(){
  //visualize the grid
  for (var i = grid.length - 1; i >= 0; i--){
    var row = "";
    for (var j = 0; j < grid.length; j++)
      row += grid[i][j];
    console.log(row);
   }
}

//converts the user input to a lowercase string
var commands = String(prompt("Type f for go forward, b for go back, r for turn right, l for turn left, you can input multiple commands eg. \"fflrbb\"")).toLowerCase();


function execCommands(command){
  //this function access the string via bracket notation and execs the commands given if they're present in the switch cases (f b l r)
  //rover2 added on the go, i'll submit a better function tomorrow.
  for (var i = 0; i < command.length; i++){
    var keepGoing1 = 1, keepGoing2 = 1;
    viewWorld();
    switch (command[i]){
        case "f":
            if(keepGoing1) keepGoing1 = goForward(myRover);
            if(keepGoing2) keepGoing2 = goForward(rover2);
            break;
        case "b":
            if(keepGoing1) keepGoing1 = goBackward(myRover);
            if(keepGoing2) keepGoing2 = goBackward(rover2);
            break;
        case "l":
            goLeft(myRover);
            goLeft(rover2);
            break;
        case "r":
            goRight(myRover);
            goLeft(rover2);
            break;
  }
    if(!keepGoing1 && !keepGoing2) break;
  }
}

execCommands(commands);
