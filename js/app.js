
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 4) + 1);
    this.width = 50;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * dt * this.speed;

    // If the bug goes off of the board, reset its position and randomize the multiplier
    if (this.x > 555) {
    	this.speed = Math.floor((Math.random() * 4) + 1);
    	this.reset();
    }
    // Collision
    this.collisions();

    
};

// Helper function to see enemy/player box area
function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};



// Reset the enemy to the left of the board
Enemy.prototype.reset = function() {
	this.x = -200;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // draws boxes around enemy objects
    drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

// Collisions - this is bound to an instance of the enemy
Enemy.prototype.collisions = function() {
    var enemyBox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
    var playerBox = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
    };
    if (enemyBox.x < playerBox.x + playerBox.width &&
        enemyBox.x + enemyBox.width > playerBox.x &&
        enemyBox.y < playerBox.y + playerBox.height &&
        enemyBox.height + enemyBox.y > playerBox.y) {
        // collision detected!
        //console.log("Collision is detected.");
        player.collision();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.x > 20) {
                this.x -= 100;
            }
            break;
        case "right":
            if (this.x < 380) {
                this.x += 100;
            }
            break;
        case "up":
            if (this.y > 0) {
                this.y -= 100;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 100;
            }
            break;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    if (this.y < 5) { // if player reaches the water
        this.reset(); // position resets
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var yVals = [220, 140, 60];
for (var i = 0; i < 6; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = yVals[Math.floor((Math.random() * 3))];
    enemy = new Enemy(x, y);
    allEnemies.push(enemy);
};


player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});