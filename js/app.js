let playerChars = [
    "images/char-pink-girl.png",
    "images/char-horn-girl.png",
    "images/char-boy.png"
];

let highScore=0,currentScore=0,timeGame=0;
// random method to Select random image for player and to choose random speed in the case of eneimes 
let random = function(low_value,high_value){
   let r =Math.floor(Math.random()*(high_value-low_value+1)+low_value);
    return r ;
}

// Enemies our player must avoid
let Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.maximumSpeed = 450;
    this.minimumSpeed = 80;
    this.speed = random(this.maximumSpeed,this.minimumSpeed);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        this.x = this.x  + this.speed*dt;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x > 550){
            this.speed = random(450,80);
            this.x = -50;
        }
    };

// Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Now write your own player class
let Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite =playerChars[random(0,2)];
};
    // This class requires an update(), render() and
    // a handleInput() method.

    Player.prototype.update = function(){
        if (this.y < 55){
            this.reset();
            currentScore += 1   
        }
        //detection for collisions with the enemeys
        for (i=0;i<allEnemies.length;i++){
            //axis that make collisions betwwen player and enemies  
          if (((this.y-9)==(allEnemies[i].y))&&(this.x > allEnemies[i].x -75)&&(this.x < allEnemies[i].x+75)){
             this.reset();
             //currentScore will count again from 0 but highscore remains
             currentScore = 0;
             timeGame++;
          }
        }
        //updating the currentScore 
        if(highScore < currentScore){
            highScore = currentScore;
        }
            //update the currentScore and the highscore for the user on screen
                document.querySelector('#score').innerHTML = "Current Score :  " + currentScore + "<br> Number of attempts : "+timeGame+"<br> High Score : " + highScore;
                if (currentScore == 5) {

                document.querySelector('#score').innerHTML = "Current Score :  " + currentScore + "<br> Number of attempts : "+timeGame+"<br> High Score : " + highScore + " <br> You did It!!<br> You are the best <br> You Reached 10 Times ♥ ";

            }
    }
    
    Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    Player.prototype.handleInput = function(input){
        // Key inputs, on detection of key this function moves the player according to the key pressed and according to the widht and hieght of the png images.

        if (input == "up") {
            this.y -= 83;
        }
        else if (input == "down") {
            this.y += 83;
        }
        else if (input == "left"){
            this.x -= 101;
        }
        else if (input == "right") {
            this.x += 101;
        }
     // boundries for the players so that they should not go outside the canvas.

        //for y axis boundary check
        if (this.y < -11){
            this.y += 83;
        }
        if (this.y > 404 ){
            this.y -= 83;
        }
        // for x axis boundry check
        if (this.x > 404){
            this.x -= 101;
        }
        if(this.x < 0){
            this.x += 101;
        }
    }
    // Changes the position of the player back to the initial.
    Player.prototype.reset = function(){
        this.x = 202;
        this.y = 404;
    };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(0,63),
    new Enemy(-50,146),
    new Enemy(-20,229)
]
// Place the player object in a variable called player
let player =  new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left', // left  arrow key
        38: 'up',   // up    arrow key
        39: 'right',// right arrow key
        40: 'down', // down  arrow key
 };

    player.handleInput(allowedKeys[e.keyCode]);
});
