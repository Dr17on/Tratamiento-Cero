const ELECTRODOS = [
    { nombre: 'Aqua',  color: 0x2a6aaa, simbolo: '💧' },
    { nombre: 'Ignis', color: 0xaa2a2a, simbolo: '🔥' },
    { nombre: 'Aer',   color: 0xaaaa2a, simbolo: '💨' },
    { nombre: 'Terra', color: 0x2a7a2a, simbolo: '🌱' }
];

const ORDEN_ELECTRODOS = [0, 1, 2, 3];

const PALABRAS_PUZLE2 = {
    correctas: ['recordar', 'silencio', 'épocas', 'voz', 'esperaba'],
    distractores: ['olvidar', 'ruido', 'días', 'eco', 'buscaba']
};

const FRAGMENTOS_PUZLE3 = [
    'Quien lea esto',
    'debe saber que',
    'el Tratamiento Cero',
    'fue',
    'un error.'
];

const PAGINAS_PUZLE4 = [
    { fecha: '14/02/1953', palabraKey: 'puzzle4_palabra1', hintKey: 'puzzle4_hint1' },
    { fecha: '03/05/1953', palabraKey: 'puzzle4_palabra2', hintKey: 'puzzle4_hint2' },
    { fecha: '21/07/1953', palabraKey: 'puzzle4_palabra3', hintKey: 'puzzle4_hint3' },
    { fecha: '12/10/1953', palabraKey: 'puzzle4_palabra4', hintKey: 'puzzle4_hint4' },
    { fecha: '30/12/1953', palabraKey: 'puzzle4_palabra5', hintKey: 'puzzle4_hint5' }
];

const CODIGO_CAPITULO2 = '8156';

class Capitulo2 extends Phaser.Scene {
    constructor() { super({ key: 'Capitulo2' }); }

    create() {
        if (this.sound.context && this.sound.context.state === 'suspended') { this.sound.context.resume(); }

        this.rol = localStorage.getItem('tc_rol') || 'eugenia';
        this.ambiente = null;
        this.tension = null;

        this.electrodosColocados = [null, null, null, null];
        this.palabrasColocadas = [null, null, null, null, null];
        this.fragmentosColocados = [null, null, null, null, null];
        this.paginasColocadas = [null, null, null, null, null];
        this.codigoIngresado = ['', '', '', ''];

        const ambienteKey = (this.rol === 'eugenia') ? 'ambiente_cap2_eugenia' : 'ambiente_cap2_mateo';
        if (this.cache.audio.exists(ambienteKey)) {
            this.ambiente = this.sound.add(ambienteKey, { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }
        if (this.cache.audio.exists('puzzle_completar')) {
            this.tension = this.sound.add('puzzle_completar', { loop: true, volume: getVolumen() * 0.18 });
            this.tension.play();
        }

        const puzzleGuardado = parseInt(localStorage.getItem('tc2_puzzle') || '1');
        if (puzzleGuardado === 2) this.mostrarPuzzle2();
        else if (puzzleGuardado === 3) this.mostrarPuzzle3();
        else if (puzzleGuardado === 4) this.mostrarPuzzle4();
        else if (puzzleGuardado === 5) this.mostrarFinal();
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
        const txt = this.add.text(cx, cy, texto, { fontSize: '36px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', wordWrap: { width: 1000 }, align: 'center' }).setOrigin(0.5).setAlpha(0);

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

        const fondoKey = (this.rol === 'eugenia') ? 'fondo_cap2_eugenia' : 'fondo_cap2_mateo';
        this.add.image(cx, cy, fondoKey).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

        const tinte = (this.rol === 'eugenia') ? 0xd4a050 : 0x1a2a5a;
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, tinte, 0.10);
        this.add.rectangle(cx, 35, GAME_WIDTH, 70, 0x000000, 0.6);
        this.add.rectangle(cx, GAME_HEIGHT - 20, GAME_WIDTH, 40, 0x000000, 0.6);
    }

    mostrarTitulo(mostrarAnterior = false) {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 55, 800, 80, 0x000000, 0.7);
        this.add.text(cx, 55, t('capitulo2.title'), { fontSize: '40px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        const backBtn = this.add.text(80, GAME_HEIGHT - 60, '← ' + t('common.back'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 16, y: 10 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Menu'); });

