var ball;
var database,position;

function setup(){
    //creating the database
    database= firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    //setting the position of the ball
    var ballposition = database.ref('ball/position');
    ballposition.on("value",readPosition,showError);
}

function draw(){
    //commands for each direction
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//how the commands are supposed to work
function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

//reading the data from the database
function readPosition(data) {
    position = data.val();
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

//to show error in the codes
function showError() {
    console.log("error in writing to the database");
}