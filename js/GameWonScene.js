export class GameWonScene extends Phaser.Scene {
    constructor(){
        super("GameWonScene");
    }


    preload() {
        this.load.image('gamewon', 'assets/images/gameWon.png');
    }

    create() {
        let bg = this.add.image(160,160, 'gamewon');
        bg.setScale(1/3);
        this.input.on('pointerdown', () => this.scene.start("MenuScene"));
    }
}