        if (mostrarAnterior) {
            const puzzleActual = parseInt(localStorage.getItem('tc2_puzzle') || '1');
            const labelTexto = (puzzleActual === 1) ? '← ' + t('chapters.chapter1') : '← ' + t('common.previous');
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
        siBtn.on('pointerup', () => { reiniciarCapitulo(2); destruir(); this.scene.restart(); });
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

    // ==========================================
    // PUZLE 1
    // ==========================================
    mostrarPuzzle1() {
        localStorage.setItem('tc2_puzzle', '1');
        this.crearFondo();
        this.mostrarTitulo(true);
        this.electrodosColocados = [null, null, null, null];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo2.puzzle1_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle1();
        else this.crearVistaMateoPuzzle1();
    }

    crearVistaEugeniaPuzzle1() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 360, 'panel_electrodos').setDisplaySize(650, 450);
        if (estaResuelto(2, 1)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2()); return; }

        const startX = cx - 210, spacing = 140;
        this.slots = [];
        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            const slot = this.add.rectangle(x, 300, 110, 110, 0x000000, 0.5).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slots.push(slot);
            this.add.text(x, 230, (i + 1).toString(), { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        }

        const electrodosDesordenados = [1, 3, 0, 2];
        this.electrodoObjetos = [];
        electrodosDesordenados.forEach((idx, i) => {
            const x = startX + i * spacing;
            const y = 540;
            const circulo = this.add.circle(x, y, 50, ELECTRODOS[idx].color).setStrokeStyle(4, 0xc0a060).setInteractive({ draggable: true, useHandCursor: true });
            const textoNombre = this.add.text(x, y, ELECTRODOS[idx].nombre, { fontSize: '18px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            circulo.electrodoIndex = idx; circulo.textoVinculado = textoNombre; circulo.posOriginal = { x: x, y: y };
            this.electrodoObjetos.push(circulo); this.input.setDraggable(circulo);
            circulo.on('drag', (pointer, dragX, dragY) => { circulo.x = dragX; circulo.y = dragY; textoNombre.x = dragX; textoNombre.y = dragY; });
            circulo.on('dragend', () => this.intentarColocarElectrodo(circulo));
        });
        this.mensaje = this.add.text(cx, GAME_HEIGHT - 60, t('capitulo2.puzzle1_eugenia_hint'), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
    }

    crearVistaMateoPuzzle1() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 400, 'pared_simbolos').setDisplaySize(800, 500);
        this.add.rectangle(cx, 670, 900, 60, 0x000000, 0.7);
        this.add.text(cx, 670, t('capitulo2.puzzle1_mateo_hint'), { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => { this.mostrarTransicion(t('transiciones.cap2_p2'), () => this.irAPuzzle2()); });
    }

    intentarColocarElectrodo(circulo) {
        let slotCercano = null, distanciaMin = 100;
        this.slots.forEach(slot => {
            const dist = Phaser.Math.Distance.Between(circulo.x, circulo.y, slot.x, slot.y);
            if (dist < distanciaMin) { distanciaMin = dist; slotCercano = slot; }
        });
        if (slotCercano) {
            const ocupado = this.electrodoObjetos.some(e => e !== circulo && e.slotAsignado === slotCercano.slotIndex);
            if (!ocupado) {
                circulo.x = slotCercano.x; circulo.y = slotCercano.y; circulo.textoVinculado.x = slotCercano.x; circulo.textoVinculado.y = slotCercano.y;
                if (circulo.slotAsignado !== undefined) this.electrodosColocados[circulo.slotAsignado] = null;
                circulo.slotAsignado = slotCercano.slotIndex; this.electrodosColocados[slotCercano.slotIndex] = circulo.electrodoIndex;
                if (this.electrodosColocados.every(e => e !== null)) this.verificarPuzzle1();
                return;
            }
        }
        circulo.x = circulo.posOriginal.x; circulo.y = circulo.posOriginal.y; circulo.textoVinculado.x = circulo.posOriginal.x; circulo.textoVinculado.y = circulo.posOriginal.y;
        if (circulo.slotAsignado !== undefined) { this.electrodosColocados[circulo.slotAsignado] = null; circulo.slotAsignado = undefined; }
    }

    verificarPuzzle1() {
        const ordenCorrecto = this.electrodosColocados.every((idx, pos) => idx === ORDEN_ELECTRODOS[pos]);
        if (ordenCorrecto) {
            marcarResuelto(2, 1); this.reproducirAcierto(); this.mensaje.setText(t('capitulo2.puzzle1_correct')).setColor('#66ff66');
            this.time.delayedCall(1500, () => { this.mostrarTransicion(t('transiciones.cap2_p2'), () => this.irAPuzzle2()); });
        } else {
            this.reproducirError(); this.mensaje.setText(t('capitulo2.puzzle1_wrong')).setColor('#ff6666');
            if (navigator.vibrate) navigator.vibrate(200);
            this.time.delayedCall(800, () => {
                this.electrodoObjetos.forEach(e => { e.x = e.posOriginal.x; e.y = e.posOriginal.y; e.textoVinculado.x = e.posOriginal.x; e.textoVinculado.y = e.posOriginal.y; e.slotAsignado = undefined; });
                this.electrodosColocados = [null, null, null, null]; this.mensaje.setText(t('capitulo2.puzzle1_eugenia_hint')).setColor('#c0a060');
            });
        }
    }

    irAPuzzle2() { localStorage.setItem('tc2_puzzle', '2'); this.scene.restart(); }

    // ==========================================
    // PUZLE 2
    // ==========================================
    mostrarPuzzle2() {
        this.crearFondo(); this.mostrarTitulo(true); this.palabrasColocadas = [null, null, null, null, null];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo2.puzzle2_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle2(); else this.crearVistaMateoPuzzle2();
    }

    crearVistaEugeniaPuzzle2() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 280, getImg('transcripcion')).setDisplaySize(850, 300);
        if (estaResuelto(2, 2)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle3()); return; }

        this.add.text(cx, 140, t('capitulo2.puzzle2_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const huecosY = 440, startX = cx - 240, spacing = 120;
        this.slotsPalabras = [];
        for (let i = 0; i < 5; i++) {
            const x = startX + i * spacing;
            const slot = this.add.rectangle(x, huecosY, 120, 60, 0x000000, 0.7).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slotsPalabras.push(slot);
        }

        const todasLasPalabras = [...PALABRAS_PUZLE2.correctas, ...PALABRAS_PUZLE2.distractores];
        const mezcladas = Phaser.Utils.Array.Shuffle([...todasLasPalabras]);

        this.palabrasObjetos = [];
        const bancoStartX = cx - 400, bancoY = 600, bancoSpacing = 160;

        mezcladas.forEach((palabra, i) => {
            const col = i % 5, fila = Math.floor(i / 5);
            const x = bancoStartX + col * bancoSpacing, y = bancoY + fila * 70;
            const caja = this.add.rectangle(x, y, 150, 55, 0x333333, 0.9).setStrokeStyle(2, 0xc0a060).setInteractive({ draggable: true, useHandCursor: true });
            const texto = this.add.text(x, y, palabra, { fontSize: '22px', color: '#ffffff', fontFamily: 'Courier New', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);
            caja.palabra = palabra; caja.textoVinculado = texto; caja.posOriginal = { x: x, y: y };
            this.palabrasObjetos.push(caja); this.input.setDraggable(caja);
            caja.on('drag', (pointer, dragX, dragY) => { caja.x = dragX; caja.y = dragY; texto.x = dragX; texto.y = dragY; });
            caja.on('dragend', () => this.intentarColocarPalabra(caja));
        });
    }

    crearVistaMateoPuzzle2() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 320, 'cinta_audio').setDisplaySize(650, 400);
        this.add.rectangle(cx, 120, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 120, t('capitulo2.puzzle2_mateo_hint'), { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.rectangle(cx, 580, 950, 150, 0x000000, 0.88).setStrokeStyle(2, 0xc0a060);
        this.add.text(cx, 530, '🔊 Palabras que se oyen en la cinta:', { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 580, PALABRAS_PUZLE2.correctas.join('   •   '), { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', wordWrap: { width: 850 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => { this.mostrarTransicion(t('transiciones.cap2_p3'), () => this.irAPuzzle3()); });
    }

    intentarColocarPalabra(caja) {
        let slotCercano = null, distanciaMin = 100;
        this.slotsPalabras.forEach(slot => {
            const dist = Phaser.Math.Distance.Between(caja.x, caja.y, slot.x, slot.y);
            if (dist < distanciaMin) { distanciaMin = dist; slotCercano = slot; }
        });
        if (slotCercano) {
            const ocupado = this.palabrasObjetos.some(p => p !== caja && p.slotAsignado === slotCercano.slotIndex);
            if (!ocupado) {
                caja.x = slotCercano.x; caja.y = slotCercano.y; caja.textoVinculado.x = slotCercano.x; caja.textoVinculado.y = slotCercano.y;
                if (caja.slotAsignado !== undefined) this.palabrasColocadas[caja.slotAsignado] = null;
                caja.slotAsignado = slotCercano.slotIndex; this.palabrasColocadas[slotCercano.slotIndex] = caja.palabra;
                if (this.palabrasColocadas.every(p => p !== null)) this.verificarPuzzle2();
                return;
            }
        }
        caja.x = caja.posOriginal.x; caja.y = caja.posOriginal.y; caja.textoVinculado.x = caja.posOriginal.x; caja.textoVinculado.y = caja.posOriginal.y;
        if (caja.slotAsignado !== undefined) { this.palabrasColocadas[caja.slotAsignado] = null; caja.slotAsignado = undefined; }
    }

    verificarPuzzle2() {
        const correcto = this.palabrasColocadas.every((palabra, pos) => palabra === PALABRAS_PUZLE2.correctas[pos]);
        if (correcto) {
            marcarResuelto(2, 2); this.reproducirAcierto(); this.mostrarMensajeGlobal(t('capitulo2.puzzle2_correct'), '#66ff66');
            this.time.delayedCall(800, () => {
                const cx = GAME_WIDTH / 2;
                const overlay = this.add.rectangle(cx, 360, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.95).setDepth(50);
                const img = this.add.image(cx, 340, getImg('transcripcion_completa')).setDisplaySize(950, 550).setDepth(51);
                const ok = this.add.text(cx, GAME_HEIGHT - 70, '✓ Mensaje descifrado', { fontSize: '32px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5).setDepth(52);
                this.time.delayedCall(2500, () => { overlay.destroy(); img.destroy(); ok.destroy(); this.mostrarTransicion(t('transiciones.cap2_p3'), () => this.irAPuzzle3()); });
            });
        } else {
            this.reproducirError(); this.mostrarMensajeGlobal(t('capitulo2.puzzle2_wrong'), '#ff6666');
            if (navigator.vibrate) navigator.vibrate(200);
            this.time.delayedCall(800, () => {
                this.palabrasObjetos.forEach(p => { p.x = p.posOriginal.x; p.y = p.posOriginal.y; p.textoVinculado.x = p.posOriginal.x; p.textoVinculado.y = p.posOriginal.y; p.slotAsignado = undefined; });
                this.palabrasColocadas = [null, null, null, null, null];
            });
        }
    }

    irAPuzzle3() { localStorage.setItem('tc2_puzzle', '3'); this.scene.restart(); }

    // ==========================================
    // PUZLE 3
    // ==========================================
    mostrarPuzzle3() {
        this.crearFondo(); this.mostrarTitulo(true); this.fragmentosColocados = [null, null, null, null, null];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo2.puzzle3_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle3(); else this.crearVistaMateoPuzzle3();
    }

    crearVistaEugeniaPuzzle3() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 320, getImg('espejo_eugenia')).setDisplaySize(700, 450);
        if (estaResuelto(2, 3)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle4()); return; }

        this.add.rectangle(cx, 130, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 130, t('capitulo2.puzzle3_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const startY = 600, startX = 200, spacingX = 220;
        this.slotsFragmentos = [];
        for (let i = 0; i < 5; i++) {
            const x = startX + i * spacingX;
            const slot = this.add.rectangle(x, startY, 200, 65, 0x000000, 0.7).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slotsFragmentos.push(slot);
            this.add.text(x - 110, startY, (i + 1).toString(), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        }

        const ordenDesordenado = [1, 4, 2, 0, 3];
        this.fragmentosObjetos = [];
        ordenDesordenado.forEach((idx, i) => {
            const x = 200 + i * 220, y = 510;
            const caja = this.add.rectangle(x, y, 210, 65, 0x333333, 0.95).setStrokeStyle(2, 0xc0a060).setInteractive({ draggable: true, useHandCursor: true });
            const texto = this.add.text(x, y, FRAGMENTOS_PUZLE3[idx], { fontSize: '18px', color: '#ffffff', fontFamily: 'Courier New', wordWrap: { width: 200 }, align: 'center', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);
            caja.fragmentoIndex = idx; caja.textoVinculado = texto; caja.posOriginal = { x: x, y: y };
            this.fragmentosObjetos.push(caja); this.input.setDraggable(caja);
            caja.on('drag', (pointer, dragX, dragY) => { caja.x = dragX; caja.y = dragY; texto.x = dragX; texto.y = dragY; });
            caja.on('dragend', () => this.intentarColocarFragmento(caja));
        });
    }

    crearVistaMateoPuzzle3() {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 300, getImg('espejo_roto')).setDisplaySize(600, 420);
        this.add.rectangle(cx, 110, 850, 50, 0x000000, 0.7);
        this.add.text(cx, 110, t('capitulo2.puzzle3_mateo_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.rectangle(cx, 580, 950, 220, 0x000000, 0.88).setStrokeStyle(2, 0xc0a060);
        this.add.text(cx, 490, '📜 Números grabados detrás de cada fragmento:', { fontSize: '24px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);

        const mapeo = [
            { num: 'I',   texto: FRAGMENTOS_PUZLE3[0] },
            { num: 'II',  texto: FRAGMENTOS_PUZLE3[1] },
            { num: 'III', texto: FRAGMENTOS_PUZLE3[2] },
            { num: 'IV',  texto: FRAGMENTOS_PUZLE3[3] },
            { num: 'V',   texto: FRAGMENTOS_PUZLE3[4] }
        ];
        mapeo.forEach((item, i) => {
            const x = cx - 400 + i * 200;
            this.add.text(x, 540, item.num, { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            this.add.text(x, 590, item.texto, { fontSize: '15px', color: '#ffffff', fontFamily: 'Courier New', wordWrap: { width: 180 }, align: 'center', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);
        });

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => { this.mostrarTransicion(t('transiciones.cap2_p4'), () => this.irAPuzzle4()); });
    }

    intentarColocarFragmento(caja) {
        let slotCercano = null, distanciaMin = 130;
        this.slotsFragmentos.forEach(slot => {
            const dist = Phaser.Math.Distance.Between(caja.x, caja.y, slot.x, slot.y);
            if (dist < distanciaMin) { distanciaMin = dist; slotCercano = slot; }
        });
        if (slotCercano) {
            const ocupado = this.fragmentosObjetos.some(f => f !== caja && f.slotAsignado === slotCercano.slotIndex);
            if (!ocupado) {
                caja.x = slotCercano.x; caja.y = slotCercano.y; caja.textoVinculado.x = slotCercano.x; caja.textoVinculado.y = slotCercano.y;
                if (caja.slotAsignado !== undefined) this.fragmentosColocados[caja.slotAsignado] = null;
                caja.slotAsignado = slotCercano.slotIndex; this.fragmentosColocados[slotCercano.slotIndex] = caja.fragmentoIndex;
                if (this.fragmentosColocados.every(f => f !== null)) this.verificarPuzzle3();
                return;
            }
        }
        caja.x = caja.posOriginal.x; caja.y = caja.posOriginal.y; caja.textoVinculado.x = caja.posOriginal.x; caja.textoVinculado.y = caja.posOriginal.y;
        if (caja.slotAsignado !== undefined) { this.fragmentosColocados[caja.slotAsignado] = null; caja.slotAsignado = undefined; }
    }

    verificarPuzzle3() {
        const correcto = this.fragmentosColocados.every((idx, pos) => idx === pos);
        if (correcto) {
            marcarResuelto(2, 3); this.reproducirAcierto(); this.mostrarMensajeGlobal(t('capitulo2.puzzle3_correct'), '#66ff66');
            this.time.delayedCall(1500, () => { this.mostrarTransicion(t('transiciones.cap2_p4'), () => this.irAPuzzle4()); });
        } else {
            this.reproducirError(); this.mostrarMensajeGlobal(t('capitulo2.puzzle3_wrong'), '#ff6666');
            if (navigator.vibrate) navigator.vibrate(200);
            this.time.delayedCall(800, () => {
                this.fragmentosObjetos.forEach(f => { f.x = f.posOriginal.x; f.y = f.posOriginal.y; f.textoVinculado.x = f.posOriginal.x; f.textoVinculado.y = f.posOriginal.y; f.slotAsignado = undefined; });
                this.fragmentosColocados = [null, null, null, null, null];
            });
        }
    }

    irAPuzzle4() { localStorage.setItem('tc2_puzzle', '4'); this.scene.restart(); }

    // ==========================================
    // PUZLE 4
    // ==========================================
    mostrarPuzzle4() {
        this.crearFondo(); this.mostrarTitulo(true); this.paginasColocadas = [null, null, null, null, null];
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo2.puzzle4_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        if (this.rol === 'eugenia') this.crearVistaEugeniaPuzzle4(); else this.crearVistaMateoPuzzle4();
    }

    crearVistaEugeniaPuzzle4() {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 140, 850, 50, 0x000000, 0.7);
        this.add.text(cx, 140, t('capitulo2.puzzle4_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (estaResuelto(2, 4)) { this.mostrarPuzzleResueltoOverlay(() => this.irAFinal()); return; }

        const startY = 240, spacingY = 65;
        this.slotsPaginas = [];
        for (let i = 0; i < 5; i++) {
            const y = startY + i * spacingY;
            const slot = this.add.rectangle(cx, y, 650, 55, 0x000000, 0.6).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slotsPaginas.push(slot);
            this.add.text(cx - 320, y, (i + 1).toString(), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        }

        const ordenDesordenado = [3, 1, 4, 0, 2];
        this.paginasObjetos = [];
        ordenDesordenado.forEach((idx, i) => {
            const y = 600;
            const x = 180 + i * 220;
            const caja = this.add.rectangle(x, y, 190, 55, 0xd4c4a0, 0.95).setStrokeStyle(2, 0x8b6b3a).setInteractive({ draggable: true, useHandCursor: true });
            const texto = this.add.text(x, y, t('capitulo2.' + PAGINAS_PUZLE4[idx].palabraKey), { fontSize: '22px', color: '#1a1a1a', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            
            caja.paginaIndex = idx; caja.textoVinculado = texto; caja.posOriginal = { x: x, y: y };
            this.paginasObjetos.push(caja); this.input.setDraggable(caja);
            caja.on('drag', (pointer, dragX, dragY) => { caja.x = dragX; caja.y = dragY; texto.x = dragX; texto.y = dragY; });
            caja.on('dragend', () => this.intentarColocarPagina(caja));
        });
    }

    crearVistaMateoPuzzle4() {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 120, 850, 50, 0x000000, 0.7);
        this.add.text(cx, 120, t('capitulo2.puzzle4_mateo_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const notasPos = [
            { x: cx - 380, y: 240 }, { x: cx + 280, y: 220 }, { x: cx - 150, y: 400 }, { x: cx + 380, y: 380 }, { x: cx + 20,  y: 550 }
        ];

        PAGINAS_PUZLE4.forEach((pag, i) => {
            const pos = notasPos[i];
            const angulo = (Math.random() - 0.5) * 10;

            this.add.rectangle(pos.x, pos.y, 320, 130, 0xd4c4a0, 0.95).setStrokeStyle(3, 0x8b6b3a).setAngle(angulo);
            this.add.text(pos.x, pos.y - 35, pag.fecha, { fontSize: '26px', color: '#1a1a1a', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5).setAngle(angulo);
            this.add.text(pos.x, pos.y + 20, t('capitulo2.' + pag.hintKey), { fontSize: '20px', color: '#8b3a3a', fontFamily: 'Courier New', fontStyle: 'bold', wordWrap: { width: 300 }, align: 'center' }).setOrigin(0.5).setAngle(angulo);
        });

        const continueBtn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        continueBtn.on('pointerup', () => this.irAFinal());
    }

    intentarColocarPagina(caja) {
        let slotCercano = null, distanciaMin = 130;
        this.slotsPaginas.forEach(slot => {
            const dist = Phaser.Math.Distance.Between(caja.x, caja.y, slot.x, slot.y);
            if (dist < distanciaMin) { distanciaMin = dist; slotCercano = slot; }
        });
        if (slotCercano) {
            const ocupado = this.paginasObjetos.some(p => p !== caja && p.slotAsignado === slotCercano.slotIndex);
            if (!ocupado) {
                caja.x = slotCercano.x; caja.y = slotCercano.y; caja.textoVinculado.x = slotCercano.x; caja.textoVinculado.y = slotCercano.y;
                if (caja.slotAsignado !== undefined) this.paginasColocadas[caja.slotAsignado] = null;
                caja.slotAsignado = slotCercano.slotIndex; this.paginasColocadas[slotCercano.slotIndex] = caja.paginaIndex;
                if (this.paginasColocadas.every(p => p !== null)) this.verificarPuzzle4();
                return;
            }
        }
        caja.x = caja.posOriginal.x; caja.y = caja.posOriginal.y; caja.textoVinculado.x = caja.posOriginal.x; caja.textoVinculado.y = caja.posOriginal.y;
        if (caja.slotAsignado !== undefined) { this.paginasColocadas[caja.slotAsignado] = null; caja.slotAsignado = undefined; }
    }

    verificarPuzzle4() {
        const correcto = this.paginasColocadas.every((idx, pos) => idx === pos);
        if (correcto) {
            marcarResuelto(2, 4); this.reproducirAcierto(); this.mostrarMensajeGlobal(t('capitulo2.puzzle4_correct'), '#66ff66');
            this.time.delayedCall(1800, () => this.irAFinal());
        } else {
            this.reproducirError(); this.mostrarMensajeGlobal(t('capitulo2.puzzle4_wrong'), '#ff6666');
            if (navigator.vibrate) navigator.vibrate(200);
            this.time.delayedCall(800, () => {
                this.paginasObjetos.forEach(p => { p.x = p.posOriginal.x; p.y = p.posOriginal.y; p.textoVinculado.x = p.posOriginal.x; p.textoVinculado.y = p.posOriginal.y; p.slotAsignado = undefined; });
                this.paginasColocadas = [null, null, null, null, null];
            });
        }
    }

    mostrarMensajeGlobal(texto, color) {
        const cx = GAME_WIDTH / 2;
        if (this.mensajeGlobal) this.mensajeGlobal.destroy();
        this.mensajeGlobal = this.add.text(cx, GAME_HEIGHT - 70, texto, { fontSize: '26px', color: color, fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
    }

    irAPuzzleAnterior() {
        const actual = parseInt(localStorage.getItem('tc2_puzzle') || '1');
        if (actual === 5) { localStorage.setItem('tc2_puzzle', '4'); this.scene.restart(); }
        else if (actual === 4) { localStorage.setItem('tc2_puzzle', '3'); this.scene.restart(); }
        else if (actual === 3) { localStorage.setItem('tc2_puzzle', '2'); this.scene.restart(); }
        else if (actual === 2) { localStorage.setItem('tc2_puzzle', '1'); this.scene.restart(); }
        else if (actual === 1) { this.detenerAmbiente(); this.scene.start('Capitulo1'); }
    }

    irAFinal() {
        localStorage.setItem('tc2_puzzle', '5');
        this.detenerAmbiente();
        if (this.cache.audio.exists('revelacion_cap2')) {
            this.revelacionMusica = this.sound.add('revelacion_cap2', { loop: true, volume: getVolumen() * 0.5 });
            this.revelacionMusica.play();
        }
        this.scene.restart();
    }

    mostrarFinal() {
        this.crearFondo(); this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        this.add.text(cx, 130, t('capitulo2.chapter_end_title'), { fontSize: '46px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        const miMitad = (this.rol === 'eugenia') ? '81--' : '--56';
        const etiqueta = (this.rol === 'eugenia') ? t('capitulo2.chapter_end_eugenia') : t('capitulo2.chapter_end_mateo');

        this.add.text(cx, 220, etiqueta, { fontSize: '28px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 290, miMitad, { fontSize: '80px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);

        if (estaResuelto(2, 5)) {
            this.add.text(cx, 400, t('common.puzzle_resuelto'), { fontSize: '32px', color: '#66ff66', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
            const irBtn = this.add.rectangle(cx, 510, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(cx, 510, '→ ' + t('interludio.title') + ' 2', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc3_puzzle', '1'); this.scene.start('Interludio', { numero: 2, siguiente: 'Capitulo3' }); });
            return;
        }

        this.add.text(cx, 360, t('capitulo2.chapter_end_instruction'), { fontSize: '24px', color: '#cccccc', fontFamily: 'Courier New', wordWrap: { width: 1000 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
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
        this.add.text(cx, 630, t('capitulo2.chapter_code_confirm'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensajeFinal = this.add.text(cx, 700, '', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO2) {
            marcarResuelto(2, 5);
            this.mensajeFinal.setText(t('capitulo2.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto(); localStorage.setItem('tc_capitulo', '3'); localStorage.setItem('tc2_puzzle', '1');
            this.time.delayedCall(1500, () => {
                const cx = GAME_WIDTH / 2;
                const irBtn = this.add.rectangle(cx, GAME_HEIGHT - 110, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
                this.add.text(cx, GAME_HEIGHT - 110, '→ ' + t('interludio.title') + ' 2', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
                irBtn.on('pointerup', () => { this.detenerAmbiente(); localStorage.setItem('tc3_puzzle', '1'); this.scene.start('Interludio', { numero: 2, siguiente: 'Capitulo3' }); });
            });
        } else {
            this.mensajeFinal.setText(t('capitulo2.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError(); if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}