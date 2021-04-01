import Player from "./Player.js";

var keyBoy;
var hasKey = false;
var doorBoy;
var doorBoy2;
var keyText;

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super("LevelOne");
    }

    preload() {
        Player.preload(this);
        this.load.image('tiles', 'assets/images/Dungeon_Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map2.json');
        this.load.image('closeddoor', 'assets/images/door_closed.png');
        this.load.image('opendoor', 'assets/images/door_open.png');
        this.load.image("key", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fkey.png?1539353651419");
    }

    create() {
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Dungeon_Tileset', 'tiles', 16, 16, 0, 0);
        const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', tileset, 0, 0);

        layer1.setCollisionByProperty({collides:true});
        layer2.setCollisionByProperty({collides:true});
        layer3.setCollisionByProperty({collides:true});

        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.matter.world.convertTilemapLayer(layer3);

        doorBoy2 = this.add.image(144,17, 'opendoor');
        doorBoy = this.add.image(144,17, 'closeddoor');
        this.player = new Player({scene:this, x:100, y:100, texture:'archerani', frame:'archer_idle_1'});

        keyText = this.add.text(165, 40, 'Find the key to escape!', { fontSize: '11px', fill: '#fff'});

        this.add.existing(this.player);
        keyBoy = this.add.sprite(280,280, 'key');
        keyBoy.setScale(0.5);
        

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

    }

    nextLevel() {
        this.scene.start("LevelTwo");
    }

    update(){
        this.player.update();

        // Player is near door
        if(this.player.x >= 130 && this.player.x <= 150 && this.player.y <= 45){
            if(hasKey === true) {
                doorBoy.destroy();
                this.nextLevel();
            }   
        }

        // Player is near the key
        if(this.player.x >= 270 && this.player.x <= 290 && this.player.y >= 270 && this.player.y <= 290) {
            hasKey = true;
            keyBoy.destroy();
            keyText.text = "You found the key!";
        }

    }
}