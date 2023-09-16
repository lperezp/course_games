
let timeBullet = 0
let bullet
let background
let buttonShot
let enemies

const game = new Phaser.Game(370, 550, Phaser.CANVAS, 'container')

const statePrincipal = {
    preload: () => {
        game.load.image('background', './img/space.png')
        game.load.image('flight', './img/nave.png')
        game.load.image('laser', './img/laser.png')
        game.load.image('enemy', './img/pajaro2.png')

    },
    create: () => {
        background = game.add.tileSprite(0, 0, 370, 550, 'background')
        flight = game.add.sprite(game.width / 2, 500, 'flight')
        flight.anchor.setTo(0.5)
        cursors = game.input.keyboard.createCursorKeys()
        buttonShot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        bullets = game.add.group();
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(20, 'laser')
        bullets.setAll('anchor.x', 0, 5)
        bullets.setAll('anchor.y', 1)
        bullets.setAll('outOfBoundsKill', true)
        bullets.setAll('checkWorldBounds', true)

        enemies = game.add.group()
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                const enemy = enemies.create(x * 40, y * 20, 'enemy')
                enemy.anchor.setTo(0.5)
            }
        }

        enemies.x = 50
        enemies.y = 30

        const animation = game.add.tween(enemies).to({ x: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true)
    },
    update: () => {
        if (cursors.right.isDown) {
            flight.position.x += 3;
        } else if (cursors.left.isDown) {
            flight.position.x -= 3;
        }
        let bullet;
        if (buttonShot.isDown) {
            soundShoot.currentTime = 0;
            soundShoot.play();
            if (game.time.now > timeBullet) {
                bullet = bullets.getFirstExists(false)
            }
            if (bullet) {
                bullet.reset(flight.x, flight.y)
                bullet.body.velocity.y = -300;
                timeBullet = game.time.now + 100
            }
        }
        game.physics.arcade.overlap(bullets, enemies, collision, null, this)
    }
}

function collision(bullet, enemy) {
    soundEnemy.currentTime = 0;
    soundEnemy.play();
    bullet.kill();
    enemy.kill();
}

const loadSound = function (resource) {
    const sound = document.createElement("audio");
    sound.src = resource;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    return sound;
};

const soundShoot = loadSound('./music/shoot.mp3')
const soundEnemy = loadSound('./music/dead_chicken.mp3')
game.state.add('principal', statePrincipal);
game.state.start('principal');