const game = new Phaser.Game(290, 540, Phaser.CANVAS, 'container');

game.state.add('Game', Game);
// game.state.add('Finish', Finish);
game.state.start('Game');
