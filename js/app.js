// Enemies our player must avoid
const Enemy = function (posX, posY, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = posX;
    this.y = posY;
    this.vel = velocity;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.vel * dt; // position = velocity * time

    // checks if the enemy is beyond the map, if it is, it resets position and velocity
    [this.x, this.vel] = this.x > 550 ? [-100, 100 + Math.floor(Math.random() * 300)] : [this.x, this.vel];

    if (player.x < this.x + 60 && // checks to see if the player is in the radius of an enemy
        player.x > this.x - 40 &&
        player.y < this.y + 25 &&
        player.y > this.y - 25) {
        player.x = 200;
        player.y = 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (posX, posY, velocity) {
    // Just like Enemy, we assign a position and velocity for the player
    this.x = posX;
    this.y = posY;
    this.vel = velocity;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () { 
    this.y = this.y > 380 ? 380 : this.y; // for when the player tries to leave the bottom of the map
    this.x = this.x > 400 ? 400 : this.x; // for when the player tries to leave right of the map
    this.x = this.x < 0 ? 0 : this.x; // for when the player tries to leave left of the map
    [this.x, this.y] = this.y < 0 ? [200, 300] : [this.x, this.y]; // for when the player reaches the top of the map
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) { // controls the player input for moving the player
        case 'left':
            this.x -= this.vel + 50;
            break;
        case 'up':
            this.y -= this.vel + 35;
            break;
        case 'right':
            this.x += this.vel + 50;
            break;
        case 'down':
            this.y += this.vel + 35;
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

const player = new Player(200, 300, 50); // velocity is 50 so player is always center of blocks
const enemyPositions = [60, 140, 220]; // positions that will be set for enemies

enemyPositions.forEach((y) => { // we apply the enemy positions and concat them to the allEnemies array
    let enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 300)); // enemies start left side and go right at a random velocity
    allEnemies = allEnemies.concat([enemy]);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
