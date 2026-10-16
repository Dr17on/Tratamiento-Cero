// ==========================================
// INTERLUDIOS — Diálogos entre capítulos
// ==========================================
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
        { rol: 'narr',   key: 'int4_narr2' },
        { rol: 'eugenia', key: 'int4_eugenia3' },
        { rol: 'narr',   key: 'int4_narr3' }
    ]
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

        // Fondo negro con viñeta
        this.cameras.main.setBackgroundColor('#000000');
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 1);

        // Textura sutil de fondo (líneas)
        for (let i = 0; i < 20; i++) {
            this.add.rectangle(cx, i * 40, GAME_WIDTH, 1, 0x1a1a1a, 0.3);
        }

        // Título del interludio
        this.add.text(cx, 60, t('interludio.title') + ' ' + this.numInterludio, {
            fontSize: '28px', color: '#c0a060',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        // Línea decorativa
        this.add.rectangle(cx, 95, 400, 1, 0xc0a060);

        // Cuadro de diálogo (abajo)
        const cajaY = GAME_HEIGHT - 200;
        this.cajaDialogo = this.add.rectangle(cx, cajaY, GAME_WIDTH - 100, 180, 0x0a0a0a, 0.95)
            .setStrokeStyle(2, 0x444444);

        // Nombre del personaje
        this.nombreTexto = this.add.text(cx - (GAME_WIDTH / 2) + 80, cajaY - 65, '', {
            fontSize: '22px', color: '#c0a060',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0, 0.5);

        // Texto del diálogo
        this.dialogoTexto = this.add.text(cx, cajaY + 10, '', {
            fontSize: '24px', color: '#e0d8c8',
            fontFamily: 'Courier New',
            wordWrap: { width: GAME_WIDTH - 160 },
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Indicador "toca para continuar"
        this.tapText = this.add.text(cx, GAME_HEIGHT - 40, t('interludio.tap'), {
            fontSize: '18px', color: '#666666',
            fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.tapText,
            alpha: 0.3,
            duration: 900,
            yoyo: true,
            repeat: -1
        });

        // Saltar todo
        const skipBtn = this.add.text(GAME_WIDTH - 40, 40, t('interludio.skip'), {
            fontSize: '18px', color: '#888888', fontFamily: 'Courier New',
            backgroundColor: '#222222', padding: { x: 12, y: 6 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
        skipBtn.on('pointerup', () => this.terminarInterludio());

        // Secuencia
        this.lineas = INTERLUDIOS[this.numInterludio];
        this.lineaActual = 0;

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

        // Color y nombre según el rol
        let nombreMostrar = '';
        let colorTexto = '#e0d8c8';

        if (linea.rol === 'eugenia') {
            nombreMostrar = 'Eugenia';
            colorTexto = '#e8b890';
        } else if (linea.rol === 'mateo') {
            nombreMostrar = 'Mateo';
            colorTexto = '#a8c0e8';
        } else {
            nombreMostrar = '· · ·';
            colorTexto = '#888888';
        }

        this.nombreTexto.setText(nombreMostrar);
        this.dialogoTexto.setText(texto);
        this.dialogoTexto.setColor(colorTexto);
        this.dialogoTexto.setAlpha(0);
        this.nombreTexto.setAlpha(0);

        this.tweens.add({
            targets: [this.dialogoTexto, this.nombreTexto],
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        this.lineaActual++;
    }

    avanzarLinea() {
        if (this.estaTransicionando) return;
        this.estaTransicionando = true;

        this.tweens.add({
            targets: [this.dialogoTexto, this.nombreTexto],
            alpha: 0,
            duration: 250,
            onComplete: () => {
                this.estaTransicionando = false;
                this.mostrarLinea();
            }
        });
    }

    terminarInterludio() {
        if (this.yaTermino) return;
        this.yaTermino = true;

        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.time.delayedCall(900, () => {
            // Detener el audio de fondo si existe
            if (this.sound.get('puzzle_tension')) this.sound.stopByKey('puzzle_tension');
            if (this.sound.get('puzzle_completar')) this.sound.stopByKey('puzzle_completar');

            this.scene.start(this.capituloSiguiente);
        });
    }
}