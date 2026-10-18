const INTERLUDIOS = {
    1: [
        { rol: 'narr',   key: 'int1_narr1' },
        { rol: 'eugenia', key: 'int1_eugenia1' },
        { rol: 'mateo',  key: 'int1_mateo1' },
        { rol: 'eugenia', key: 'int1_eugenia2' },
        { rol: 'mateo',  key: 'int1_mateo2' },
        { rol: 'narr',   key: 'int1_narr2' }
    ],
    2: [
        { rol: 'narr',   key: 'int2_narr1' },
        { rol: 'mateo',  key: 'int2_mateo1' },
        { rol: 'eugenia', key: 'int2_eugenia1' },
        { rol: 'mateo',  key: 'int2_mateo2' },
        { rol: 'eugenia', key: 'int2_eugenia2' },
        { rol: 'narr',   key: 'int2_narr2' }
    ],
    3: [
        { rol: 'narr',   key: 'int3_narr1' },
        { rol: 'eugenia', key: 'int3_eugenia1' },
        { rol: 'mateo',  key: 'int3_mateo1' },
        { rol: 'eugenia', key: 'int3_eugenia2' },
        { rol: 'mateo',  key: 'int3_mateo2' },
        { rol: 'narr',   key: 'int3_narr2' }
    ],
    4: [
        { rol: 'narr',   key: 'int4_narr1' },
        { rol: 'eugenia', key: 'int4_eugenia1' },
        { rol: 'mateo',  key: 'int4_mateo1' },
        { rol: 'eugenia', key: 'int4_eugenia2' },
        { rol: 'mateo',  key: 'int4_mateo2' },
        { rol: 'eugenia', key: 'int4_eugenia3' },
        { rol: 'narr',   key: 'int4_narr2' },
        { rol: 'narr',   key: 'int4_narr3' }
    ]
};

const INTERLUDIO_VISUAL = {
    1: { fondo: 'fondo_eugenia', retratoEugenia: 'retrato_eugenia_joven', retratoMateo: 'retrato_mateo' },
    2: { fondo: 'fondo_cap2_eugenia', retratoEugenia: 'retrato_eugenia_joven', retratoMateo: 'retrato_mateo' },
    3: { fondo: 'fondo_mateo', retratoEugenia: 'retrato_eugenia_joven', retratoMateo: 'retrato_mateo' },
    4: { fondo: 'fondo_cap2_mateo', retratoEugenia: 'retrato_eugenia_anciana', retratoMateo: 'retrato_mateo' }
};

class Interludio extends Phaser.Scene {
    constructor() {
        super({ key: 'Interludio' });
    }

    init(data) {
        this.numInterludio = data.numero || 1;
        this.capituloSiguiente = data.siguiente || 'Menu';
    }

    create() {
        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.visual = INTERLUDIO_VISUAL[this.numInterludio] || INTERLUDIO_VISUAL[1];

        this.musicaInt = null;
        if (this.cache.audio.exists('ambiente_interludio')) {
            this.musicaInt = this.sound.add('ambiente_interludio', { loop: true, volume: getVolumen() * 0.4 });
            this.musicaInt.play();
        }

        this.cameras.main.setBackgroundColor('#000000');
        this.bgImage = this.add.image(cx, cy, this.visual.fondo).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.72);

