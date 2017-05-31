// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each instance 
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies
    this.sprites = [
        'images/enemy-red.png',
        'images/enemy-purple.png',
        'images/enemy-yellow.png',
        'images/enemy-blue.png',
        'images/enemy-green.png'
    ];

    this.spriteIndex = function(){
        ctx.drawImage(Resources.get(this.sprites[Math.floor(Math.random() * this.sprite.length)]))
    };

    this.sprite = this.sprites;


    // Random speed generator
    this.speed = Math.floor((Math.random() * 4) + 1);
    
    // Enemy collision area
    this.width = 50;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter to ensure
    // the game runs at the same speed for all computers.
    this.x = this.x + 101 * dt * this.speed;

    // If the bug goes off of the board, reset its position and randomize the multiplier
    if (this.x > 777) {
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
    ctx.lineWidth = "";
    ctx.strokeStyle = "";
    ctx.stroke();
};



// Reset the enemy to the left of the board
Enemy.prototype.reset = function() {
	this.x = -111;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    
    // Draws boxes around enemy objects
    // Helped to understand box collision method
    // drawBox(this.x, this.y + 77, 100, 67, "");
};

// Collisions - this is bound to an instance of the enemy
Enemy.prototype.collisions = function() {
    var enemyBox = {
        // Variables applied to each instance 
        x: this.x,
        y: this.y,
        // Enemy collision area
        width: this.width,
        height: this.height
    };
    var playerBox = {
        // Variables applied to each instance 
        x: player.x,
        y: player.y,
        // Enemy collision area
        width: player.width,
        height: player.height
    };

    if (enemyBox.x < playerBox.x + playerBox.width &&
        enemyBox.x + enemyBox.width > playerBox.x &&
        enemyBox.y < playerBox.y + playerBox.height &&
        enemyBox.height + enemyBox.y > playerBox.y) {
        
        // Collision detected!
        console.log("Collision is detected.");
        player.collision();
    }
};

// Player class
var Player = function(x,y) {
    // Load player image
    this.sprite = 'images/char-boy.png';
    // Starting coordinates
    this.x = 300;
    this.y = 400;
    // Player collision area
    this.width = 50;
    this.height = 50;
};

// Player reset method
Player.prototype.reset = function() {
    this.x = 300;
    this.y = 400;
};

// Player update method
Player.prototype.update = function() {
    if (this.x > 111 || this.x < 555) {
        this.y < 6;
    } else { // if player reaches the water
        this.y < 5; // position resets
    }
};

// Player collision method
Player.prototype.collision = function() {
    player.reset();
};

// Player render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    // draws a box around player object
    // drawBox(this.x + 16, this.y + 62, 70, 78, "blue");
};

// Player input handler
Player.prototype.handleInput = function(dir) {

	// Change the player's position based on the user keyboard input
	if (dir == 'up') {
		this.y = this.y - 82;
	} else if (dir == 'down') {
		this.y = this.y + 82;
	} else if (dir == 'left') {
		this.x = this.x - 100;
	} else if (dir == 'right') {
		this.x = this.x + 100;
	}

	// Check the position of the player
	if (this.x < 0) {
		// Player is off to the left side of the board, move the player
		// back to zero
		this.x = 0;

	} else if (this.x > 600) {
		// Player is off to the right side of the board, move the player
		// back to the right-most square (606)
		this.x = 600;

	} else if (this.y > 400) {
		// Player is off the bottom of the board
		this.y = 400;

	} else if (this.y <= 0 && (this.x === 0 || this.x === 600)) {
		// Player made it to one of the two water blocks
        console.log("You drowned!");
        this.reset();

	} else if (this.y < 0) {
        // Player is off the top of the board
        this.y = -10;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Y values for enemy starting
var yVals = [220, 140, 60];
// Random speed generator to create new speed for new enemy
// Controls number of enemies on screen
for (var i = 0; i < 6; i++) {
    // Random speed for new enemy
    var x = Math.floor((Math.random() * -1000) + 1);
    // Random row referencing yVals
    var y = yVals[Math.floor((Math.random() * 3))];
    enemy = new Enemy(x, y);
    // Place new enemy in allEnemies array
    allEnemies.push(enemy);
};

// Starting player object in a variable called player
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});