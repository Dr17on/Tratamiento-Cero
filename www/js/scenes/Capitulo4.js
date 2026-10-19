const CABLES_SOLUCION = [0, 1, 2, 3];
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
        this.nombreActual = [0, 0, 0, 0, 0, 0];

        if (this.cache.audio.exists('ambiente_cap4')) {
            this.ambiente = this.sound.add('ambiente_cap4', { loop: true, volume: getVolumen() * 0.35 });
            this.ambiente.play();
        }

        // ✅ GUARDADO INDEPENDIENTE POR ROL
        const puzzleGuardado = parseInt(localStorage.getItem('tc4_puzzle_' + this.rol) || '1');
        if (puzzleGuardado === 2) this.mostrarPuzzle2();
        else if (puzzleGuardado === 3) this.mostrarPuzzle3();
        else if (puzzleGuardado === 4) this.mostrarFinal();
        else this.mostrarPuzzle1();
    }

    reproducirAcierto() { if (this.cache.audio.exists('acierto')) this.sound.play('acierto', { volume: getVolumen() * 0.7 }); }
    reproducirError() { if (this.cache.audio.exists('error')) this.sound.play('error', { volume: getVolumen() * 0.7 }); }
    detenerAmbiente() { if (this.ambiente) this.ambiente.stop(); }

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
                this.time.delayedCall(3000, () => {
                    this.cameras.main.fadeOut(800, 0, 0, 0);
                    this.time.delayedCall(900, callback);
                });
            }
        });
    }

    crearFondo() {
        this.children.removeAll();
        const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
        
        if (this.textures.exists('fondo_cap4')) {
            this.add.image(cx, cy, 'fondo_cap4').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        } else {
            this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x0a0a0a);
        }

        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.6);
        this.add.rectangle(cx, 35, GAME_WIDTH, 70, 0x000000, 0.6);
        this.add.rectangle(cx, GAME_HEIGHT - 20, GAME_WIDTH, 40, 0x000000, 0.6);
    }

    mostrarTitulo(mostrarAnterior = false) {
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 55, 800, 80, 0x000000, 0.7);
        this.add.text(cx, 55, t('capitulo4.title'), { fontSize: '40px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        // Botón Menú
        const backBtn = this.add.text(80, GAME_HEIGHT - 60, '← ' + t('common.back'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#444444', padding: { x: 16, y: 10 } }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Menu'); });

        // Botón Anterior
        if (mostrarAnterior) {
            const puzzleActual = parseInt(localStorage.getItem('tc4_puzzle_' + this.rol) || '1');
            const labelTexto = (puzzleActual === 1) ? '← ' + t('chapters.chapter3') : '← ' + t('common.previous');
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
        siBtn.on('pointerup', () => { 
            localStorage.removeItem('tc4_puzzle_' + this.rol);
            for(let i=1; i<=4; i++) localStorage.removeItem('tc4_p_' + i + '_resuelto_' + this.rol);
            destruir(); this.scene.restart(); 
        });
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

    irAPuzzleAnterior() {
        const actual = parseInt(localStorage.getItem('tc4_puzzle_' + this.rol) || '1');
        if (actual === 4) { localStorage.setItem('tc4_puzzle_' + this.rol, '3'); this.scene.restart(); }
        else if (actual === 3) { localStorage.setItem('tc4_puzzle_' + this.rol, '2'); this.scene.restart(); }
        else if (actual === 2) { localStorage.setItem('tc4_puzzle_' + this.rol, '1'); this.scene.restart(); }
        else if (actual === 1) { this.detenerAmbiente(); this.scene.start('Capitulo3'); }
    }

    // ==========================================
    // PUZLE 1 - CABLES
    // ==========================================
    mostrarPuzzle1() {
        localStorage.setItem('tc4_puzzle_' + this.rol, '1');
        this.crearFondo(); this.mostrarTitulo(true);
        this.cablesColocados = [null, null, null, null];
        
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle1_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (this.rol === 'eugenia') this.crearVistaCables(true);
        else this.crearVistaCables(false);
    }

    crearVistaCables(esEugenia) {
        const cx = GAME_WIDTH / 2;
        this.add.image(cx, 380, 'silla_electroshock').setDisplaySize(650, 450);

        if (estaResuelto(4, 1, this.rol)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle2()); return; }

        const infoText = esEugenia ? t('capitulo4.puzzle1_eugenia_hint') : t('capitulo4.puzzle1_mateo_hint');
        this.add.text(cx, 150, infoText, { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        if (!esEugenia) {
            const btn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerup', () => this.irAPuzzle2());
            return;
        }

        const colores = [0xaa2a2a, 0x2a6aaa, 0xaaaa2a, 0x2a7a2a];
        const startX = cx - 210, spacing = 140;
        this.slotsCables = [];

        for (let i = 0; i < 4; i++) {
            const x = startX + i * spacing;
            const slot = this.add.rectangle(x, 300, 110, 110, 0x000000, 0.5).setStrokeStyle(3, 0xc0a060);
            slot.slotIndex = i; this.slotsCables.push(slot);
            this.add.text(x, 230, (i + 1).toString(), { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        }

        this.cableObjetos = [];
        [2, 0, 3, 1].forEach((colorIdx, i) => {
            const x = startX + i * spacing;
            const y = 560;
            const caja = this.add.rectangle(x, y, 90, 90, colores[colorIdx]).setStrokeStyle(4, 0xffffff, 0.5).setInteractive({ draggable: true, useHandCursor: true });
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
            marcarResuelto(4, 1, this.rol); this.reproducirAcierto();
            this.time.delayedCall(800, () => { 
                this.mostrarTransicion(t('transiciones.cap4_p2'), () => this.irAPuzzle2()); 
            });
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
    irAPuzzle2() { localStorage.setItem('tc4_puzzle_' + this.rol, '2'); this.scene.restart(); }

    mostrarPuzzle2() {
        this.crearFondo(); this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle2_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.add.image(cx, 380, 'radio_antigua').setDisplaySize(600, 450);

        if (estaResuelto(4, 2, this.rol)) { this.mostrarPuzzleResueltoOverlay(() => this.irAPuzzle3()); return; }

        if (this.rol === 'eugenia') {
            this.add.text(cx, 160, t('capitulo4.puzzle2_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            this.add.text(cx, 230, t('capitulo4.puzzle2_eugenia_frecuencia'), { fontSize: '36px', color: '#00ff00', fontFamily: 'Courier New', fontStyle: 'bold', backgroundColor: '#111111', padding: {x: 25, y: 15} }).setOrigin(0.5);
            
            const btn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerup', () => this.irAPuzzle3());
            return;
        }

        this.add.text(cx, 160, t('capitulo4.puzzle2_mateo_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.frecuenciaActual = 30.0;
        this.frecuenciaText = this.add.text(cx, 380, this.frecuenciaActual.toFixed(1) + ' MHz', { fontSize: '52px', color: '#00ff00', fontFamily: 'Courier New', fontStyle: 'bold', backgroundColor: '#111111', padding: {x: 25, y: 15} }).setOrigin(0.5);

        const upBtn = this.add.text(cx + 220, 380, '▲', { fontSize: '60px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const downBtn = this.add.text(cx - 220, 380, '▼', { fontSize: '60px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        upBtn.on('pointerup', () => this.cambiarFrecuencia(0.1));
        downBtn.on('pointerup', () => this.cambiarFrecuencia(-0.1));
    }

    cambiarFrecuencia(cambio) {
        this.frecuenciaActual = Math.round((this.frecuenciaActual + cambio) * 10) / 10;
        this.frecuenciaText.setText(this.frecuenciaActual.toFixed(1) + ' MHz');

        if (Math.abs(this.frecuenciaActual - FRECUENCIA_SOLUCION) < 0.01) {
            marcarResuelto(4, 2, this.rol); this.reproducirAcierto();
            this.time.delayedCall(800, () => { 
                this.mostrarTransicion(t('transiciones.cap4_p3'), () => this.irAPuzzle3()); 
            });
        }
    }

    // ==========================================
    // PUZLE 3 - NOMBRE
    // ==========================================
    irAPuzzle3() { localStorage.setItem('tc4_puzzle_' + this.rol, '3'); this.scene.restart(); }

    mostrarPuzzle3() {
        this.crearFondo(); this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        this.add.rectangle(cx, 100, 800, 50, 0x000000, 0.7);
        this.add.text(cx, 100, t('capitulo4.puzzle3_title'), { fontSize: '30px', color: '#e0d8c8', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        this.add.image(cx + 400, 400, 'retrato_carmen').setDisplaySize(280, 350).setAlpha(0.9);

        if (estaResuelto(4, 3, this.rol)) { this.mostrarPuzzleResueltoOverlay(() => this.irAFinal()); return; }

        if (this.rol === 'mateo') {
            // ✅ MATEO VE LA NOTA CON EL NOMBRE
            this.add.text(cx - 250, 160, t('capitulo4.puzzle3_mateo_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
            
            this.add.rectangle(cx - 250, 350, 550, 220, 0x000000, 0.85).setStrokeStyle(3, 0xc0a060);
            this.add.text(cx - 250, 350, t('capitulo4.puzzle3_mateo_nota'), { fontSize: '32px', color: '#ffffff', fontFamily: 'Courier New', align: 'center', lineSpacing: 15 }).setOrigin(0.5);
            
            const btn = this.add.rectangle(GAME_WIDTH - 160, GAME_HEIGHT - 70, 260, 70, 0x2a6a2a, 0.9).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(GAME_WIDTH - 160, GAME_HEIGHT - 70, t('capitulo1.continuar'), { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerup', () => this.irAFinal());
            return;
        }

        // VISTA EUGENIA: Teclado para escribir
        this.add.text(cx - 300, 160, t('capitulo4.puzzle3_eugenia_hint'), { fontSize: '26px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'italic', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);

        const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.nombreActual = [0, 0, 0, 0, 0, 0];
        this.letrasTexts = [];

        const startX = cx - 500, spacing = 110;
        for (let i = 0; i < 6; i++) {
            const x = startX + i * spacing;
            
            const btnUp = this.add.text(x, 320, '▲', { fontSize: '40px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            this.add.rectangle(x, 390, 80, 80, 0x1a1a1a, 0.9).setStrokeStyle(3, 0xc0a060);
            const txt = this.add.text(x, 390, letrasAlfabeto[0], { fontSize: '42px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            const btnDown = this.add.text(x, 460, '▼', { fontSize: '40px', color: '#ffffff', fontFamily: 'Courier New' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

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
            marcarResuelto(4, 3, this.rol); this.reproducirAcierto();
            this.time.delayedCall(800, () => { 
                this.mostrarTransicion(t('transiciones.cap4_final'), () => this.irAFinal()); 
            });
        }
    }

    // ==========================================
    // FINAL
    // ==========================================
    irAFinal() {
        localStorage.setItem('tc4_puzzle_' + this.rol, '4');
        this.detenerAmbiente();
        if (this.cache.audio.exists('final_giro')) {
            this.revelacionMusica = this.sound.add('final_giro', { loop: true, volume: getVolumen() * 0.6 });
            this.revelacionMusica.play();
        }
        this.scene.restart();
    }

    mostrarFinal() {
        this.crearFondo(); this.mostrarTitulo(true);
        const cx = GAME_WIDTH / 2;
        
        this.add.text(cx, 130, t('capitulo4.chapter_end_title'), { fontSize: '46px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        const miMitad = (this.rol === 'eugenia') ? '19--' : '--53';
        const etiqueta = (this.rol === 'eugenia') ? t('capitulo4.chapter_end_eugenia') : t('capitulo4.chapter_end_mateo');

        this.add.text(cx, 220, etiqueta, { fontSize: '28px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 290, miMitad, { fontSize: '80px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);

        if (estaResuelto(4, 4, this.rol)) {
            const irBtn = this.add.rectangle(cx, 510, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
            this.add.text(cx, 510, '→ ' + t('interludio.title') + ' 4 (Final)', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
            irBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Interludio', { numero: 4, siguiente: 'Creditos' }); });
            return;
        }

        this.add.text(cx, 360, t('capitulo4.chapter_end_instruction'), { fontSize: '24px', color: '#cccccc', fontFamily: 'Courier New', wordWrap: { width: 1000 }, align: 'center', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
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
        this.add.text(cx, 630, t('capitulo4.chapter_code_confirm'), { fontSize: '28px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.mensajeFinal = this.add.text(cx, 700, '', { fontSize: '28px', color: '#ff6666', fontFamily: 'Courier New', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        confirmBtn.on('pointerup', () => this.verificarCodigoCapitulo());
    }

    verificarCodigoCapitulo() {
        const codigo = this.codigoIngresado.join('');
        if (codigo === CODIGO_CAPITULO4) {
            marcarResuelto(4, 4, this.rol);
            this.mensajeFinal.setText(t('capitulo4.chapter_code_ok')).setColor('#66ff66');
            this.reproducirAcierto();
            this.time.delayedCall(1500, () => {
                const cx = GAME_WIDTH / 2;
                const irBtn = this.add.rectangle(cx, GAME_HEIGHT - 110, 600, 80, 0x2a6a2a, 0.95).setStrokeStyle(3, 0x4aaa4a).setInteractive({ useHandCursor: true });
                this.add.text(cx, GAME_HEIGHT - 110, '→ ' + t('interludio.title') + ' 4 (Final)', { fontSize: '26px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
                irBtn.on('pointerup', () => { this.detenerAmbiente(); this.scene.start('Interludio', { numero: 4, siguiente: 'Creditos' }); });
            });
        } else {
            this.mensajeFinal.setText(t('capitulo4.chapter_code_bad')).setColor('#ff6666');
            this.reproducirError(); if (navigator.vibrate) navigator.vibrate(200);
        }
    }
}