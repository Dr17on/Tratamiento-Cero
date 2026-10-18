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
        this.ambiente = null;
        this.tension = null;

        this.digitos = [0, 0, 0, 0];
        this.hora = 0;
        this.minuto = 0;
        this.codigoIngresado = ['', '', '', ''];

        const ambienteKey = (this.rol === 'eugenia') ? 'ambiente_eugenia' : 'ambiente_mateo';
        if (this.cache.audio.exists(ambienteKey)) {
            this.ambiente = this.sound.add(ambienteKey, { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }
        if (this.cache.audio.exists('puzzle_tension')) {
            this.tension = this.sound.add('puzzle_tension', { loop: true, volume: getVolumen() * 0.18 });
            this.tension.play();
        }

        const vista = parseInt(localStorage.getItem('tc1_puzzle') || '1');
        if (vista === 2) this.mostrarPuzzle2();
        else if (vista === 3) this.mostrarFinal();
        else this.mostrarPuzzle1();
    }

    reproducirAcierto() { if (this.cache.audio.exists('acierto')) this.sound.play('acierto', { volume: getVolumen() * 0.7 }); }
    reproducirError() { if (this.cache.audio.exists('error')) this.sound.play('error', { volume: getVolumen() * 0.7 }); }
    detenerAmbiente() { if (this.ambiente) this.ambiente.stop(); if (this.tension) this.tension.stop(); }

    mostrarTransicion(texto, callback) {
        this.detenerAmbiente();
        this.children.removeAll();
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 1);
        const txt = this.add.text(cx, cy, texto, { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', wordWrap: { width: 900 }, align: 'center' }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: txt, alpha: 1, duration: 1500, ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(2500, () => {
                    this.cameras.main.fadeOut(800, 0, 0, 0);
                    this.time.delayedCall(900, callback);
                });
            }
        });
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
        this.add.rectangle(cx, GAME_HEIGHT - 15, GAME_WIDTH, 30, 0x000000, 0.6);
    }

    mostrarTitulo(mostrarAnterior = false) {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 55, 700, 70, 0x000000, 0.65);
        this.add.text(cx, 55, t('capitulo1.title'), { fontSize: '34px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        const backBtn = this.add.text(80, GAME_HEIGHT - 60, '← ' + t('common.back'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 14, y: 8 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Menu'); });

        if (mostrarAnterior) {
            const prevBtn = this.add.text(80, 55, '← ' + t('common.previous'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 12, y: 6 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
            prevBtn.on('pointerup', () => this.irAPuzzleAnterior());
        }

        const resetBtn = this.add.text(GAME_WIDTH - 40, 55, t('common.reiniciar'), { fontSize: '18px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#8b3a3a', padding: { x: 12, y: 6 } }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true });
        resetBtn.on('pointerup', () => this.confirmarReinicio());
    }

    confirmarReinicio() {
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        const overlay = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.9).setDepth(100);
        const panel = this.add.rectangle(cx, cy, 600, 250, 0x1a1a1a, 1).setStrokeStyle(3, 0xc0a060).setDepth(101);
        this.add.text(cx, cy - 40, t('common.reiniciar_confirm'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', wordWrap: { width: 550 }, align: 'center' }).setOrigin(0.5).setDepth(102);

        const siBtn = this.add.rectangle(cx - 110, cy + 60, 180, 60, 0x2a6a2a, 0.95).setStrokeStyle(2, 0x4aaa4a).setInteractive({ useHandCursor: true }).setDepth(102);
        this.add.text(cx - 110, cy + 60, t('common.si'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(103);
        const noBtn = this.add.rectangle(cx + 110, cy + 60, 180, 60, 0x8b3a3a, 0.95).setStrokeStyle(2, 0xaa4a4a).setInteractive({ useHandCursor: true }).setDepth(102);
        this.add.text(cx + 110, cy + 60, t('common.no'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(103);

        const destruir = () => { overlay.destroy(); panel.destroy(); siBtn.destroy(); noBtn.destroy(); };
        siBtn.on('pointerup', () => { reiniciarCapitulo(1); destruir(); this.scene.restart(); });
        noBtn.on('pointerup', () => destruir());
    }

    mostrarPuzzleResueltoOverlay(callback) {
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        const overlay = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.4).setDepth(50);
        this.add.text(cx, GAME_HEIGHT - 160, t('common.puzzle_resuelto'), { fontSize: '36px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(51);
        const btn = this.add.rectangle(cx, GAME_HEIGHT - 90, 280, 60, 0x2a6a2a, 0.95).setStrokeStyle(2, 0x4aaa4a).setInteractive({ useHandCursor: true }).setDepth(51);
        this.add.text(cx, GAME_HEIGHT - 90, t('capitulo1.continuar'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(52);
        btn.on('pointerup', () => { overlay.destroy(); callback(); });
    }

    mostrarPuzzle1() {
        localStorage.setItem('tc1_puzzle', '1');
        this.crearFondo();
        this.mostrarTitulo(false);

        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle1();
        else this.crearVistaMateoPuzzle1();
    }

    crearVistaEugeniaPuzzle1() {
        const cx = GAME_WIDTH / 2;
        const formBg = this.add.rectangle(cx, 400, 780, 460, 0xf0e8d0, 0.92).setStrokeStyle(5, 0x8b6b3a);
        this.add.text(cx, 220, t('capitulo1.form_header'), { fontSize: '28px', color: '#3a2a1a', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(cx, 258, t('capitulo1.form_subtitle'), { fontSize: '20px', color: '#5a4a3a', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.rectangle(cx, 285, 700, 2, 0x8b6b3a);

        PACIENTES.forEach((p, i) => {
            const y = 340 + i * 65;
            this.add.text(500, y, p.nombre, { fontSize: '24px', color: '#1a1a1a', fontFamily: 'Courier New' }).setOrigin(0, 0.5);
            this.add.text(920, y, p.fecha, { fontSize: '24px', color: '#1a1a1a', fontFamily: 'Courier New' }).setOrigin(1, 0.5);
        });

        this.add.rectangle(cx, 660, 700, 50, 0x000000, 0.6);
        this.add.text(cx, 660, t('capitulo1.eugenia_hint'), { fontSize: '22px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 60, 220, 60, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 60, t('capitulo1.continuar'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        
        continueBtn.on('pointerup', () => {
            this.mostrarTransicion(t('transiciones.cap1_p2'), () => this.irAPuzzle2());
        });
    }

    crearVistaMateoPuzzle1() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 350, 'pared_nombres').setDisplaySize(900, 320);
        this.add.text(cx, 150, t('capitulo1.wall_label'), { fontSize: '22px', color: '#cccccc', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(cx, 540, t('capitulo1.mateo_instruction'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(cx, 570, t('capitulo1.mateo_instruction2'), { fontSize: '18px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (estaResuelto(1, 1)) {
            this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2());
            return;
        }

        this.digitos = [0, 0, 0, 0];
        this.digitoTexts = [];
        const startX = 440, spacing = 140;

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            const upBtn = this.add.text(x, 610, '▲', { fontSize: '36px', color: '#cccccc', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            this.add.rectangle(x, 665, 100, 90, 0x1a1a1a, 0.95).setStrokeStyle(3, 0xc0a060);
            const txt = this.add.text(x, 665, '0', { fontSize: '52px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            this.digitoTexts.push(txt);
            upBtn.on('pointerup', () => { this.digitos[i] = (this.digitos[i] + 1) % 10; txt.setText(this.digitos[i].toString()); });
        }

        const confirmBtn = this.add.rectangle(GAME_WIDTH - 140, 665, 200, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 140, 665, t('capitulo1.confirm'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensaje = this.add.text(cx, 715, '', { fontSize: '20px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarPuzzle1());
    }

    verificarPuzzle1() {
        const codigo = this.digitos.join('');
        if (codigo === CODIGO_PUZLE1) {
            marcarResuelto(1, 1);
            this.mensaje.setText(t('capitulo1.correct')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1500, () => {
                this.mostrarTransicion(t('transiciones.cap1_p2'), () => this.irAPuzzle2());
            });
        } else {
            this.mensaje.setText(t('capitulo1.wrong')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }

    irAPuzzle2() {
        localStorage.setItem('tc1_puzzle', '2');
        this.hora = 0; this.minuto = 0;
        this.scene.restart();
    }

    mostrarPuzzle2() {
        this.crearFondo();
        this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 110, 500, 50, 0x000000, 0.7);
        this.add.text(cx, 110, t('capitulo1.clock_title'), { fontSize: '28px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle2();
        else this.crearVistaMateoPuzzle2();
    }

    crearVistaEugeniaPuzzle2() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 400, 'reloj_eugenia').setDisplaySize(500, 500);

        if (estaResuelto(1, 2)) {
            this.mostrarPuzzleResueltoOverlay(() => this.irAFinal());
            return;
        }

        this.add.rectangle(cx, 360, 220, 70, 0x000000, 0.85).setStrokeStyle(2, 0xc0a060);
        this.horaText = this.add.text(cx, 360, '00:00', { fontSize: '52px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        const hourUp = this.add.text(cx - 380, 410, '▲', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const minUp = this.add.text(cx + 380, 410, '▲', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        hourUp.on('pointerup', () => { this.hora = (this.hora + 1) % 12; this.actualizarHora(); });
        minUp.on('pointerup', () => { this.minuto = (this.minuto + 15) % 60; this.actualizarHora(); });

        const checkBtn = this.add.rectangle(cx, 600, 300, 65, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(cx, 600, t('capitulo1.clock_check'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensaje = this.add.text(cx, 670, '', { fontSize: '22px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        checkBtn.on('pointerup', () => this.verificarReloj());
    }

    crearVistaMateoPuzzle2() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 400, 'reloj_mateo').setDisplaySize(700, 500);
        this.add.rectangle(cx, 660, 800, 45, 0x000000, 0.7);
        this.add.text(cx, 660, t('capitulo1.clock_mateo_hint'), { fontSize: '20px', color: '#cccccc', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 60, 220, 60, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 60, t('capitulo1.continuar'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => this.irAFinal());
    }

    actualizarHora() {
        const h = this.hora.toString().padStart(2, '0');
        const m = this.minuto.toString().padStart(2, '0');
        this.horaText.setText(h + ':' + m);
    }

    verificarReloj() {
        if (this.hora === HORA_CORRECTA && this.minuto === MINUTO_CORRECTO) {
            marcarResuelto(1, 2);
            this.mensaje.setText(t('capitulo1.clock_correct')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1800, () => this.irAFinal());
        } else {
            this.mensaje.setText(t('capitulo1.clock_wrong')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }

    irAPuzzleAnterior() {
        const actual = parseInt(localStorage.getItem('tc1_puzzle') || '1');
        if (actual === 3) { localStorage.setItem('tc1_puzzle', '2'); this.mostrarPuzzle2(); }
        else if (actual === 2) { localStorage.setItem('tc1_puzzle', '1'); this.mostrarPuzzle1(); }
    }

    irAFinal() {
        localStorage.setItem('tc1_puzzle', '3');
        this.detenerAmbiente();
        if (this.cache.audio.exists('revelacion')) {
            this.revelacionMusica = this.sound.add('revelacion', { loop: true, volume: getVolumen() * 0.5 });
            this.revelacionMusica.play();
        }
        this.mostrarFinal();
    }

    mostrarFinal() {
        this.crearFondo();
        this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;

        this.add.text(cx, 130, t('capitulo1.chapter_end_title'), { fontSize: '40px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        const miMitad = (this.rol === 'eugenia') ? '47--' : '--23';
        const etiqueta = (this.rol === 'eugenia') ? t('capitulo1.chapter_end_eugenia') : t('capitulo1.chapter_end_mateo');

        this.add.text(cx, 210, etiqueta, { fontSize: '22px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 270, miMitad, { fontSize: '70px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);

        if (estaResuelto(1, 3)) {
            this.add.text(cx, 400, t('common.puzzle_resuelto'), { fontSize: '28px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
            const irBtn = this.add.rectangle(cx, 510, 560, 70, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(cx, 510, '→ ' + t('chapters.chapter2') + ': ' + t('chapters.chapter2_sub'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc2_puzzle', '1'); this.scene.start('Interludio', { numero: 1, siguiente: 'Capitulo2' }); });
            return;
        }

        this.add.text(cx, 340, t('capitulo1.chapter_end_instruction'), { fontSize: '20px', color: '#cccccc', fontFamily: 'Courier New', wordWrap: { width: 900 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.codigoIngresado = ['', '', '', ''];
        const startX = 470, spacing = 110;
        this.codigoTexts = [];

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            this.add.rectangle(x, 440, 80, 90, 0x1a1a1a, 0.95).setStrokeStyle(3, 0xc0a060);
            const txt = this.add.text(x, 440, '', { fontSize: '48px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            this.codigoTexts.push(txt);
            const index = i;
            const upBtn = this.add.text(x, 370, '▲', { fontSize: '32px', color: '#cccccc', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            const downBtn = this.add.text(x, 510, '▼', { fontSize: '32px', color: '#cccccc', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            upBtn.on('pointerup', () => { this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 1) % 10; this.codigoTexts[index].setText(this.codigoIngresado[index].toString()); });
            downBtn.on('pointerup', () => { this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 9) % 10; this.codigoTexts[index].setText(this.codigoIngresado[index].toString()); });
        }

        const confirmBtn = this.add.rectangle(cx, 600, 500, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(cx, 600, t('capitulo1.chapter_code_confirm'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensajeFinal = this.add.text(cx, 680, '', { fontSize: '24px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO) {
            marcarResuelto(1, 3);
            this.mensajeFinal.setText(t('capitulo1.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto();
            localStorage.setItem('tc_capitulo', '2');
            this.time.delayedCall(1500, () => {
                const cx = GAME_WIDTH / 2;
                const irBtn = this.add.rectangle(cx, GAME_HEIGHT - 110, 560, 70, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
                this.add.text(cx, GAME_HEIGHT - 110, '→ ' + t('chapters.chapter2') + ': ' + t('chapters.chapter2_sub'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
                irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc2_puzzle', '1'); this.scene.start('Interludio', { numero: 1, siguiente: 'Capitulo2' }); });
            });
        } else {
            this.mensajeFinal.setText(t('capitulo1.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}