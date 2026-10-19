// ✅ CAMBIO CLAVE: Ajustamos las dimensiones a la proporción de los teléfonos modernos
const GAME_WIDTH = 1600; 
const GAME_HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#000000',
    scale: {
        // ✅ Usamos FIT para que la pantalla se adapte sin cortar nada
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        activePointers: 3
    },
    scene: [Boot, CodigoFenix, Presentacion, Menu, Capitulos, Configuracion, Capitulo1, Interludio, Capitulo2, Capitulo3, Capitulo4, Creditos]
};

detectLanguage();
const game = new Phaser.Game(config);