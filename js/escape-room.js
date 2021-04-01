import { MenuScene } from "./MenuScene.js";
import { GameWonScene } from "./GameWonScene.js";
import LevelOne from "./LevelOne.js";
import LevelTwo from './LevelTwo.js';


const config = {
    width: 320,
    height: 320,
    backgroundColor: '#999999',
    type: Phaser.AUTO,
    parent: 'escape-room-game',
    scene: [MenuScene, LevelOne, LevelTwo, GameWonScene],
    scale: {
        zoom: 2
    },   
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity:{y:0}
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision',
            }
        ]
    }
}

new Phaser.Game(config);
