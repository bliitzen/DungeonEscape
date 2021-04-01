import Player from "./Player.js";

var hasKey = false;
var doorBoy;
var doorBoy2;
var keyText;
var hintText;
var tprPText;
var tplPText;
var btrPText;
var btlPText;
var tprCText;
var tplCText;
var btrCText;
var btlCText;

export default class LevelTwo extends Phaser.Scene {
    constructor() {
        super("LevelTwo");
    }

    preload() {
        Player.preload(this);

        this.load.image('tiles', 'assets/images/Dungeon_Tileset.png');
        this.load.tilemapTiledJSON('map2', 'assets/images/map3.json');
        this.load.image('closeddoor', 'assets/images/door_closed.png');
        this.load.image('opendoor', 'assets/images/door_open.png');
    }

    create() {
        const map2 = this.make.tilemap({key: 'map2'});
        const tileset = map2.addTilesetImage('Dungeon_Tileset', 'tiles', 16, 16, 0, 0);
        const layer1 = map2.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map2.createStaticLayer('Tile Layer 2', tileset, 0, 0);
        const layer3 = map2.createStaticLayer('Tile Layer 3', tileset, 0, 0);

        layer1.setCollisionByProperty({collides:true});
        layer2.setCollisionByProperty({collides:true});
        layer3.setCollisionByProperty({collides:true});

        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.matter.world.convertTilemapLayer(layer3);

        doorBoy2 = this.add.image(144,17, 'opendoor');
        doorBoy = this.add.image(144,17, 'closeddoor');
        hintText = this.add.text(85, 150, '', { fontSize: '10px', fill: '#fff'});
        keyText = this.add.text(178, 30, 'Find the key to escape!', { fontSize: '10px', fill: '#fff'});
        this.player = new Player({scene:this, x:100, y:100, texture:'archerani', frame:'archer_idle_1'});

        btrPText = this.add.text(150, 240, '', { fontSize: '10px', fill: '#fff'});
        tprPText = this.add.text(180, 120, '', { fontSize: '10px', fill: '#fff'});
        btlPText = this.add.text(50, 245, '', { fontSize: '10px', fill: '#fff'});
        tplPText = this.add.text(60, 120, '', { fontSize: '10px', fill: '#fff'});

        btrCText = this.add.text(230, 285, '', { fontSize: '10px', fill: '#fff'});
        tprCText = this.add.text(185, 50, '', { fontSize: '10px', fill: '#fff'});
        btlCText = this.add.text(70, 280, '', { fontSize: '10px', fill: '#fff'});
        tplCText = this.add.text(20, 35, '', { fontSize: '10px', fill: '#fff'});

        this.add.existing(this.player);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    gameWon() {
        this.scene.start("GameWonScene");
    }

    update(){
        this.player.update();

        // Player is near door
        if(this.player.x >= 130 && this.player.x <= 150 && this.player.y <= 45){
            if(hasKey === true) {
                doorBoy.destroy();
                this.gameWon();
            }
        }

        // Player near top-left ccp
        if(this.player.x >= 80 && this.player.x <= 90 && this.player.y >= 90 && this.player.y <= 120){
            tplPText.text = 'I dont know sorry!';
        } else {
            tplPText.text = '';
        }

        // Player near top-right ccp
        if(this.player.x >= 228 && this.player.x <= 250 && this.player.y >= 90 && this.player.y <= 120){
            tprPText.text = 'Scram scum!!';
        } else {
            tprPText.text = '';
        }

        // Player near bot-right ccp - holds hint
        if(this.player.x >= 228 && this.player.x <= 250 && this.player.y >= 220 && this.player.y <= 245){
            btrPText.text = 'Try the bottom left crate';
        } else {
            btrPText.text = '';
        }

        // Player near bot-left ccp
        if(this.player.x >= 80 && this.player.x <= 105 && this.player.y >= 200 && this.player.y <= 250){
            btlPText.text = 'Haha! You will never escape';
        } else {
            btlPText.text = '';
        }

        // Player near top-left crate
        if(this.player.x >= 20 && this.player.x <= 60 && this.player.y >= 40 && this.player.y <= 85){
            tplCText.text = 'Crate empty';
            hintText.text = 'Try asking someone for help...';
        } else {
            tplCText.text = '';
        }

        // Player near top-right crate
        if(this.player.x >= 270 && this.player.x <= 300 && this.player.y >= 40 && this.player.y <= 80){
            tprCText.text = 'Crate empty';
            hintText.text = 'Try asking someone for help...';
        } else {
            tprCText.text = '';
        }

        // Player near bot-left crate - end game
        if(this.player.x >= 20 && this.player.x <= 60 && this.player.y >= 260 && this.player.y <= 300){
            hasKey = true;
            keyText.text = 'You found the key!';
            btlCText.text = 'Yes the key! Time to escape';
        } else {
            btlCText.text = '';
        }

        // Player near bot-right crate
        if(this.player.x >= 270 && this.player.x <= 300 && this.player.y >= 260 && this.player.y <= 300){
            btrCText.text = 'Crate empty';
            hintText.text = 'Try asking someone for help...';
        } else {
            btrCText.text = '';
        }

    }
}
