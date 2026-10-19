const VALVULAS_SOLUCION = [1, 3, 0, 2];
const CAMINO_SOLUCION = [1, 5, 7, 4, 8, 0]; 
const CILINDRO_SOLUCION = ['L', 'I', 'B', 'E', 'R'];
const CODIGO_CAPITULO3 = '3379';

class Capitulo3 extends Phaser.Scene {
    constructor() { super({ key: 'Capitulo3' }); }

    create() {
        if (this.sound.context && this.sound.context.state === 'suspended') { this.sound.context.resume(); }

        this.rol = localStorage.getItem('tc_rol') || 'eugenia';
        this.ambiente = null; this.tension = null;

        this.valvulasActuales = [0, 0, 0, 0];
        this.caminoActual = [];
        this.cilindroActual = [0, 0, 0, 0, 0];
        this.codigoIngresado = ['', '', '', ''];

        const ambienteKey = (this.rol === 'eugenia') ? 'ambiente_cap3_eugenia' : 'ambiente_cap3_mateo';
        if (this.cache.audio.exists(ambienteKey)) {
            this.ambiente = this.sound.add(ambienteKey, { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }

        const puzzleGuardado = parseInt(localStorage.getItem('tc3_puzzle') || '1');
        if (puzzleGuardado === 2) this.mostrarPuzzle2();
        else if (puzzleGuardado === 3) this.mostrarPuzzle3();
        else if (puzzleGuardado === 4) this.mostrarFinal();
        else this.mostrarPuzzle1();
    }

    reproducirAcierto() { if (this.cache.audio.exists('acierto')) this.sound.play('acierto', { volume: getVolumen() * 0.7 }); }
    reproducirError() { if (this.cache.audio.exists('error')) this.sound.play('error', { volume: getVolumen() * 0.7 }); }
    detenerAmbiente() { if (this.ambiente) this.ambiente.stop(); if (this.tension) this.tension.stop(); }

    mostrarTransicion(texto, callback) {
        this.detenerAmbiente(); this.children.removeAll();
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        this.cameras.main.setBackgroundColor('#000000');
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 1);
        const txt = this.add.text(cx, cy, texto, { fontSize: '36px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', wordWrap: { width: 1000 }, align: 'center' }).setOrigin(0.5).setAlpha(0);
        this.tweens.add({
            targets: txt, alpha: 1, duration: 1500, ease: 'Power2',
            onComplete: () => { this.time.delayedCall(2500, () => { this.cameras.main.fadeOut(800, 0, 0, 0); this.time.delayedCall(900, callback); }); }
        });
    }

    crearFondo() {
        this.children.removeAll();
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        const fondoKey = (this.rol === 'eugenia') ? 'fondo_cap3_eugenia' : 'fondo_cap3_mateo';
        
        if (this.textures.exists(fondoKey)) {
            this.add.image(cx, cy, fondoKey).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        } else {
            this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x1a1a1a);
        }

        const tinte = (this.rol === 'eugenia') ? 0xd44a20 : 0x1a2a5a;
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, tinte, 0.10);
        this.add.rectangle(cx, 35, GAME_WIDTH, 70, 0x000000, 0.6);
        this.add.rectangle(cx, GAME_HEIGHT - 20, GAME_WIDTH, 40, 0x000000, 0.6);
    }

    mostrarTitulo(mostrarAnterior = false) {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 55, 800, 80, 0x000000, 0.7);
        this.add.text(cx, 55, t('capitulo3.title'), { fontSize: '40px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        const backBtn = this.add.text(80, GAME_HEIGHT - 60, '← ' + t('common.back'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 16, y: 10 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Menu'); });

        if (mostrarAnterior) {
            const puzzleActual = parseInt(localStorage.getItem('tc3_puzzle') || '1');
            const labelTexto = (puzzleActual === 1) ? '← ' + t('chapters.chapter2') : '← ' + t('common.previous');
            const prevBtn = this.add.text(80, 55, labelTexto, { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 14, y: 8 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
            prevBtn.on('pointerup', () => this.irAPuzzleAnterior());
        }

        const resetBtn = this.add.text(GAME_WIDTH - 40, 55, t('common.reiniciar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#8b3a3a', padding: { x: 14, y: 8 } }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true });
        resetBtn.on('pointerup', () => this.confirmarReinicio());
    }

    confirmarReinicio() {
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        const overlay = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.9).setDepth(100);
        const panel = this.add.rectangle(cx, cy, 700, 280, 0x1a1a1a, 1).setStrokeStyle(3, 0xc0a060).setDepth(101);
        this.add.text(cx, cy - 40, t('common.reiniciar_confirm'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', wordWrap: { width: 600 }, align: 'center' }).setOrigin(0.5).setDepth(102);

        const siBtn = this.add.rectangle(cx - 130, cy + 70, 200, 70, 0x2a6a2a, 0.95).setStrokeStyle(2, 0x4aaa4a).setInteractive({ useHandCursor: true }).setDepth(102);
        this.add.text(cx - 130, cy + 70, t('common.si'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(103);
        const noBtn = this.add.rectangle(cx + 130, cy + 70, 200, 70, 0x8b3a3a, 0.95).setStrokeStyle(2, 0xaa4a4a).setInteractive({ useHandCursor: true }).setDepth(102);
        this.add.text(cx + 130, cy + 70, t('common.no'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(103);

        const destruir = () => { overlay.destroy(); panel.destroy(); siBtn.destroy(); noBtn.destroy(); };
        siBtn.on('pointerup', () => { reiniciarCapitulo(3); destruir(); this.scene.restart(); });
        noBtn.on('pointerup', () => destruir());
    }

    mostrarPuzzleResueltoOverlay(callback) {
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        const overlay = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.4).setDepth(50);
        this.add.text(cx, GAME_HEIGHT - 180, t('common.puzzle_resuelto'), { fontSize: '42px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(51);
        const btn = this.add.rectangle(cx, GAME_HEIGHT - 90, 320, 70, 0x2a6a2a, 0.95).setStrokeStyle(2, 0x4aaa4a).setInteractive({ useHandCursor: true }).setDepth(51);
        this.add.text(cx, GAME_HEIGHT - 90, t('capitulo1.continuar'), { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setDepth(52);
        btn.on('pointerup', () => { overlay.destroy(); callback(); });
    }

    mostrarPuzzle1() {
        localStorage.setItem('tc3_puzzle', '1');
        this.crearFondo(); this.mostrarTitulo(true);
        this.valvulasActuales = [0, 0, 0, 0];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo3.puzzle1_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle1(); else this.crearVistaMateoPuzzle1();
    }

    crearVistaEugeniaPuzzle1() {
        const cx = GAME_WIDTH / 2;
        if (this.textures.exists('panel_valvulas')) this.add.image(cx, 380, 'panel_valvulas').setDisplaySize(700, 450);
        if (estaResuelto(3, 1)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2()); return; }

        if (this.textures.exists(getImg('manual_valvulas'))) this.add.image(cx + 450, 200, getImg('manual_valvulas')).setDisplaySize(350, 450);
        this.add.text(cx - 200, 140, t('capitulo3.puzzle1_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const valvulasX = [cx - 180, cx - 60, cx + 60, cx + 180];
        const valvulasY = 420;
        this.valvulasTexts = []; this.valvulasCírculos = [];

        for (let i = 0; i < 4; i++) {
            const x = valvulasX[i];
            const circulo = this.add.circle(x, valvulasY, 55, 0x8b6b3a).setStrokeStyle(4, 0x4a3a2a).setInteractive({ useHandCursor: true });
            this.valvulasCírculos.push(circulo);
            const texto = this.add.text(x, valvulasY, '0°', { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            this.valvulasTexts.push(texto);
            this.add.text(x, valvulasY - 80, String.fromCharCode(65 + i), { fontSize: '32px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            const index = i;
            circulo.on('pointerup', () => this.rotarValvula(index));
        }
    }

    rotarValvula(index) {
        this.valvulasActuales[index] = (this.valvulasActuales[index] + 1) % 4;
        const angulo = this.valvulasActuales[index] * 90;
        this.valvulasTexts[index].setText(angulo + '°');
        this.tweens.add({ targets: this.valvulasCírculos[index], angle: this.valvulasCírculos[index].angle + 90, duration: 200, ease: 'Power2' });
        if (this.valvulasActuales.every((v, i) => v === VALVULAS_SOLUCION[i])) { this.verificarPuzzle1(); }
    }

    crearVistaMateoPuzzle1() {
        const cx = GAME_WIDTH / 2;
        if (this.textures.exists('pared_valvulas_marcas')) this.add.image(cx, 340, 'pared_valvulas_marcas').setDisplaySize(750, 500);
        this.add.rectangle(cx, 630, 950, 120, 0x000000, 0.88).setStrokeStyle(2, 0xc0a060);
        this.add.text(cx, 590, t('capitulo3.puzzle1_mateo_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.text(cx, 650, t('capitulo3.puzzle1_mateo_orden'), { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3, align: 'center' }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => { this.mostrarTransicion(t('transiciones.cap3_p2'), () => this.irAPuzzle2()); });
    }

    verificarPuzzle1() {
        marcarResuelto(3, 1); this.reproducirAcierto();
        this.time.delayedCall(800, () => {
            this.mostrarMensajeGlobal(t('capitulo3.puzzle1_correct'), '#66ff66');
            this.time.delayedCall(1500, () => { this.mostrarTransicion(t('transiciones.cap3_p2'), () => this.irAPuzzle2()); });
        });
    }

    irAPuzzle2() { localStorage.setItem('tc3_puzzle', '2'); this.caminoActual = []; this.scene.restart(); }

    mostrarPuzzle2() {
        this.crearFondo(); this.mostrarTitulo(true); this.caminoActual = [];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo3.puzzle2_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle2(); else this.crearVistaMateoPuzzle2();
    }

    crearVistaEugeniaPuzzle2() {
        const cx = GAME_WIDTH / 2;
        
        if (this.textures.exists('mapa_hospital')) {
            this.add.image(cx, 380, 'mapa_hospital').setDisplaySize(850, 530);
        } else {
            this.add.rectangle(cx, 380, 850, 530, 0x222222, 0.8).setStrokeStyle(3, 0x555555);
            this.add.text(cx, 380, '⚠️ Falta imagen:\nmapa_hospital.jpg', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', align: 'center' }).setOrigin(0.5);
        }

        if (estaResuelto(3, 2)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle3()); return; }

        const habitaciones = [
            { num: 1, x: cx - 280, y: 250 }, { num: 2, x: cx - 150, y: 230 }, { num: 3, x: cx - 20, y: 220 },
            { num: 4, x: cx + 110, y: 260 }, { num: 5, x: cx + 240, y: 300 }, { num: 6, x: cx - 250, y: 380 },
            { num: 7, x: cx - 100, y: 400 }, { num: 8, x: cx + 50, y: 420 }, { num: 9, x: cx + 200, y: 450 },
            { num: 0, x: cx + 320, y: 500 }
        ];

        this.habitacionesBotones = [];
        habitaciones.forEach(h => {
            const btn = this.add.circle(h.x, h.y, 38, 0x2a4a6a, 0.9).setStrokeStyle(3, 0xc0a060).setInteractive({ useHandCursor: true });
            const label = h.num === 0 ? 'P47' : h.num.toString();
            this.add.text(h.x, h.y, label, { fontSize: h.num === 0 ? '16px' : '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            btn.habitacionNum = h.num; this.habitacionesBotones.push(btn);
            btn.on('pointerup', () => this.tocarHabitacion(h.num, btn));
        });

        this.caminoTexto = this.add.text(cx, 680, t('capitulo3.puzzle2_eugenia_hint'), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
    }

    tocarHabitacion(num, btn) {
        const siguienteEsperado = CAMINO_SOLUCION[this.caminoActual.length];
        if (num === siguienteEsperado) {
            this.caminoActual.push(num);
            btn.setFillStyle(0x2a6a2a, 1); this.reproducirAcierto();
            if (this.caminoActual.length === CAMINO_SOLUCION.length) { this.verificarPuzzle2(); }
        } else {
            this.reproducirError(); this.caminoActual = []; btn.setFillStyle(0x8b3a3a, 1);
            this.time.delayedCall(400, () => { this.habitacionesBotones.forEach(b => b.setFillStyle(0x2a4a6a, 0.9)); });
        }
    }

    crearVistaMateoPuzzle2() {
        const cx = GAME_WIDTH / 2;
        
        if (this.textures.exists('mapa_hospital_quemado')) {
            this.add.image(cx, 360, 'mapa_hospital_quemado').setDisplaySize(800, 520);
        } else {
            this.add.rectangle(cx, 360, 800, 520, 0x222222, 0.8).setStrokeStyle(3, 0x555555);
            this.add.text(cx, 360, '⚠️ Falta imagen:\nmapa_hospital_quemado.jpg', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', align: 'center' }).setOrigin(0.5);
        }

        this.add.rectangle(cx, 670, 950, 60, 0x000000, 0.88).setStrokeStyle(2, 0xc0a060);
        this.add.text(cx, 670, t('capitulo3.puzzle2_mateo_hint'), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => { this.mostrarTransicion(t('transiciones.cap3_p3'), () => this.irAPuzzle3()); });
    }

    verificarPuzzle2() {
        marcarResuelto(3, 2); this.reproducirAcierto(); this.mostrarMensajeGlobal(t('capitulo3.puzzle2_correct'), '#66ff66');
        this.time.delayedCall(1500, () => { this.mostrarTransicion(t('transiciones.cap3_p3'), () => this.irAPuzzle3()); });
    }

    irAPuzzle3() { localStorage.setItem('tc3_puzzle', '3'); this.cilindroActual = [0, 0, 0, 0, 0]; this.scene.restart(); }

    mostrarPuzzle3() {
        this.crearFondo(); this.mostrarTitulo(true); this.cilindroActual = [0, 0, 0, 0, 0];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo3.puzzle3_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle3(); else this.crearVistaMateoPuzzle3();
    }

    crearVistaEugeniaPuzzle3() {
        const cx = GAME_WIDTH / 2;
        
        if (this.textures.exists('cilindro_cifrado')) {
            this.add.image(cx, 340, 'cilindro_cifrado').setDisplaySize(650, 450);
        } else {
            this.add.rectangle(cx, 340, 650, 450, 0x222222, 0.8).setStrokeStyle(3, 0x555555);
            this.add.text(cx, 340, '⚠️ Falta imagen:\ncilindro_cifrado.jpg', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', align: 'center' }).setOrigin(0.5);
        }

        if (estaResuelto(3, 3)) { this.mostrarPuzzleResueltoOverlay(() => this.irAFinal()); return; }

        this.add.text(cx, 590, t('capitulo3.puzzle3_eugenia_frase'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.text(cx, 630, t('capitulo3.puzzle3_eugenia_hint'), { fontSize: '20px', color: '#888888', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const anillosY = [210, 270, 330, 390, 450];
        this.anillosTexts = []; this.anillosBotones = [];

        for (let i = 0; i < 5; i++) {
            const y = anillosY[i];
            const btn = this.add.rectangle(cx, y, 280, 50, 0x333333, 0.95).setStrokeStyle(2, 0xc0a060).setInteractive({ useHandCursor: true });
            this.anillosBotones.push(btn);
            const letra = letrasAlfabeto[this.cilindroActual[i]];
            const txt = this.add.text(cx, y, letra, { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            this.anillosTexts.push(txt);

            const upBtn = this.add.text(cx + 170, y, '▲', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            const downBtn = this.add.text(cx - 170, y, '▼', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            const idx = i;
            upBtn.on('pointerup', () => this.rotarAnillo(idx, 1));
            downBtn.on('pointerup', () => this.rotarAnillo(idx, -1));
            btn.on('pointerup', () => this.rotarAnillo(idx, 1));
        }
    }

    rotarAnillo(index, delta) {
        const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let valor = this.cilindroActual[index];
        valor = (valor + delta + 26) % 26;
        this.cilindroActual[index] = valor;
        this.anillosTexts[index].setText(letrasAlfabeto[valor]);

        const palabra = this.cilindroActual.map(i => letrasAlfabeto[i]).join('');
        if (palabra === CILINDRO_SOLUCION.join('')) { this.verificarPuzzle3(); }
    }

    crearVistaMateoPuzzle3() {
        const cx = GAME_WIDTH / 2;
        
        if (this.textures.exists('cilindro_quemado')) {
            this.add.image(cx, 340, 'cilindro_quemado').setDisplaySize(650, 450);
        } else {
            this.add.rectangle(cx, 340, 650, 450, 0x222222, 0.8).setStrokeStyle(3, 0x555555);
            this.add.text(cx, 340, '⚠️ Falta imagen:\ncilindro_quemado.jpg', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', align: 'center' }).setOrigin(0.5);
        }

        this.add.rectangle(cx, 630, 950, 110, 0x000000, 0.88).setStrokeStyle(2, 0xc0a060);
        this.add.text(cx, 590, t('capitulo3.puzzle3_mateo_hint'), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.text(cx, 640, 'Anillo 1: L   ·   Anillo 2: I   ·   Anillo 4: E   ·   Anillo 5: R', { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => this.irAFinal());
    }

    verificarPuzzle3() {
        marcarResuelto(3, 3); this.reproducirAcierto(); this.mostrarMensajeGlobal(t('capitulo3.puzzle3_correct'), '#66ff66');
        this.time.delayedCall(1800, () => this.irAFinal());
    }

    mostrarMensajeGlobal(texto, color) {
        const cx = GAME_WIDTH / 2;
        if (this.mensajeGlobal) this.mensajeGlobal.destroy();
        this.mensajeGlobal = this.add.text(cx, GAME_HEIGHT - 120, texto, { fontSize: '28px', color: color, fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
    }

    irAPuzzleAnterior() {
        const actual = parseInt(localStorage.getItem('tc3_puzzle') || '1');
        if (actual === 4) { localStorage.setItem('tc3_puzzle', '3'); this.scene.restart(); }
        else if (actual === 3) { localStorage.setItem('tc3_puzzle', '2'); this.scene.restart(); }
        else if (actual === 2) { localStorage.setItem('tc3_puzzle', '1'); this.scene.restart(); }
        else if (actual === 1) { this.detenerAmbiente(); this.scene.start('Interludio', { numero: 2, siguiente: 'Capitulo2' }); }
    }

    irAFinal() {
        localStorage.setItem('tc3_puzzle', '4');
        this.detenerAmbiente();
        if (this.cache.audio.exists('revelacion_cap3')) {
            this.revelacionMusica = this.sound.add('revelacion_cap3', { loop: true, volume: getVolumen() * 0.5 });
            this.revelacionMusica.play();
        }
        this.scene.restart();
    }

    mostrarFinal() {
        this.crearFondo(); this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        this.add.text(cx, 130, t('capitulo3.chapter_end_title'), { fontSize: '46px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        const miMitad = (this.rol === 'eugenia') ? '33--' : '--79';
        const etiqueta = (this.rol === 'eugenia') ? t('capitulo3.chapter_end_eugenia') : t('capitulo3.chapter_end_mateo');

        this.add.text(cx, 220, etiqueta, { fontSize: '28px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 290, miMitad, { fontSize: '80px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);

        if (estaResuelto(3, 4)) {
            this.add.text(cx, 400, t('common.puzzle_resuelto'), { fontSize: '32px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
            const irBtn = this.add.rectangle(cx, 510, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(cx, 510, '→ ' + t('interludio.title') + ' 3', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc4_puzzle', '1'); this.scene.start('Interludio', { numero: 3, siguiente: 'Capitulo4' }); });
            return;
        }

        this.add.text(cx, 360, t('capitulo3.chapter_end_instruction'), { fontSize: '24px', color: '#cccccc', fontFamily: 'Courier New', wordWrap: { width: 1000 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.codigoIngresado = ['', '', '', ''];
        const startX = 470, spacing = 110;
        this.codigoTexts = [];

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            this.add.rectangle(x, 460, 90, 100, 0x1a1a1a, 0.95).setStrokeStyle(3, 0xc0a060);
            const txt = this.add.text(x, 460, '', { fontSize: '56px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            this.codigoTexts.push(txt);
            const index = i;
            const upBtn = this.add.text(x, 380, '▲', { fontSize: '38px', color: '#cccccc', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            const downBtn = this.add.text(x, 540, '▼', { fontSize: '38px', color: '#cccccc', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            upBtn.on('pointerup', () => { this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 1) % 10; this.codigoTexts[index].setText(this.codigoIngresado[index].toString()); });
            downBtn.on('pointerup', () => { this.codigoIngresado[index] = ((parseInt(this.codigoIngresado[index]) || 0) + 9) % 10; this.codigoTexts[index].setText(this.codigoIngresado[index].toString()); });
        }

        const confirmBtn = this.add.rectangle(cx, 630, 550, 80, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(cx, 630, t('capitulo3.chapter_code_confirm'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensajeFinal = this.add.text(cx, 700, '', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO3) {
            marcarResuelto(3, 4);
            this.mensajeFinal.setText(t('capitulo3.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto(); localStorage.setItem('tc_capitulo', '4'); localStorage.setItem('tc3_puzzle', '1');
            this.time.delayedCall(1500, () => {
                const cx = GAME_WIDTH / 2;
                const irBtn = this.add.rectangle(cx, GAME_HEIGHT - 110, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
                this.add.text(cx, GAME_HEIGHT - 110, '→ ' + t('interludio.title') + ' 3', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
                irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc4_puzzle', '1'); this.scene.start('Interludio', { numero: 3, siguiente: 'Capitulo4' }); });
            });
        } else {
            this.mensajeFinal.setText(t('capitulo3.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError(); if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}