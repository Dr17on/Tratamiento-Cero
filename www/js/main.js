const GAME_WIDTH = 1340;
const GAME_HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: { activePointers: 3 },
    scene: [Boot, CodigoFenix, Presentacion, Menu, Capitulos, Configuracion, Capitulo1, Interludio, Capitulo2, Capitulo3, Capitulo4, Creditos]
};

detectLanguage();
const game = new Phaser.Game(config);