        const tinte = (this.numInterludio % 2 === 0) ? 0x1a2a5a : 0xd4a050;
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, tinte, 0.08);

        this.add.rectangle(cx, 40, GAME_WIDTH, 80, 0x000000, 0.7);
        this.add.rectangle(cx, GAME_HEIGHT - 40, GAME_WIDTH, 80, 0x000000, 0.7);

        this.retratoEugenia = this.add.image(140, 320, this.visual.retratoEugenia)
            .setDisplaySize(200, 200).setOrigin(0.5).setAlpha(0.4).setTint(0x666666);
        this.add.rectangle(140, 320, 205, 205, 0x000000, 0).setStrokeStyle(2, 0x8b6b3a, 0.6).setAlpha(0.4);

        this.retratoMateo = this.add.image(GAME_WIDTH - 140, 320, this.visual.retratoMateo)
            .setDisplaySize(200, 200).setOrigin(0.5).setAlpha(0.4).setTint(0x666666);
        this.add.rectangle(GAME_WIDTH - 140, 320, 205, 205, 0x000000, 0).setStrokeStyle(2, 0x4a7aaa, 0.6).setAlpha(0.4);

        this.add.text(cx, 60, t('interludio.title') + ' ' + this.numInterludio, {
            fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);
        this.add.rectangle(cx, 95, 400, 1, 0xc0a060);

        const cajaY = GAME_HEIGHT - 200;
        this.cajaDialogo = this.add.rectangle(cx, cajaY, GAME_WIDTH - 100, 180, 0x0a0a0a, 0.95).setStrokeStyle(2, 0x444444);
        this.barraColor = this.add.rectangle(60, cajaY, 8, 180, 0x666666, 1).setOrigin(0, 0.5);

        this.nombreTexto = this.add.text(cx - (GAME_WIDTH / 2) + 90, cajaY - 65, '', {
            fontSize: '22px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0, 0.5);

        this.dialogoTexto = this.add.text(cx + 10, cajaY + 10, '', {
            fontSize: '24px', color: '#e0d8c8', fontFamily: 'Courier New',
            wordWrap: { width: GAME_WIDTH - 220 }, align: 'center', lineSpacing: 8
        }).setOrigin(0.5);

        this.tapText = this.add.text(cx, GAME_HEIGHT - 40, t('interludio.tap'), {
            fontSize: '18px', color: '#666666', fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0.5);

        this.tweens.add({ targets: this.tapText, alpha: 0.3, duration: 900, yoyo: true, repeat: -1 });

        const skipBtn = this.add.text(GAME_WIDTH - 40, 40, t('interludio.skip'), {
            fontSize: '18px', color: '#888888', fontFamily: 'Courier New',
            backgroundColor: '#222222', padding: { x: 12, y: 6 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
        skipBtn.on('pointerup', () => this.terminarInterludio());

        this.lineas = INTERLUDIOS[this.numInterludio];
        this.lineaActual = 0;
        this.estaTransicionando = false;
        this.yaTermino = false;

        this.input.on('pointerup', () => this.avanzarLinea());

        this.mostrarLinea();
    }

    mostrarLinea() {
        if (this.lineaActual >= this.lineas.length) {
            this.terminarInterludio();
            return;
        }

        const linea = this.lineas[this.lineaActual];
        const texto = t('interludio.' + linea.key);

        let nombreMostrar = '';
        let colorTexto = '#e0d8c8';
        let colorBarra = 0x666666;

        if (linea.rol === 'eugenia') {
            nombreMostrar = 'Eugenia'; colorTexto = '#e8b890'; colorBarra = 0x8b6b3a;
        } else if (linea.rol === 'mateo') {
            nombreMostrar = 'Mateo'; colorTexto = '#a8c0e8'; colorBarra = 0x4a7aaa;
        } else {
            nombreMostrar = '· · ·'; colorTexto = '#888888'; colorBarra = 0x333333;
        }

        this.nombreTexto.setText(nombreMostrar);
        this.nombreTexto.setColor(colorTexto);
        this.dialogoTexto.setText(texto);
        this.dialogoTexto.setColor(colorTexto);
        this.barraColor.setFillStyle(colorBarra);

        this.dialogoTexto.setAlpha(0);
        this.nombreTexto.setAlpha(0);

        this.tweens.add({ targets: [this.dialogoTexto, this.nombreTexto], alpha: 1, duration: 400, ease: 'Power2' });

        if (linea.rol === 'eugenia') {
            this.retratoEugenia.setAlpha(1).clearTint();
            this.retratoMateo.setAlpha(0.35).setTint(0x555555);
        } else if (linea.rol === 'mateo') {
            this.retratoMateo.setAlpha(1).clearTint();
            this.retratoEugenia.setAlpha(0.35).setTint(0x555555);
        } else {
            this.retratoEugenia.setAlpha(0.35).setTint(0x555555);
            this.retratoMateo.setAlpha(0.35).setTint(0x555555);
        }

        this.lineaActual++;
    }

    avanzarLinea() {
        if (this.estaTransicionando || this.yaTermino) return;
        this.estaTransicionando = true;

        this.tweens.add({
            targets: [this.dialogoTexto, this.nombreTexto],
            alpha: 0,
            duration: 200,
            onComplete: () => {
                this.estaTransicionando = false;
                this.mostrarLinea();
            }
        });
    }

    terminarInterludio() {
        if (this.yaTermino) return;
        this.yaTermino = true;
        this.input.removeAllListeners();

        if (this.musicaInt) {
            this.tweens.add({ targets: this.musicaInt, volume: 0, duration: 500 });
            this.time.delayedCall(550, () => { if (this.musicaInt) this.musicaInt.stop(); });
        }

        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.time.delayedCall(700, () => {
            if (this.sound.get('puzzle_tension')) this.sound.stopByKey('puzzle_tension');
            if (this.sound.get('puzzle_completar')) this.sound.stopByKey('puzzle_completar');
            this.scene.start(this.capituloSiguiente);
        });
    }
}