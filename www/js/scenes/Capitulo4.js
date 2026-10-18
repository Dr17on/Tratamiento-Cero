const CABLES_SOLUCION = [0, 1, 2, 3]; // 0=Rojo, 1=Azul, 2=Amarillo, 3=Verde
const FRECUENCIA_SOLUCION = 33.7;
const NOMBRE_SOLUCION = ['C', 'A', 'R', 'M', 'E', 'N'];
const CODIGO_CAPITULO4 = '1953';

class Capitulo4 extends Phaser.Scene {
    constructor() { super({ key: 'Capitulo4' }); }

    create() {
        if (this.sound.context && this.sound.context.state === 'suspended') { this.sound.context.resume(); }

        this.rol = localStorage.getItem('tc_rol') || 'eugenia';
        this.ambiente = null;

        this.cablesColocados = [null, null, null, null];
        this.frecuenciaActual = 30.0;
        this.nombreActual = [0, 0, 0, 0, 0, 0]; // Índices del alfabeto

        if (this.cache.audio.exists('ambiente_cap4')) {
            this.ambiente = this.sound.add('ambiente_cap4', { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }

        const puzzleGuardado = parseInt(localStorage.getItem('tc4_puzzle') || '1');
        if (puzzleGuardado === 2) this.mostrarPuzzle2();
        else if (puzzleGuardado === 3) this.mostrarPuzzle3();
        else if (puzzleGuardado === 4) this.mostrarFinal();
        else this.mostrarPuzzle1();
    }

    reproducirAcierto() { if (this.cache.audio.exists('acierto')) this.sound.play('acierto', { volume: getVolumen() * 0.7 }); }
    reproducirError() { if (this.cache.audio.exists('error')) this.sound.play('error', { volume: getVolumen() * 0.7 }); }
    detenerAmbiente() { if (this.ambiente) this.ambiente.stop(); }

    crearFondo() {
        this.children.removeAll();
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        
        if (this.textures.exists('fondo_cap4')) {
            this.add.image(cx, cy, 'fondo_cap4').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        } else {
            this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x0a0a0a);
        }

        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.6); // Oscurecer para legibilidad
        this.add.rectangle(cx, 30, GAME_WIDTH, 60, 0x000000, 0.6);
        this.add.rectangle(cx, GAME_HEIGHT - 15, GAME_WIDTH, 30, 0x000000, 0.6);
    }

