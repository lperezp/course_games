let background;
let car;
let cursors;
let enemies;
let timer;
let gasoline;
let timerGasoline;

const Game = {
    preload: function () {
        game.load.image('background', './img/bg.png');
        game.load.image('car', './img/carro.png');
        game.load.image('carEnemy', './img/carroMalo.png');
        game.load.image('gasoline', './img/gas.png');
        game.forceSingleUpdate = true;

    },
    create: function () {
        background = game.add.tileSprite(0, 0, 290, 540, 'background');

        car = game.add.sprite(game.width / 2, 496, 'car');
        car.anchor.setTo(0.5);

        enemies = game.add.group();
        game.physics.arcade.enable(enemies, true);
        enemies.enableBody = true;
        enemies.createMultiple(20, 'carEnemy');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);

        gasoline = game.add.group();
        game.physics.arcade.enable(gasoline, true);
        gasoline.enableBody = true;
        gasoline.createMultiple(20, 'gasoline');
        gasoline.setAll('anchor.x', 0.5);
        gasoline.setAll('anchor.y', 0.5);
        gasoline.setAll('outOfBoundsKill', true);
        gasoline.setAll('checkWorldBounds', true);

        timer = game.time.events.loop(1500, this.createCarEnemy, this);

        timerGasoline = game.time.events.loop(2000, this.createGasoline, this);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        background.tilePosition.y += 3;

        if (cursors.right.isDown && car.position.x < 245) {
            car.position.x += 5;
        } else if (cursors.left.isDown && car.position.x > 45) {
            car.position.x -= 5;
        }
    },
    createCarEnemy: function () {
        const position = Math.floor(Math.random() * 3) + 1;
        const enemy = enemies.getFirstDead();
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.reset(position * 73, 0);
        enemy.body.velocity.y = 200;
        enemy.anchor.setTo(0.5)
    },
    createGasoline: function () {
        const position = Math.floor(Math.random() * 3) + 1;
        const gas = gasoline.getFirstDead();
        gas.physicsBodyType = Phaser.Physics.ARCADE;
        gas.reset(position * 73, 0);
        gas.body.velocity.y = 200;
        gas.anchor.setTo(0.5)
    }
}
