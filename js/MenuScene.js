export class MenuScene extends Phaser.Scene {
    constructor(){
        super("MenuScene");
    }


    preload() {
        this.load.image('mainmenu', 'assets/images/mainMenu.png');
    }

    create() {
        let bg = this.add.image(160,160, 'mainmenu');
        bg.setScale(1/3);
        this.input.on('pointerdown', () => this.scene.start("LevelOne"));
    }
}