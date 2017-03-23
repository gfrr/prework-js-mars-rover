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


function createGrid(size){
  //this function returns a grid size * size
  var grid = [];
  for (var i = 0; i < size; i++){
    grid.push([]);
    for (var j = 0; j < size; j++){
        //placing random obstacles in the grid
        if(Math.floor(Math.random() * (size + 1)) == size) grid[i].push("*");
        else grid[i].push(" ");
      }
  }
  return grid;
}


function randomPosition(grid){
  //generates a random position for the rover
  var pos = [Math.floor(Math.random()* grid.length), Math.floor(Math.random() * grid.length)];
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


function Rover(){
  //rover constructor;
  this.position = randomPosition(grid);
  this.direction = randomDirection();
}


function detectObstacle(position, grid){
//checks whether the given position is free, returns true or false
  return grid[position[0]][position[1]] != " ";
  }


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


function exec(command){
  //this function access the string via bracket notation and execs the commands given if they're present in the switch cases (f b l r)
  var keepGoing = [1, 1];
  for (var i = 0; i < command.length; i++){
    for (var j = 0; j < roverArray.length; j++){
      if (keepGoing[j] == 1){
        switch(command[i]){
          case "f":
            keepGoing[j] = goForward(roverArray[j]);
            break;
          case "b":
            keepGoing[j] = goBackward(roverArray[j]);
            break;
          case "l":
            goLeft(roverArray[j]);
            break;
          case "r":
            goRight(roverArray[j]);
            break;

        }
        console.log("Rover " + j + " Position: [" + roverArray[j].position[0] + ", " + roverArray[j].position[1] + "]");
      }
    }
    viewWorld();
    if (!keepGoing[0] && !keepGoing[1]) break;
  }

}

//creating 10*10 grid
var grid = createGrid(10);

//generating the 2 rovers
var roverArray = [];
roverArray.push(new Rover());
roverArray.push(new Rover());


//initializing the rover in the grid
updatePosition(roverArray[0]);
updatePosition(roverArray[1]);


viewWorld();

//converts the user input to a lowercase string
var commands = String(prompt("Type f for go forward, b for go back, r for turn right, l for turn left, you can input multiple commands eg. \"fflrbb\"")).toLowerCase();

exec(commands);
