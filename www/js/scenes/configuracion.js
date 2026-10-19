class Configuracion extends Phaser.Scene {
    constructor() {
        super({ key: 'Configuracion' });
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        // Fondo
        this.add.image(cx, cy, 'menu_bg').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.78);

        // Título
        this.add.text(cx, 80, t('config.title'), {
            fontSize: '52px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        // =============== IDIOMA ===============
        this.add.text(cx - 350, 200, t('config.language'), {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0, 0.5);

        const langEsBtn = this.add.rectangle(cx + 100, 200, 130, 60,
            currentLang === 'es' ? 0x8b3a3a : 0x333333, 0.9)
            .setStrokeStyle(2, 0xc0a060)
            .setInteractive({ useHandCursor: true });

        this.add.text(cx + 100, 200, 'ESPAÑOL', {
            fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const langEnBtn = this.add.rectangle(cx + 280, 200, 130, 60,
            currentLang === 'en' ? 0x8b3a3a : 0x333333, 0.9)
            .setStrokeStyle(2, 0xc0a060)
            .setInteractive({ useHandCursor: true });

        this.add.text(cx + 280, 200, 'ENGLISH', {
            fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        langEsBtn.on('pointerup', () => {
            if (currentLang !== 'es') {
                setLanguage('es');
                this.scene.restart();
            }
        });
        langEnBtn.on('pointerup', () => {
            if (currentLang !== 'en') {
                setLanguage('en');
                this.scene.restart();
            }
        });

        // =============== VOLUMEN ===============
        this.add.text(cx - 350, 320, t('config.music_volume'), {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0, 0.5);

        // Barra de fondo
        this.add.rectangle(cx + 200, 320, 400, 30, 0x222222, 1)
            .setStrokeStyle(2, 0x666666);

        // Relleno del volumen
        const vol = getVolumen();
        this.volFill = this.add.rectangle(cx, 320, 400 * vol, 26, 0xc0a060)
            .setOrigin(0, 0.5);

        this.volText = this.add.text(cx + 470, 320, Math.round(vol * 100) + '%', {
            fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        // Botones − y +
        const volDown = this.add.text(cx - 30, 320, '−', {
            fontSize: '44px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const volUp = this.add.text(cx + 430, 320, '+', {
            fontSize: '40px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        volDown.on('pointerup', () => {
            setVolumen(Math.max(0, getVolumen() - 0.1));
            this.actualizarVolumen();
        });
        volUp.on('pointerup', () => {
            setVolumen(Math.min(1, getVolumen() + 0.1));
            this.actualizarVolumen();
        });

        // =============== CRÉDITOS ===============
        const creditosBtn = this.add.rectangle(cx, 480, 500, 70, 0x2a4a6a, 0.85)
            .setStrokeStyle(3, 0x4a7aaa)
            .setInteractive({ useHandCursor: true });

        this.add.text(cx, 480, t('config.credits'), {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        creditosBtn.on('pointerup', () => this.mostrarCreditos());

        // =============== BOTÓN VOLVER ===============
        const backBtn = this.add.text(cx, GAME_HEIGHT - 60, '← ' + t('common.back'), {
            fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backBtn.on('pointerup', () => this.scene.start('Menu'));
    }

    actualizarVolumen() {
        const vol = getVolumen();
        this.volFill.width = 400 * vol;
        this.volText.setText(Math.round(vol * 100) + '%');

        this.sound.sounds.forEach(sound => {
            if (sound.key === 'ambiente_menu') sound.setVolume(vol * 0.5);
            else if (sound.key === 'puzzle_tension') sound.setVolume(vol * 0.18);
            else if (sound.key === 'ambiente_eugenia' || sound.key === 'ambiente_mateo') sound.setVolume(vol * 0.35);
            else if (sound.key === 'presentacion') sound.setVolume(vol * 0.5);
            else if (sound.key === 'revelacion') sound.setVolume(vol * 0.5);
            else if (sound.key === 'codigo_fenix') sound.setVolume(vol * 0.6);
            else sound.setVolume(vol * 0.7);
        });
    }

    mostrarCreditos() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        const panel = this.add.rectangle(cx, cy, 800, 550, 0x000000, 0.95)
            .setStrokeStyle(3, 0xc0a060);
        panel.setDepth(10);

        const textos = [
            { texto: 'TRATAMIENTO CERO', size: '40px', color: '#c0a060', y: -200 },
            { texto: 'Dos épocas. Una sola voz.', size: '20px', color: '#888888', y: -150, italic: true },
            { texto: '—', size: '20px', color: '#666666', y: -100 },
            { texto: 'Un juego de CÓDIGO FÉNIX', size: '26px', color: '#ffffff', y: -50 },
            // ✅ AQUÍ ESTÁ TU NOMBRE
            { texto: 'Creado por: Álvaro Quintana Gómez', size: '22px', color: '#cccccc', y: 0 },
            { texto: 'Diseño narrativo y programación:', size: '18px', color: '#888888', y: 50 },
            { texto: 'Álvaro Quintana Gómez', size: '22px', color: '#ffffff', y: 80 },
            { texto: '—', size: '20px', color: '#666666', y: 130 },
            { texto: 'Inspirado en The Past Within y Tick Tock', size: '18px', color: '#888888', y: 170, italic: true },
            { texto: '© 2026 Código Fénix. Todos los derechos reservados.', size: '16px', color: '#666666', y: 220 }
        ];

        const elementos = [panel];
        textos.forEach(linea => {
            const el = this.add.text(cx, cy + linea.y, linea.texto, {
                fontSize: linea.size,
                color: linea.color,
                fontFamily: 'Courier New',
                fontStyle: linea.italic ? 'italic' : 'normal',
                wordWrap: { width: 750 },
                align: 'center'
            }).setOrigin(0.5).setDepth(11);
            elementos.push(el);
        });

        const cerrarBtn = this.add.text(cx, cy + 250, t('config.close'), {
            fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#333333',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5).setDepth(11).setInteractive({ useHandCursor: true });

        elementos.push(cerrarBtn);

        cerrarBtn.on('pointerup', () => {
            elementos.forEach(el => el.destroy());
        });
    }
}