    mostrarTitulo() {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 55, 700, 70, 0x000000, 0.65);
        this.add.text(cx, 55, t('capitulo4.title'), { fontSize: '32px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        const backBtn = this.add.text(80, GAME_HEIGHT - 60, '← ' + t('common.back'), { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 14, y: 8 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Menu'); });

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
        siBtn.on('pointerup', () => { reiniciarCapitulo(4); destruir(); this.scene.restart(); });
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

    // ==========================================
    // PUZLE 1 - CABLES
    // ==========================================
    mostrarPuzzle1() {
        localStorage.setItem('tc4_puzzle', '1');
        this.crearFondo(); this.mostrarTitulo();
        this.cablesColocados = [null, null, null, null];
        
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 700, 40, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle1_title'), { fontSize: '24px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (this.rol === 'eugenia') this.crearVistaCables(true);
        else this.crearVistaCables(false);
    }

    crearVistaCables(esEugenia) {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 380, 'silla_electroshock').setDisplaySize(600, 400);

        if (estaResuelto(4, 1)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2()); return; }

        const infoText = esEugenia ? t('capitulo4.puzzle1_eugenia_hint') : t('capitulo4.puzzle1_mateo_hint');
        this.add.text(cx, 140, infoText, { fontSize: '20px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (!esEugenia) {
            const btn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 60, 220, 60, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 60, t('capitulo1.continuar'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerup', () => this.irAPuzzle2());
            return;
        }

        // Solo Eugenia juega con los cables
        const colores = [0xaa2a2a, 0x2a6aaa, 0xaaaa2a, 0x2a7a2a];
        const startX = cx - 210, spacing = 140;
        this.slotsCables = [];

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            const slot = this.add.rectangle(x, 300, 100, 100, 0x000000, 0.5).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slotsCables.push(slot);
            this.add.text(x, 240, (i + 1).toString(), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        }

        this.cableObjetos = [];
        [2, 0, 3, 1].forEach((colorIdx, i) => {
            const x = startX + i * spacing;
            const y = 560;
            const caja = this.add.rectangle(x, y, 80, 80, colores[colorIdx]).setStrokeStyle(4, 0xffffff, 0.5).setInteractive({ draggable: true, useHandCursor: true });
            caja.colorIndex = colorIdx; caja.posOriginal = { x: x, y: y };
            this.cableObjetos.push(caja); this.input.setDraggable(caja);
            caja.on('drag', (pointer, dragX, dragY) => { caja.x = dragX; caja.y = dragY; });
            caja.on('dragend', () => this.intentarColocarCable(caja));
        });
    }

    intentarColocarCable(caja) {
        let slotCercano = null, distanciaMin = 100;
        this.slotsCables.forEach(slot => {
            const dist = Phaser.Math.Distance.Between(caja.x, caja.y, slot.x, slot.y);
            if (dist < distanciaMin) { distanciaMin = dist; slotCercano = slot; }
        });
        if (slotCercano) {
            const ocupado = this.cableObjetos.some(c => c !== caja && c.slotAsignado === slotCercano.slotIndex);
            if (!ocupado) {
                caja.x = slotCercano.x; caja.y = slotCercano.y;
                if (caja.slotAsignado !== undefined) this.cablesColocados[caja.slotAsignado] = null;
                caja.slotAsignado = slotCercano.slotIndex; this.cablesColocados[slotCercano.slotIndex] = caja.colorIndex;
                if (this.cablesColocados.every(c => c !== null)) this.verificarPuzzle1();
                return;
            }
        }
        caja.x = caja.posOriginal.x; caja.y = caja.posOriginal.y;
        if (caja.slotAsignado !== undefined) { this.cablesColocados[caja.slotAsignado] = null; caja.slotAsignado = undefined; }
    }

    verificarPuzzle1() {
        const correcto = this.cablesColocados.every((c, i) => c === CABLES_SOLUCION[i]);
        if (correcto) {
            marcarResuelto(4, 1); this.reproducirAcierto();
            this.time.delayedCall(800, () => { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2()); });
        } else {
            this.reproducirError();
            if (navigator.vibrate) navigator.vibrate(200);
            this.time.delayedCall(800, () => {
                this.cableObjetos.forEach(c => { c.x = c.posOriginal.x; c.y = c.posOriginal.y; c.slotAsignado = undefined; });
                this.cablesColocados = [null, null, null, null];
            });
        }
    }

    // ==========================================
    // PUZLE 2 - RADIO
    // ==========================================
    irAPuzzle2() { localStorage.setItem('tc4_puzzle', '2'); this.scene.restart(); }

    mostrarPuzzle2() {
        this.crearFondo(); this.mostrarTitulo();
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 700, 40, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle2_title'), { fontSize: '24px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.add.image(cx, 380, 'radio_antigua').setDisplaySize(500, 400);

        if (estaResuelto(4, 2)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle3()); return; }

        if (this.rol === 'eugenia') {
            this.add.text(cx, 160, t('capitulo4.puzzle2_eugenia_hint'), { fontSize: '22px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            const btn = this.add.rectangle(GAME_WIDTH - 140, GAME_HEIGHT - 60, 220, 60, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 60, t('capitulo1.continuar'), { fontSize: '20px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerup', () => this.irAPuzzle3());
            return;
        }

        // Mateo sintoniza la radio
        this.add.text(cx, 160, t('capitulo4.puzzle2_mateo_hint'), { fontSize: '20px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.frecuenciaActual = 30.0;
        this.frecuenciaText = this.add.text(cx, 380, this.frecuenciaActual.toFixed(1) + ' MHz', { fontSize: '42px', color: '#00ff00', fontFamily: 'Courier New', fontStyle: 'bold', backgroundColor: '#111111', padding: {x: 20, y: 10} }).setOrigin(0.5);

        const upBtn = this.add.text(cx + 200, 380, '▲', { fontSize: '48px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const downBtn = this.add.text(cx - 200, 380, '▼', { fontSize: '48px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        upBtn.on('pointerup', () => this.cambiarFrecuencia(0.1));
        downBtn.on('pointerup', () => this.cambiarFrecuencia(-0.1));
    }

    cambiarFrecuencia(cambio) {
        this.frecuenciaActual = Math.round((this.frecuenciaActual + cambio) * 10) / 10;
        this.frecuenciaText.setText(this.frecuenciaActual.toFixed(1) + ' MHz');

        if (Math.abs(this.frecuenciaActual - FRECUENCIA_SOLUCION) < 0.01) {
            marcarResuelto(4, 2); this.reproducirAcierto();
            this.time.delayedCall(800, () => { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle3()); });
        }
    }

    // ==========================================
    // PUZLE 3 - NOMBRE
    // ==========================================
    irAPuzzle3() { localStorage.setItem('tc4_puzzle', '3'); this.scene.restart(); }

    mostrarPuzzle3() {
        this.crearFondo(); this.mostrarTitulo();
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 700, 40, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle3_title'), { fontSize: '24px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.add.image(cx + 300, 380, 'retrato_carmen').setDisplaySize(250, 300).setAlpha(0.8);

        if (estaResuelto(4, 3)) { this.mostrarPuzzleResueltoOverlay(() => this.irAFinal()); return; }

        const hint = (this.rol === 'eugenia') ? t('capitulo4.puzzle3_eugenia_hint') : t('capitulo4.puzzle3_mateo_hint');
        this.add.text(cx - 100, 160, hint, { fontSize: '22px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.nombreActual = [0, 0, 0, 0, 0, 0];
        this.letrasTexts = [];

        const startX = cx - 350, spacing = 100;
        for (let i = 0; i < 6; i++) {
            const x = startX + i * spacing;
            
            const btnUp = this.add.text(x, 320, '▲', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            this.add.rectangle(x, 380, 70, 70, 0x1a1a1a, 0.9).setStrokeStyle(3, 0xc0a060);
            const txt = this.add.text(x, 380, letrasAlfabeto[0], { fontSize: '36px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            const btnDown = this.add.text(x, 440, '▼', { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            this.letrasTexts.push(txt);

            const idx = i;
            btnUp.on('pointerup', () => this.rotarLetra(idx, 1));
            btnDown.on('pointerup', () => this.rotarLetra(idx, -1));
        }
    }

    rotarLetra(index, delta) {
        const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let val = this.nombreActual[index];
        val = (val + delta + 26) % 26;
        this.nombreActual[index] = val;
        this.letrasTexts[index].setText(letrasAlfabeto[val]);

        const palabra = this.nombreActual.map(i => letrasAlfabeto[i]).join('');
        if (palabra === NOMBRE_SOLUCION.join('')) {
            marcarResuelto(4, 3); this.reproducirAcierto();
            this.time.delayedCall(800, () => { this.mostrarPuzzleResueltoOverlay(() => this.irAFinal()); });
        }
    }

    // ==========================================
    // FINAL
    // ==========================================
    irAFinal() {
        localStorage.setItem('tc4_puzzle', '4');
        this.detenerAmbiente();
        if (this.cache.audio.exists('final_giro')) {
            this.revelacionMusica = this.sound.add('final_giro', { loop: true, volume: getVolumen() * 0.6 });
            this.revelacionMusica.play();
        }
        this.scene.restart();
    }

    mostrarFinal() {
        this.crearFondo(); this.mostrarTitulo();
        const cx = GAME_WIDTH / 2;
        
        this.add.text(cx, 130, t('capitulo4.chapter_end_title'), { fontSize: '40px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        const miMitad = (this.rol === 'eugenia') ? '19--' : '--53';
        const etiqueta = (this.rol === 'eugenia') ? t('capitulo4.chapter_end_eugenia') : t('capitulo4.chapter_end_mateo');

        this.add.text(cx, 210, etiqueta, { fontSize: '22px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 270, miMitad, { fontSize: '70px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);

        if (estaResuelto(4, 4)) {
            const irBtn = this.add.rectangle(cx, 510, 560, 70, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(cx, 510, '→ ' + t('interludio.title') + ' 4 (Final)', { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            irBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Interludio', { numero: 4, siguiente: 'Creditos' }); });
            return;
        }

        this.add.text(cx, 340, t('capitulo4.chapter_end_instruction'), { fontSize: '20px', color: '#cccccc', fontFamily: 'Courier New', wordWrap: { width: 900 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
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
        this.add.text(cx, 600, t('capitulo4.chapter_code_confirm'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensajeFinal = this.add.text(cx, 680, '', { fontSize: '24px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO4) {
            marcarResuelto(4, 4);
            this.mensajeFinal.setText(t('capitulo4.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1500, () => {
                const cx = GAME_WIDTH / 2;
                const irBtn = this.add.rectangle(cx, GAME_HEIGHT - 110, 560, 70, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
                this.add.text(cx, GAME_HEIGHT - 110, '→ ' + t('interludio.title') + ' 4 (Final)', { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
                irBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Interludio', { numero: 4, siguiente: 'Creditos' }); });
            });
        } else {
            this.mensajeFinal.setText(t('capitulo4.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError(); if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}