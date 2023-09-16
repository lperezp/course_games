const game = new Phaser.Game(370, 550, Phaser.AUTO, 'container');
let background;
let button;
let flappy;
let keyRight;
let keyLeft;
let keyUp;
let keyDown;

const statePrincipal = {
    preload: function () {
        game.load.image('background', 'assets/img/bg.jpeg');
        game.load.image('bird', 'assets/img/pajaro1.png');
        game.load.spritesheet('birds', 'assets/img/pajaro.png', 43, 30);
        game.load.image('button', 'assets/img/btn.png');
    },
    create: function () {
        background = game.add.tileSprite(0, 0, 370, 550, 'background');
        flappy = game.add.sprite(100, 100, 'birds');
        flappy.frame = 1;
        flappy.animations.add('fly', [0, 1, 2], 10, true);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    },
    update: function () {
        flappy.animations.play('fly');
        if (keyRight.isDown) {
            flappy.x++;
        } else if (keyLeft.isDown) {
            flappy.x--;
        } else if (keyUp.isDown) {
            flappy.y--;
        } else if (keyDown.isDown) {
            flappy.y++;
        }
    }
};
game.state.add('principal', statePrincipal);
game.state.start('principal');