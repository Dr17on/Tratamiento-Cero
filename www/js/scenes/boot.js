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

        const barBg = this.add.rectangle(cx, cy, 500, 20, 0x333333);
        const barFill = this.add.rectangle(cx - 250, cy, 0, 20, 0xc0a060).setOrigin(0, 0.5);

        this.load.on('progress', (value) => { barFill.width = 500 * value; });
        this.load.on('loaderror', (file) => {
            console.error('❌ FALLÓ:', file.key, '→', file.src);
        });

        // LOGO
        this.load.image('logo_codigo_fenix', 'assets/img/logo_codigo_fenix.png');

        // PRESENTACIÓN
        this.load.image('presentacion_1', 'assets/img/presentacion_1.jpg');
        this.load.image('presentacion_2', 'assets/img/presentacion_2.jpg');
        this.load.image('presentacion_3', 'assets/img/presentacion_3.jpg');
        this.load.image('presentacion_4', 'assets/img/presentacion_4.jpg');

        // MENÚ Y RETRATOS
        this.load.image('menu_bg', 'assets/img/menu_bg.jpg');
        this.load.image('retrato_eugenia_joven', 'assets/img/retrato_eugenia_joven.jpg');
        this.load.image('retrato_eugenia_anciana', 'assets/img/retrato_eugenia_anciana.jpg');
        this.load.image('retrato_mateo', 'assets/img/retrato_mateo.jpg');

        // CAPÍTULO 1
        this.load.image('fondo_eugenia', 'assets/img/fondo_eugenia.jpg');
        this.load.image('fondo_mateo', 'assets/img/fondo_mateo.jpg');
        this.load.image('reloj_eugenia', 'assets/img/reloj_eugenia.jpg');
        this.load.image('reloj_mateo', 'assets/img/reloj_mateo.jpg');
        this.load.image('pared_nombres', 'assets/img/pared_nombres.jpg');

        // CAPÍTULO 2 — visuales (sin texto)
        this.load.image('fondo_cap2_eugenia', 'assets/img/fondo_cap2_eugenia.jpg');
        this.load.image('fondo_cap2_mateo', 'assets/img/fondo_cap2_mateo.jpg');
        this.load.image('panel_electrodos', 'assets/img/panel_electrodos.jpg');
        this.load.image('pared_simbolos', 'assets/img/pared_simbolos.jpg');
        this.load.image('cinta_audio', 'assets/img/cinta_audio.jpg');
        this.load.image('puerta_47', 'assets/img/puerta_47.jpg');
        this.load.image('paciente_cero', 'assets/img/paciente_cero.jpg');

        // CAPÍTULO 2 — bilingües (con texto)
        this.load.image('transcripcion_es', 'assets/img/transcripcion_es.jpg');
        this.load.image('transcripcion_en', 'assets/img/transcripcion_en.jpg');
        this.load.image('transcripcion_completa_es', 'assets/img/transcripcion_completa_es.jpg');
        this.load.image('transcripcion_completa_en', 'assets/img/transcripcion_completa_en.jpg');
        this.load.image('espejo_roto_es', 'assets/img/espejo_roto_es.jpg');
        this.load.image('espejo_roto_en', 'assets/img/espejo_roto_en.jpg');
        this.load.image('espejo_eugenia_es', 'assets/img/espejo_eugenia_es.jpg');
        this.load.image('espejo_eugenia_en', 'assets/img/espejo_eugenia_en.jpg');
        this.load.image('diario_paginas_es', 'assets/img/diario_paginas_es.jpg');
        this.load.image('diario_paginas_en', 'assets/img/diario_paginas_en.jpg');

        // AUDIO CAP 1
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

        // AUDIO CAP 2
        this.load.audio('ambiente_cap2_eugenia', 'assets/audio/ambiente_cap2_eugenia.ogg');
        this.load.audio('ambiente_cap2_mateo', 'assets/audio/ambiente_cap2_mateo.ogg');
        this.load.audio('puzzle_completar', 'assets/audio/puzzle_completar.ogg');
        this.load.audio('puzzle_ordenar', 'assets/audio/puzzle_ordenar.ogg');
        this.load.audio('revelacion_cap2', 'assets/audio/revelacion_cap2.ogg');
    }

    create() {
        this.time.delayedCall(800, () => {
            this.scene.start('CodigoFenix');
        });
    }
}