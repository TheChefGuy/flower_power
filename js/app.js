//This is the speed. I wouldn't recommend changing it.
var Speed = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
};


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Speed(65, 255);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -111;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.handleInput = function(dir) {

    if (dir === 'up') {
        this.y = this.y - 85;
    } else if (dir === 'down') {
        this.y = this.y + 85;
    } else if (dir === 'left') {
        this.x = this.x - 100;
    } else if (dir === 'right') {
        this.x = this.x + 100;
    } else {
        // do nothing, user gave an invalid input
    };

    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 0) {
        this.reset();
    } else if (this.y > 400) {
        this.y = 400;
    };

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var yVals = [220, 140, 60];
for (var i = 0; i < 11; i++) {
    var x = Math.floor((Math.random() * -10000) + 1);
    var y = yVals[Math.floor((Math.random() * 2))];
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