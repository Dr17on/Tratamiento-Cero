const PACIENTES = [
    { nombre: 'William Q.',    fecha: '12/03/1953', dia: 12 },
    { nombre: 'Eliza G.',      fecha: '27/05/1953', dia: 27 },
    { nombre: 'Samuel Del Ll', fecha: '08/09/1953', dia: 8  },
    { nombre: 'Sarah B.',      fecha: '14/11/1953', dia: 14 }
];

const CODIGO_PUZLE1 = '2784';
const HORA_CORRECTA = 9;
const MINUTO_CORRECTO = 45;
const CODIGO_CAPITULO = '4723';

class Capitulo1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Capitulo1' });
    }

    create() {
        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        this.rol = localStorage.getItem('tc_rol') || 'eugenia';
        this.digitos = [0, 0, 0, 0];
        this.hora = 0;
        this.minuto = 0;
        this.codigoIngresado = ['', '', '', ''];
        this.ambiente = null;
        this.tension = null;

        const ambienteKey = (this.rol === 'eugenia') ? 'ambiente_eugenia' : 'ambiente_mateo';
        if (this.cache.audio.exists(ambienteKey)) {
            this.ambiente = this.sound.add(ambienteKey, { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }

        if (this.cache.audio.exists('puzzle_tension')) {
            this.tension = this.sound.add('puzzle_tension', { loop: true, volume: getVolumen() * 0.18 });
            this.tension.play();
        }

        // ✅ NUEVO: Resumir desde el puzle guardado
        const puzzleGuardado = parseInt(localStorage.getItem('tc_puzzle') || '1');
        if (puzzleGuardado === 2) {
            this.hora = 0;
            this.minuto = 0;
            this.mostrarPuzzle2();
        } else if (puzzleGuardado === 3) {
            this.mostrarFinal();
        } else {
            this.mostrarPuzzle1();
        }
    }

    reproducirAcierto() {
        if (this.cache.audio.exists('acierto')) {
            this.sound.play('acierto', { volume: getVolumen() * 0.7 });
        }
    }

    reproducirError() {
        if (this.cache.audio.exists('error')) {
            this.sound.play('error', { volume: getVolumen() * 0.7 });
        }
    }

    detenerAmbiente() {
        if (this.ambiente) this.ambiente.stop();
        if (this.tension) this.tension.stop();
    }

    crearFondo() {
        this.children.removeAll();
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        const fondoKey = (this.rol === 'eugenia') ? 'fondo_eugenia' : 'fondo_mateo';
        this.add.image(cx, cy, fondoKey).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

        const tinte = (this.rol === 'eugenia') ? 0xd4a050 : 0x1a2a5a;
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, tinte, 0.10);

        this.add.rectangle(cx, 30, GAME_WIDTH, 60, 0x000000, 0.6);
        this.add.rectangle(cx, GAME_HEIGHT - 30, GAME_WIDTH, 60, 0x000000, 0.6);
    }

    mostrarTitulo(mostrarAnterior = false) {
        const cx = GAME_WIDTH / 2;

        this.add.rectangle(cx, 55, 700, 70, 0x000000, 0.65);

        this.add.text(cx, 55, t('capitulo1.title'), {
            fontSize: '34px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        // Botón menú (abajo izquierda)
        const backBtn = this.add.text(80, GAME_HEIGHT - 40, '← ' + t('common.back'), {
            fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

        backBtn.on('pointerdown', () => {
            this.detenerAmbiente();
            this.scene.start('Menu');
        });

        // ✅ NUEVO: Botón "← Anterior" arriba izquierda (solo si aplica)
        if (mostrarAnterior) {
            const prevBtn = this.add.text(80, 55, '← ' + t('common.previous'), {
                fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New',
                backgroundColor: '#333333',
                padding: { x: 12, y: 6 }
            }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

            prevBtn.on('pointerdown', () => this.irAPuzzleAnterior());
        }
    }

    // ==========================================
    // PUZLE 1
    // ==========================================
    mostrarPuzzle1() {
        localStorage.setItem('tc_puzzle', '1');
        this.crearFondo();
        this.mostrarTitulo(false);
        this.digitos = [0, 0, 0, 0];
        this.digitoTexts = [];

        if (this.rol === 'eugenia') {
            this.crearVistaEugeniaPuzzle1();
        } else {
            this.crearVistaMateoPuzzle1();
        }
    }

    crearVistaEugeniaPuzzle1() {
        const cx = GAME_WIDTH / 2;

        const formBg = this.add.rectangle(cx, 400, 780, 460, 0xf0e8d0, 0.92);
        formBg.setStrokeStyle(5, 0x8b6b3a);

        this.add.rectangle(cx + 8, 408, 780, 460, 0x000000, 0.35).setDepth(-1);
        formBg.setDepth(0);

        this.add.text(cx, 220, t('capitulo1.form_header'), {
            fontSize: '28px', color: '#3a2a1a',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(cx, 258, t('capitulo1.form_subtitle'), {
            fontSize: '20px', color: '#5a4a3a',
            fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0.5);

        this.add.rectangle(cx, 285, 700, 2, 0x8b6b3a);

        PACIENTES.forEach((p, i) => {
            const y = 340 + i * 65;
            this.add.text(500, y, p.nombre, {
                fontSize: '24px', color: '#1a1a1a', fontFamily: 'Courier New'
            }).setOrigin(0, 0.5);
            this.add.text(920, y, p.fecha, {
                fontSize: '24px', color: '#1a1a1a', fontFamily: 'Courier New'
            }).setOrigin(1, 0.5);
        });

        this.add.rectangle(cx, 660, 700, 50, 0x000000, 0.6);
        this.add.text(cx, 660, t('capitulo1.eugenia_hint'), {
            fontSize: '22px', color: '#c0a060',
            fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 40, 220, 60, 0x2a6a2a, 0.9)
            .setStrokeStyle(3, 0x4aaa4a)
            .setInteractive({ useHandCursor: true });

        this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 40, t('capitulo1.continuar'), {
            fontSize: '20px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        continueBtn.on('pointerdown', () => this.irAPuzzle2());
    }

    crearVistaMateoPuzzle1() {
        const cx = GAME_WIDTH / 2;

        this.add.image(cx, 350, 'pared_nombres').setDisplaySize(900, 320);
        this.add.rectangle(cx, 350, 905, 325, 0x000000, 0)
            .setStrokeStyle(3, 0x666666, 0.8);

        this.add.text(cx, 150, t('capitulo1.wall_label'), {
            fontSize: '22px', color: '#cccccc',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(cx, 540, t('capitulo1.mateo_instruction'), {
            fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(cx, 570, t('capitulo1.mateo_instruction2'), {
            fontSize: '18px', color: '#aaaaaa',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        const startX = 440;
        const spacing = 140;

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;

            const upBtn = this.add.text(x, 610, '▲', {
                fontSize: '36px', color: '#cccccc', fontFamily: 'Courier New'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            this.add.rectangle(x, 665, 100, 90, 0x1a1a1a, 0.95)
                .setStrokeStyle(3, 0xc0a060);

            const txt = this.add.text(x, 665, '0', {
                fontSize: '52px', color: '#ffffff',
                fontFamily: 'Courier New', fontStyle: 'bold'
            }).setOrigin(0.5);
            this.digitoTexts.push(txt);

            upBtn.on('pointerdown', () => {
                this.digitos[i] = (this.digitos[i] + 1) % 10;
                txt.setText(this.digitos[i].toString());
            });
        }

        const confirmBtn = this.add.rectangle(GAME_WIDTH - 140, 665, 200, 70, 0x2a6a2a, 0.9)
            .setStrokeStyle(3, 0x4aaa4a)
            .setInteractive({ useHandCursor: true });

        this.add.text(GAME_WIDTH - 140, 665, t('capitulo1.confirm'), {
            fontSize: '20px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.mensaje = this.add.text(cx, 715, '', {
            fontSize: '20px', color: '#ff6666',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        confirmBtn.on('pointerdown', () => this.verificarPuzzle1());
    }

    verificarPuzzle1() {
        const codigo = this.digitos.join('');
        if (codigo === CODIGO_PUZLE1) {
            this.mensaje.setText(t('capitulo1.correct')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1500, () => this.irAPuzzle2());
        } else {
            this.mensaje.setText(t('capitulo1.wrong')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }

    // ==========================================
    // PUZLE 2
    // ==========================================
    irAPuzzle2() {
        localStorage.setItem('tc_puzzle', '2');
        this.hora = 0;
        this.minuto = 0;
        this.mostrarPuzzle2();
    }

    mostrarPuzzle2() {
        this.crearFondo();
        this.mostrarTitulo(true);  // ✅ muestra botón anterior

        const cx = GAME_WIDTH / 2;

        this.add.rectangle(cx, 110, 500, 50, 0x000000, 0.7);
        this.add.text(cx, 110, t('capitulo1.clock_title'), {
            fontSize: '28px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        if (this.rol === 'eugenia') {
            this.crearVistaEugeniaPuzzle2();
        } else {
            this.crearVistaMateoPuzzle2();
        }
    }

    crearVistaEugeniaPuzzle2() {
        const cx = GAME_WIDTH / 2;

        this.add.image(cx, 400, 'reloj_eugenia').setDisplaySize(500, 500);

        this.add.rectangle(cx, 360, 220, 70, 0x000000, 0.85)
            .setStrokeStyle(2, 0xc0a060);

        this.horaText = this.add.text(cx, 360, '00:00', {
            fontSize: '52px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.rectangle(cx - 380, 400, 180, 80, 0x000000, 0.8)
            .setStrokeStyle(2, 0xc0a060);

        this.add.text(cx - 380, 380, t('capitulo1.hour_label'), {
            fontSize: '20px', color: '#c0a060', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const hourUp = this.add.text(cx - 380, 410, '▲', {
            fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.add.rectangle(cx + 380, 400, 180, 80, 0x000000, 0.8)
            .setStrokeStyle(2, 0xc0a060);

        this.add.text(cx + 380, 380, t('capitulo1.minute_label'), {
            fontSize: '20px', color: '#c0a060', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const minUp = this.add.text(cx + 380, 410, '▲', {
            fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        hourUp.on('pointerdown', () => {
            this.hora = (this.hora + 1) % 12;
            this.actualizarHora();
        });
        minUp.on('pointerdown', () => {
            this.minuto = (this.minuto + 15) % 60;
            this.actualizarHora();
        });

        const checkBtn = this.add.rectangle(cx, 600, 300, 65, 0x2a6a2a, 0.9)
            .setStrokeStyle(3, 0x4aaa4a)
            .setInteractive({ useHandCursor: true });

        this.add.text(cx, 600, t('capitulo1.clock_check'), {
            fontSize: '24px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.mensaje = this.add.text(cx, 670, '', {
            fontSize: '22px', color: '#ff6666',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        checkBtn.on('pointerdown', () => this.verificarReloj());
    }

    crearVistaMateoPuzzle2() {
        const cx = GAME_WIDTH / 2;

        this.add.image(cx, 400, 'reloj_mateo').setDisplaySize(700, 500);
        this.add.rectangle(cx, 400, 705, 505, 0x000000, 0)
            .setStrokeStyle(3, 0x666666, 0.8);

        this.add.rectangle(cx, 660, 800, 45, 0x000000, 0.7);
        this.add.text(cx, 660, t('capitulo1.clock_mateo_hint'), {
            fontSize: '20px', color: '#cccccc',
            fontFamily: 'Courier New', fontStyle: 'italic',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 40, 220, 60, 0x2a6a2a, 0.9)
            .setStrokeStyle(3, 0x4aaa4a)
            .setInteractive({ useHandCursor: true });

        this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 40, t('capitulo1.continuar'), {
            fontSize: '20px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        continueBtn.on('pointerdown', () => this.irAFinal());
    }

    actualizarHora() {
        const h = this.hora.toString().padStart(2, '0');
        const m = this.minuto.toString().padStart(2, '0');
        this.horaText.setText(h + ':' + m);
    }

    verificarReloj() {
        if (this.hora === HORA_CORRECTA && this.minuto === MINUTO_CORRECTO) {
            this.mensaje.setText(t('capitulo1.clock_correct')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1800, () => this.irAFinal());
        } else {
            this.mensaje.setText(t('capitulo1.clock_wrong')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }

    // ==========================================
    // IR A PUZLE ANTERIOR
    // ==========================================
    irAPuzzleAnterior() {
        const puzzleActual = parseInt(localStorage.getItem('tc_puzzle') || '1');
        if (puzzleActual === 3) {
            localStorage.setItem('tc_puzzle', '2');
            this.hora = 0;
            this.minuto = 0;
            this.mostrarPuzzle2();
        } else if (puzzleActual === 2) {
            localStorage.setItem('tc_puzzle', '1');
            this.mostrarPuzzle1();
        }
    }

    // ==========================================
    // FINAL DEL CAPÍTULO
    // ==========================================
    irAFinal() {
        localStorage.setItem('tc_puzzle', '3');
        this.detenerAmbiente();

        if (this.cache.audio.exists('revelacion')) {
            this.revelacionMusica = this.sound.add('revelacion', { loop: true, volume: getVolumen() * 0.5 });
            this.revelacionMusica.play();
        }

        this.mostrarFinal();
    }

    mostrarFinal() {
        this.crearFondo();
        this.mostrarTitulo(true);  // ✅ botón anterior también en final

        const cx = GAME_WIDTH / 2;
        this.codigoIngresado = ['', '', '', ''];

        this.add.text(cx, 130, t('capitulo1.chapter_end_title'), {
            fontSize: '40px', color: '#c0a060',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        const miMitad = (this.rol === 'eugenia') ? '47--' : '--23';
        const etiqueta = (this.rol === 'eugenia')
            ? t('capitulo1.chapter_end_eugenia')
            : t('capitulo1.chapter_end_mateo');

        this.add.text(cx, 210, etiqueta, {
            fontSize: '22px', color: '#aaaaaa',
            fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0.5);

        this.add.text(cx, 270, miMitad, {
            fontSize: '70px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(cx, 340, t('capitulo1.chapter_end_instruction'), {
            fontSize: '20px', color: '#cccccc',
            fontFamily: 'Courier New', wordWrap: { width: 900 }, align: 'center',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        const startX = 470;
        const spacing = 110;
        this.codigoTexts = [];

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;

            this.add.rectangle(x, 440, 80, 90, 0x1a1a1a, 0.95)
                .setStrokeStyle(3, 0xc0a060);

            const txt = this.add.text(x, 440, '', {
                fontSize: '48px', color: '#ffffff',
                fontFamily: 'Courier New', fontStyle: 'bold'
            }).setOrigin(0.5);
            this.codigoTexts.push(txt);

            const index = i;

            const upBtn = this.add.text(x, 370, '▲', {
                fontSize: '32px', color: '#cccccc', fontFamily: 'Courier New'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            const downBtn = this.add.text(x, 510, '▼', {
                fontSize: '32px', color: '#cccccc', fontFamily: 'Courier New'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            upBtn.on('pointerdown', () => {
                this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 1) % 10;
                this.codigoTexts[index].setText(this.codigoIngresado[index].toString());
            });
            downBtn.on('pointerdown', () => {
                this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 9) % 10;
                this.codigoTexts[index].setText(this.codigoIngresado[index].toString());
            });
        }

        const confirmBtn = this.add.rectangle(cx, 600, 500, 70, 0x2a6a2a, 0.9)
            .setStrokeStyle(3, 0x4aaa4a)
            .setInteractive({ useHandCursor: true });

        this.add.text(cx, 600, t('capitulo1.chapter_code_confirm'), {
            fontSize: '24px', color: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.mensajeFinal = this.add.text(cx, 680, '', {
            fontSize: '24px', color: '#ff6666',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        confirmBtn.on('pointerdown', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO) {
            this.mensajeFinal.setText(t('capitulo1.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto();
            localStorage.setItem('tc_capitulo', '2');
            localStorage.setItem('tc_puzzle', '1');
            this.time.delayedCall(2500, () => {
                this.mensajeFinal.setText('→ ' + t('chapters.chapter2') + ' ' + t('chapters.coming_soon')).setColor('#ffffff');
            });
        } else {
            this.mensajeFinal.setText(t('capitulo1.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}