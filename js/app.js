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

    this.spriteIndex = Math.random() * this.sprites.length;

    this.sprite = this.sprites[this.spriteIndex];

    this.sprite = this.sprites;

    this.assignRandomSprite();

    // Random speed generator
    this.speed = Math.floor((Math.random() * 4) + 1);
    
    // Enemy collision area
    this.width = 50;
    this.height = 50;
};

Enemy.prototype.assignRandomSprite = function() {
  this.spriteIndex = Math.floor(Math.random() * this.sprites.length);
  this.sprite = this.sprites[this.spriteIndex];
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
    this.assignRandomSprite();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Draws boxes around enemy objects
    // Helped to understand box collision method
    drawBox(this.x, this.y, 100, 67, "");
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
    this.sprite = 'images/char-cat-girl.png';
    // Starting coordinates
    this.x = 321;
    this.y = 467;
    // Player collision area
    this.width = 50;
    this.height = 50;
};

// Player reset method
Player.prototype.reset = function() {
    this.x = 321;
    this.y = 467;
};

// Player update method
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

// Player collision method
Player.prototype.collision = function() {
    player.reset();
};

Player.prototype.flowerPower = function(color) {
    player.power = player.sprite = 'images/cat-girl-' + color + '.png';
}

// Player render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    // draws a box around player object
    drawBox(this.x, this.y, 70, 78, "blue");
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

	} else if (this.y > 500) {
		// Player is off the bottom of the board
		this.y = 467;

	} else if (this.y <= 0 && (this.x === 0 || this.x === 600)) {
		// Player made it to one of the two water blocks
        console.log("You drowned!");
        this.reset();

	} else if (this.y < 0) {
        // Player is off the top of the board
        this.y = -10;
    }
};

// Create flower object
var Flower = function(color, x, y) {
    this.color = color;

    this.sprite = 'images/flower-' + color + '.png';

    this.x = x;
    this.y = y;

    this.width = 25;
    this.height = 25;
};

Flower.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // draws a box around flower object
     drawBox(this.x, this.y, 70, 78, "blue");
};

Flower.prototype.update = function() {
    this.power();
}

// Collisions - this is bound to an instance of the flower
Flower.prototype.power = function() {
    var flowerBox = {
        // Variables applied to each instance 
        x: this.x,
        y: this.y,
        // Flower collision area
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

    if (flowerBox.x < playerBox.x + playerBox.width &&
        flowerBox.x + flowerBox.width > playerBox.x &&
        flowerBox.y < playerBox.y + playerBox.height &&
        flowerBox.height + flowerBox.y > playerBox.y) {
        
        // Collision detected!
        console.log("Flower Power!");
        // Move flower of screen
        this.x = -100;
        this.y = -100;

        player.flowerPower(this.color);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Y values for enemy starting
var yValsEnemy = [220, 140, 60];

// Random speed generator to create new speed for new enemy
// Controls number of enemies on screen
for (var i = 0; i < 7; i++) {
    // Random speed for new enemy
    var x = Math.floor((Math.random() * -1000) + 1);
    // Random row referencing yVals
    var y = yValsEnemy[Math.floor(Math.random() * 3)];
    enemy = new Enemy(x, y);
    // Place new enemy in allEnemies array
    allEnemies.push(enemy);
};

// Instantiate player object 
player = new Player();

// Instantiate the flowers
var colors = ['red', 'blue', 'orange', 'purple', 'pink'];
var xValsFlowers = [15, 115, 220, 320, 420, 520, 620];
var yValsFlowers = [220, 135, 300];
var allFlowers = [];
for (var j = 0; j < 5; j++) {
    var x = xValsFlowers[Math.floor(Math.random() * 7)];
    var y = yValsFlowers[Math.floor(Math.random() * 3)];
    flower = new Flower(colors[j], x, y);
    allFlowers.push(flower);
}

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