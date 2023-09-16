const game = new Phaser.Game(370, 550, Phaser.AUTO, 'container');
let background;
let button;
let flappy;
let keyRight;
let keyLeft;
let keyUp;
let keyDown;
let person;

const statePrincipal = {
    preload: function () {
        game.load.image('background', 'assets/img/bg.jpeg');
        game.load.image('bird', 'assets/img/pajaro1.png');
        game.load.spritesheet('birds', 'assets/img/pajaro.png', 43, 30);
        game.load.spritesheet('people', 'assets/img/persona.png', 64, 64);
    },
    create: function () {
        background = game.add.tileSprite(0, 0, 370, 550, 'background');
        // flappy = game.add.sprite(100, 100, 'birds');
        // flappy.frame = 1;
        // flappy.animations.add('fly', [0, 1, 2], 10, true);
        person = game.add.sprite(game.width / 2, game.height / 2, 'people');
        person.anchor.setTo(0.5);
        person.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        person.animations.add('right', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        person.animations.add('down', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        person.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);

        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(flappy);
        // flappy.body.collideWorldBounds = true;
        game.physics.arcade.enable(person);
        person.body.collideWorldBounds = true;
    },
    update: function () {
        // flappy.animations.play('fly');
        if (keyRight.isDown) {
            // flappy.x++;
            person.position.x += 2;
            person.animations.play('right');
        } else if (keyLeft.isDown) {
            // flappy.x--;
            person.position.x -= 2;
            person.animations.play('left');
        } else if (keyUp.isDown) {
            // flappy.y--;
            person.position.y -= 2;
            person.animations.play('up');
        } else if (keyDown.isDown) {
            // flappy.y++;
            person.position.y += 2;
            person.animations.play('down');
        }
    }
};
game.state.add('principal', statePrincipal);
game.state.start('principal');