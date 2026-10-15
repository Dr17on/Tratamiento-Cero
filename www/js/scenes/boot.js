class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    preload() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.add.text(cx, cy - 60, 'Cargando...', {
            fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.estadoTexto = this.add.text(cx, cy + 60, 'Iniciando...', {
            fontSize: '18px', color: '#c0a060', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const barBg = this.add.rectangle(cx, cy, 500, 20, 0x333333);
        const barFill = this.add.rectangle(cx - 250, cy, 0, 20, 0xc0a060).setOrigin(0, 0.5);

        this.load.on('progress', (value) => {
            barFill.width = 500 * value;
        });

        this.load.on('filecomplete', (key) => {
            this.estadoTexto.setText('✔️ ' + key);
        });

        this.load.on('loaderror', (file) => {
            console.error('❌ FALLÓ:', file.key, '→', file.src);
            this.estadoTexto.setText('❌ Falló: ' + file.key);
        });

        this.load.on('complete', () => {
            console.log('🎉 TODO CARGADO');
        });

        // IMÁGENES
        this.load.image('logo_codigo_fenix', 'assets/img/logo_codigo_fenix.png');
        this.load.image('presentacion_1', 'assets/img/presentacion_1.jpg');
        this.load.image('presentacion_2', 'assets/img/presentacion_2.jpg');
        this.load.image('presentacion_3', 'assets/img/presentacion_3.jpg');
        this.load.image('presentacion_4', 'assets/img/presentacion_4.jpg');
        this.load.image('menu_bg', 'assets/img/menu_bg.jpg');
        this.load.image('retrato_eugenia_joven', 'assets/img/retrato_eugenia_joven.jpg');
        this.load.image('retrato_eugenia_anciana', 'assets/img/retrato_eugenia_anciana.jpg');
        this.load.image('retrato_mateo', 'assets/img/retrato_mateo.jpg');
        this.load.image('fondo_eugenia', 'assets/img/fondo_eugenia.jpg');
        this.load.image('fondo_mateo', 'assets/img/fondo_mateo.jpg');
        this.load.image('reloj_eugenia', 'assets/img/reloj_eugenia.jpg');
        this.load.image('reloj_mateo', 'assets/img/reloj_mateo.jpg');
        this.load.image('pared_nombres', 'assets/img/pared_nombres.jpg');

        // AUDIO OGG
        this.load.audio('codigo_fenix', 'assets/audio/codigo_fenix.ogg');
        this.load.audio('presentacion', 'assets/audio/presentacion.ogg');
        this.load.audio('ambiente_menu', 'assets/audio/ambiente_menu.ogg');
        this.load.audio('ambiente_eugenia', 'assets/audio/ambiente_eugenia.ogg');
        this.load.audio('ambiente_mateo', 'assets/audio/ambiente_mateo.ogg');
        this.load.audio('puzzle_tension', 'assets/audio/puzzle_tension.ogg');
        this.load.audio('acierto', 'assets/audio/acierto.ogg');
        this.load.audio('error', 'assets/audio/error.ogg');
        this.load.audio('revelacion', 'assets/audio/revelacion.ogg');
        this.load.audio('final_giro', 'assets/audio/final_giro.ogg');
    }

    create() {
        // DESBLOQUEAR AUDIO: esperar el primer toque del usuario
        const desbloquear = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume().then(() => {
                    console.log('🔊 AudioContext reanudado:', this.sound.context.state);
                });
            } else if (this.sound.context) {
                console.log('🔊 AudioContext estado:', this.sound.context.state);
            }
            this.input.off('pointerdown', desbloquear);
        };

        this.input.on('pointerdown', desbloquear);

        // Esperar 1 segundo antes de empezar (para dar tiempo al usuario a tocar)
        this.time.delayedCall(800, () => {
            this.scene.start('CodigoFenix');
        });
    }
}