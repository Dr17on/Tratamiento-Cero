class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        this.musica = null;
        if (this.cache.audio.exists('ambiente_menu')) {
            this.musica = this.sound.add('ambiente_menu', {
                loop: true,
                volume: getVolumen() * 0.5
            });
            this.musica.play();
        }

        this.add.image(cx, cy, 'menu_bg').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.55);

        this.add.text(cx, 60, t('menu.title'), {
            fontSize: '60px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(cx, 120, t('menu.subtitle'), {
            fontSize: '26px', color: '#a08868',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(cx, 175, t('menu.select_role'), {
            fontSize: '26px', color: '#ffffff',
            fontFamily: 'Courier New',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        this.crearBotonRol(cx, 360, t('menu.eugenia'), t('menu.eugenia_desc'),
            'retrato_eugenia_joven', 0x8b3a3a, () => this.startGame('eugenia'));

        this.crearBotonRol(cx, 560, t('menu.mateo'), t('menu.mateo_desc'),
            'retrato_mateo', 0x2a4a6a, () => this.startGame('mateo'));

        // Botón de Capítulos (arriba izquierda)
        const chaptersBtn = this.add.text(40, 40, t('menu_chapters'), {
            fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#333333',
            padding: { x: 16, y: 10 }
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        chaptersBtn.on('pointerup', () => {
            if (this.musica) this.musica.stop();
            this.scene.start('Capitulos');
        });

        // Botón de Configuración (arriba derecha)
        const configBtn = this.add.text(GAME_WIDTH - 40, 40, t('menu_settings'), {
            fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#333333',
            padding: { x: 16, y: 10 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

        configBtn.on('pointerup', () => {
            if (this.musica) this.musica.stop();
            this.scene.start('Configuracion');
        });
    }

    crearBotonRol(x, y, nombre, desc, retratoKey, color, callback) {
        const btn = this.add.rectangle(x, y, 820, 170, color, 0.55)
            .setStrokeStyle(3, color, 1)
            .setInteractive({ useHandCursor: true });

        this.add.image(x - 300, y, retratoKey).setDisplaySize(140, 140).setOrigin(0.5);
        this.add.rectangle(x - 300, y, 145, 145, 0x000000, 0)
            .setStrokeStyle(2, 0xc0a060, 0.8);

        this.add.text(x + 60, y - 30, nombre, {
            fontSize: '44px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(x + 60, y + 30, desc, {
            fontSize: '22px', color: '#d0c0a0',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setFillStyle(color, 0.85));
        btn.on('pointerout', () => btn.setFillStyle(color, 0.55));
        btn.on('pointerup', callback);
    }

    startGame(rol) {
        if (this.musica) this.musica.stop();
        localStorage.setItem('tc_rol', rol);
        if (!localStorage.getItem('tc_capitulo')) localStorage.setItem('tc_capitulo', '1');
        if (!localStorage.getItem('tc_capitulo_actual')) localStorage.setItem('tc_capitulo_actual', '1');
        if (!localStorage.getItem('tc_puzzle')) localStorage.setItem('tc_puzzle', '1');
        this.scene.start('Capitulo1');
    }
}